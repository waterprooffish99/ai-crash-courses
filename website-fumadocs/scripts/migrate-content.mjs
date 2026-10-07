import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import TurndownService from 'turndown';
import gfmPlugin from 'turndown-plugin-gfm';
import { load } from 'cheerio';

const require = createRequire(import.meta.url);
const projectRoot = path.resolve(import.meta.dirname, '..', '..');
const eleventyCourses = require(path.join(projectRoot, 'website/src/_data/courses.js'));
const { getMigratedCourse } = require(path.join(projectRoot, 'website/lib/migrate-source.js'));
const outputDirectory = path.join(projectRoot, 'website-fumadocs/content/docs');

const { gfm } = gfmPlugin;

function plainText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function yamlString(value) {
  return JSON.stringify(value);
}

function escapeMdxBraces(markdown) {
  let inFence = false;
  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (
        inFence ||
        /^@@[A-Z]+_\d+@@$/.test(line.trim()) ||
        /^\s*<\/?(?:LearningCallout|Exercise)\b/.test(line)
      ) return line;

      let inInlineCode = false;
      let result = '';
      for (const character of line) {
        if (character === '`') inInlineCode = !inInlineCode;
        if (!inInlineCode && (character === '{' || character === '}')) result += '\\';
        result += character;
      }
      return result;
    })
    .join('\n');
}

function extractQuiz($, container) {
  return $(container)
    .find('.quiz-question[data-answer]')
    .map((_, element) => {
      const question = $(element);
      return {
        question: plainText(question.children('legend').first().text()),
        options: question
          .find('label')
          .map((__, label) => ({
            value: $(label).find('input').attr('value') ?? '',
            label: plainText($(label).text()),
          }))
          .get(),
        answer: question.attr('data-answer') ?? '',
      };
    })
    .get();
}

function prepareHtml(course) {
  const migrated = getMigratedCourse(course);
  const $ = load(migrated.html, { decodeEntities: false });
  const root = $('.course-content').first();
  const replacements = [];

  $('[data-quiz]').each((_, container) => {
    const nestedParent = $(container).parents('[data-quiz]').first();
    if (nestedParent.length) return;
    const questions = extractQuiz($, container);
    if (!questions.length) return;
    const id = replacements.push(`<Quiz questions={${JSON.stringify(questions)}} />`) - 1;
    $(container).replaceWith(`<div data-mdx-token="QUIZ_${id}">QUIZ_${id}</div>`);
  });

  const glossary = $('.glossary, .glossary-grid').filter((_, element) => $(element).find('.gterm').length).first();
  if (glossary.length) {
    const items = glossary.find('.gterm').map((_, element) => {
      const termElement = $(element);
      const term = plainText(termElement.attr('data-term') || termElement.find('strong, b').first().text());
      const clone = termElement.clone();
      clone.find('strong, b').first().remove();
      return { term, definition: plainText(clone.text()) };
    }).get();
    const id = replacements.push(`<Glossary items={${JSON.stringify(items)}} />`) - 1;
    glossary.replaceWith(`<div data-mdx-token="GLOSSARY_${id}">GLOSSARY_${id}</div>`);
    $('#glossarySearch, label[for="glossarySearch"]').remove();
  }

  $('.flashcard').each((_, element) => {
    const card = $(element);
    const front = plainText(card.attr('data-q') || card.find('.q').first().text() || card.contents().first().text());
    const back = plainText(card.attr('data-a') || card.find('.a').first().text());
    const id = replacements.push(`<Flashcard front={${JSON.stringify(front)}} back={${JSON.stringify(back)}} />`) - 1;
    card.replaceWith(`<div data-mdx-token="FLASHCARD_${id}">FLASHCARD_${id}</div>`);
  });

  $('[data-copy-prompt]').remove();
  $('[data-quiz-action], [data-quiz-result]').remove();
  $('[data-validation-ignore]').remove();
  $('table caption').remove();
  // Source pages often wrap a section number in a styled span immediately
  // before the heading text. Preserve the visual word boundary in Markdown.
  root.find('h1 span, h2 span, h3 span, h4 span, h5 span, h6 span').after(' ');
  root.find('[class]').removeAttr('class');
  root.find('[style]').removeAttr('style');

  return { html: root.html() ?? '', replacements };
}

function createTurndown() {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '*',
    strongDelimiter: '**',
  });
  turndown.use(gfm);

  // Several guides use bare <pre> elements for prompts, diagrams, directory
  // trees, and code samples. Turndown's default rule only fences <pre><code>,
  // so preserve bare blocks explicitly instead of flattening them into prose.
  turndown.addRule('bare-preformatted-block', {
    filter: 'pre',
    replacement: (_content, node) => {
      const value = (node.textContent ?? '').replace(/^\n+|\n+$/g, '');
      const longestFence = Math.max(3, ...Array.from(value.matchAll(/`+/g), (match) => match[0].length + 1));
      const fence = '`'.repeat(longestFence);
      return `\n\n${fence}text\n${value}\n${fence}\n\n`;
    },
  });

  turndown.addRule('mdx-token', {
    filter: (node) => node.nodeName === 'DIV' && node.hasAttribute('data-mdx-token'),
    replacement: (_content, node) => {
      const token = node.getAttribute('data-mdx-token');
      return `\n\n@@${token}@@\n\n`;
    },
  });

  turndown.addRule('details-exercise', {
    filter: 'details',
    replacement: (_content, node) => {
      const summary = node.querySelector('summary');
      const title = plainText(summary?.textContent ?? 'Show answer');
      const clone = node.cloneNode(true);
      clone.querySelector('summary')?.remove();
      const inner = turndown.turndown(clone.innerHTML).trim();
      return `\n\n<Exercise title={${JSON.stringify(title)}}>\n\n${inner}\n\n</Exercise>\n\n`;
    },
  });

  const calloutClasses = new Set(['callout', 'example', 'warning', 'warn', 'exam', 'memory', 'simple', 'idea', 'why', 'quote', 'appendix-note', 'meaning', 'danger', 'success']);
  turndown.addRule('learning-callout', {
    filter: (node) => {
      if (!['DIV', 'ASIDE', 'BLOCKQUOTE'].includes(node.nodeName)) return false;
      const names = (node.getAttribute('class') ?? '').split(/\s+/);
      return names.some((name) => calloutClasses.has(name));
    },
    replacement: (_content, node) => {
      const names = new Set((node.getAttribute('class') ?? '').split(/\s+/));
      const tone = names.has('warning') || names.has('warn') || names.has('danger')
        ? 'warning'
        : names.has('exam') || names.has('memory')
          ? 'exam'
          : names.has('success')
            ? 'success'
            : 'note';
      const inner = turndown.turndown(node.innerHTML).trim();
      return `\n\n<LearningCallout tone="${tone}">\n\n${inner}\n\n</LearningCallout>\n\n`;
    },
  });

  return turndown;
}

function restoreTokens(markdown, replacements) {
  return markdown.replace(/@@(?:QUIZ|GLOSSARY|FLASHCARD)_(\d+)@@/g, (_match, index) => replacements[Number(index)]);
}

fs.mkdirSync(outputDirectory, { recursive: true });

for (const course of eleventyCourses) {
  const { html, replacements } = prepareHtml(course);
  const turndown = createTurndown();
  let markdown = turndown.turndown(html);
  markdown = escapeMdxBraces(markdown);
  markdown = restoreTokens(markdown, replacements)
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const document = `---\ntitle: ${yamlString(course.title)}\ndescription: ${yamlString(course.summary)}\ncourse: ${course.number}\n---\n\n${markdown}\n\n<SourceLink course={${course.number}} />\n\n<CourseVideo course={${course.number}} />\n\n<CourseNavigation course={${course.number}} />\n`;
  fs.writeFileSync(path.join(outputDirectory, `${course.slug}.mdx`), document);
}

console.log(`Migrated ${eleventyCourses.length} courses into Fumadocs MDX.`);
