import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const require = createRequire(import.meta.url);
const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectRoot = path.resolve(siteRoot, '..');
const outRoot = path.join(siteRoot, 'out');
const mdxRoot = path.join(siteRoot, 'content', 'docs');
const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? '');
const sourceVideoPolicy = process.env.SOURCE_VIDEO_POLICY ?? 'required';
const skipEleventyOutput = process.env.SKIP_ELEVENTY_OUTPUT === 'true';
const courses = require(path.join(projectRoot, 'website/src/_data/courses.js'));
const { getMigratedCourse } = require(path.join(projectRoot, 'website/lib/migrate-source.js'));

const failures = [];
const notes = [];

function normalizeBasePath(value) {
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
}

function publicPath(pathname) {
  const normalized = pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  return basePath ? `${basePath}${normalized}` : normalized;
}

function stripBasePath(pathname) {
  if (!basePath) return pathname;
  if (pathname === basePath) return '/';
  if (pathname.startsWith(`${basePath}/`)) return pathname.slice(basePath.length);
  return pathname;
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function normalizeText(value) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[’‘]/g, "'")
    .replace(/[^\p{L}\p{N}+#'.-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function spacedText($, root) {
  const parts = [];
  function visit(node) {
    if (node.type === 'text') {
      parts.push(node.data ?? '');
      return;
    }
    for (const child of node.children ?? []) visit(child);
    parts.push(' ');
  }
  root.each((_, element) => visit(element));
  return normalizeText(parts.join(' '));
}

function tokenCoverage(expected, actual) {
  const counts = new Map();
  for (const token of actual.split(' ').filter(Boolean)) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }
  const expectedTokens = expected.split(' ').filter(Boolean);
  let matched = 0;
  const missing = [];
  for (const token of expectedTokens) {
    const remaining = counts.get(token) ?? 0;
    if (remaining > 0) {
      matched += 1;
      counts.set(token, remaining - 1);
    } else {
      missing.push(token);
    }
  }
  return {
    value: expectedTokens.length ? matched / expectedTokens.length : 1,
    missing,
  };
}

function hasCourseHref($, selector, pathname) {
  const expected = publicPath(pathname);
  return $(selector).toArray().some((element) => {
    const href = $(element).attr('href');
    return href === expected || href === `${expected}/`;
  });
}

function contentTextFromEleventy(course) {
  const migrated = getMigratedCourse(course);
  const $ = load(migrated.html);
  const root = $('.course-content').first();

  // These controls are presentation text added by the Eleventy shell rather
  // than educational source content.
  root.find('[data-quiz-action], [data-quiz-result], [data-copy-prompt], [data-validation-ignore], table caption').remove();
  root.find('.flashcard').each((_, element) => {
    const back = $(element).attr('data-a');
    if (back) $(element).append(` ${back}`);
  });
  return { $, root, text: spacedText($, root) };
}

function contentTextFromStaticPage(file) {
  const $ = load(read(file));
  const root = $('.course-body').first();
  root.find('.source-link, .course-video, .course-navigation, [data-validation-ignore], button, svg').remove();
  return { $, root, text: spacedText($, root) };
}

function resolveOutputPath(rawUrl, currentFile) {
  if (!rawUrl || /^(?:https?:|mailto:|tel:|data:|blob:|javascript:)/i.test(rawUrl)) return null;
  const withoutHash = rawUrl.split('#')[0].split('?')[0];
  if (!withoutHash) return currentFile;

  let resolved;
  if (withoutHash.startsWith('/')) {
    resolved = path.join(outRoot, decodeURIComponent(stripBasePath(withoutHash)));
  } else {
    resolved = path.resolve(path.dirname(currentFile), decodeURIComponent(withoutHash));
  }
  if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) resolved = path.join(resolved, 'index.html');
  if (!path.extname(resolved) && !fs.existsSync(resolved)) resolved = path.join(resolved, 'index.html');
  return resolved;
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const location = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(location) : [location];
  });
}

async function sha256(file) {
  const hash = createHash('sha256');
  await new Promise((resolve, reject) => {
    fs.createReadStream(file).on('data', (chunk) => hash.update(chunk)).on('end', resolve).on('error', reject);
  });
  return hash.digest('hex');
}

check(fs.existsSync(outRoot), 'Static export directory website-fumadocs/out is missing.');
check(courses.length === 10, `Expected 10 courses in the canonical manifest; found ${courses.length}.`);

const mdxFiles = fs.existsSync(mdxRoot)
  ? fs.readdirSync(mdxRoot).filter((name) => /^.+\.mdx$/.test(name) && name !== 'index.mdx')
  : [];
check(mdxFiles.length === 10, `Expected 10 course MDX files; found ${mdxFiles.length}.`);

const homeFile = path.join(outRoot, 'index.html');
check(fs.existsSync(homeFile), 'Static homepage is missing.');
const home = fs.existsSync(homeFile) ? load(read(homeFile)) : null;
if (home) check(home('link[rel~="icon"]').length >= 1, 'Site icon metadata is missing from the homepage.');
check(fs.existsSync(path.join(outRoot, 'icon.svg')), 'Static site icon is missing.');

const expectedQuizQuestions = new Map([[2, 15], [3, 15], [4, 12], [8, 8], [10, 12]]);
const expectedFlashcards = new Map([[2, 6]]);
const expectedGlossaries = new Map([[2, 1]]);
const expectedExercises = new Map([[1, 10], [2, 21], [3, 10], [4, 12], [5, 1], [6, 9], [7, 0], [8, 1], [9, 1], [10, 0]]);
const coverageResults = [];

for (const [index, course] of courses.entries()) {
  const mdxFile = path.join(mdxRoot, `${course.slug}.mdx`);
  const pageFile = path.join(outRoot, 'courses', course.slug, 'index.html');
  check(fs.existsSync(mdxFile), `Course ${course.number}: MDX file is missing.`);
  check(fs.existsSync(pageFile), `Course ${course.number}: static page is missing.`);
  if (!fs.existsSync(pageFile)) continue;

  const html = read(pageFile);
  const $ = load(html);
  check($('h1').first().text().includes(course.title), `Course ${course.number}: H1 does not include the canonical title.`);
  check($('title').text().includes(course.title), `Course ${course.number}: document title is not unique/canonical.`);
  check($('meta[name="description"]').attr('content') === course.summary, `Course ${course.number}: meta description mismatch.`);
  check(Boolean($('link[rel="canonical"]').attr('href')), `Course ${course.number}: canonical metadata is missing.`);
  check($('link[rel="canonical"]').attr('href') === absoluteDeploymentUrl(`/courses/${course.slug}/`), `Course ${course.number}: canonical URL does not include the configured deployment root.`);
  check(Boolean($('meta[property="og:title"]').attr('content')), `Course ${course.number}: Open Graph title is missing.`);
  check(Boolean($('meta[name="twitter:card"]').attr('content')), `Course ${course.number}: Twitter card metadata is missing.`);
  check($('.course-body').length === 1, `Course ${course.number}: expected one course content body.`);
  check($('.source-link').length === 1, `Course ${course.number}: source attribution is missing.`);
  check($(`.source-link a[href="${course.officialSourceUrl}"]`).length === 1, `Course ${course.number}: official source URL mismatch.`);
  check($('.course-video').length === 1, `Course ${course.number}: video placeholder is missing.`);
  check(!html.includes(course.sourceVideoFilename), `Course ${course.number}: local source video filename leaked into static HTML.`);
  check($('.course-navigation').length === 1, `Course ${course.number}: course sequence navigation is missing.`);
  check(hasCourseHref($, '.course-navigation a', '/courses'), `Course ${course.number}: All Courses link is missing.`);
  check($('button[aria-label="Open Sidebar"]').length >= 1, `Course ${course.number}: mobile sidebar control is missing.`);
  check($('button[aria-label="Open Search"]').length >= 1, `Course ${course.number}: search control is missing.`);

  const sidebarPrefix = publicPath('/courses/');
  const sidebarCourseLinks = new Set($(`aside a[href^="${sidebarPrefix}"]`).map((_, element) => $(element).attr('href')?.replace(/\/$/, '')).get());
  for (const listedCourse of courses) {
    check(sidebarCourseLinks.has(publicPath(`/courses/${listedCourse.slug}`)), `Course ${course.number}: sidebar lacks course ${listedCourse.number}.`);
  }

  if (index > 0) {
    check(hasCourseHref($, '.course-navigation a', `/courses/${courses[index - 1].slug}`), `Course ${course.number}: previous link is incorrect.`);
  } else {
    check(!$('.course-navigation a').text().includes('Previous Course'), 'Course 1 should not have a previous-course link.');
  }
  if (index < courses.length - 1) {
    check(hasCourseHref($, '.course-navigation a', `/courses/${courses[index + 1].slug}`), `Course ${course.number}: next link is incorrect.`);
  } else {
    check(!$('.course-navigation a').text().includes('Next Course'), 'Course 10 should not have a next-course link.');
  }

  const headings = $('.course-body h2[id], .course-body h3[id]').filter((_, element) => !$(element).closest('.source-link, .course-video, .course-navigation').length);
  const tocTargets = new Set($('a[href^="#"]').map((_, element) => $(element).attr('href')?.slice(1)).get());
  check(headings.length > 0, `Course ${course.number}: no table-of-contents headings were generated.`);
  for (const heading of headings.toArray()) {
    check(tocTargets.has($(heading).attr('id')), `Course ${course.number}: TOC does not link heading “${$(heading).text().trim()}”.`);
  }

  const expected = contentTextFromEleventy(course);
  const actual = contentTextFromStaticPage(pageFile);
  const coverage = tokenCoverage(expected.text, actual.text);
  coverageResults.push({ course: course.number, coverage: coverage.value, missing: coverage.missing });
  check(coverage.value >= 0.99, `Course ${course.number}: semantic token coverage is ${(coverage.value * 100).toFixed(2)}%, below 99% (sample missing tokens: ${coverage.missing.slice(0, 60).join(', ')}).`);

  check(actual.root.find('.quiz-question').length === (expectedQuizQuestions.get(course.number) ?? 0), `Course ${course.number}: quiz question count changed.`);
  check(actual.root.find('.learning-flashcard').length === (expectedFlashcards.get(course.number) ?? 0), `Course ${course.number}: flashcard count changed.`);
  check(actual.root.find('.learning-glossary').length === (expectedGlossaries.get(course.number) ?? 0), `Course ${course.number}: glossary count changed.`);
  check(actual.root.find('.learning-exercise').length === expectedExercises.get(course.number), `Course ${course.number}: exercise/disclosure count changed.`);
  check(actual.root.find('table').length === expected.root.find('table').length, `Course ${course.number}: table count changed.`);
  check(actual.root.find('pre').length === expected.root.find('pre').length, `Course ${course.number}: code-block count changed.`);

  if (home) check(hasCourseHref(home, 'a', `/courses/${course.slug}`), `Homepage does not link course ${course.number}.`);
}

const generatedCoursePages = fs.existsSync(path.join(outRoot, 'courses'))
  ? fs.readdirSync(path.join(outRoot, 'courses'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(outRoot, 'courses', entry.name, 'index.html')))
  : [];
check(generatedCoursePages.length === 10, `Expected exactly 10 generated course directories; found ${generatedCoursePages.length}.`);

const searchFile = path.join(outRoot, 'api', 'search');
check(fs.existsSync(searchFile), 'Static local-search index is missing.');
if (fs.existsSync(searchFile)) {
  const searchText = read(searchFile);
  let searchData;
  try {
    searchData = JSON.parse(searchText);
  } catch {
    failures.push('Static local-search index is not valid JSON.');
  }
  const hasCurrentStaticSearch = ['simple', 'advanced'].includes(searchData?.type) && typeof searchData?.docs === 'object';
  const hasLegacyFlexSearch = searchData?.type === 'default' && typeof searchData?.raw === 'object';
  check(hasCurrentStaticSearch || hasLegacyFlexSearch, 'Static local-search index has an unexpected structure.');
  for (const course of courses) {
    check(searchText.includes(`/courses/${course.slug}`), `Static search index does not reference course ${course.number}.`);
  }
  notes.push(`Static search index: ${(fs.statSync(searchFile).size / 1024 / 1024).toFixed(2)} MiB`);
}

check(fs.existsSync(path.join(outRoot, 'robots.txt')), 'robots.txt is missing from static output.');
check(fs.existsSync(path.join(outRoot, 'sitemap.xml')), 'sitemap.xml is missing from static output.');

if (fs.existsSync(outRoot)) {
  const htmlFiles = walk(outRoot).filter((file) => file.endsWith('.html'));
  for (const htmlFile of htmlFiles) {
    const $ = load(read(htmlFile));
    for (const element of $('[href], [src]').toArray()) {
      const attribute = element.attribs.href ? 'href' : 'src';
      const raw = element.attribs[attribute];
      if (basePath && raw?.startsWith('/') && !raw.startsWith(`${basePath}/`) && raw !== basePath) {
        failures.push(`${path.relative(outRoot, htmlFile)}: root-relative ${attribute} bypasses base path: “${raw}”.`);
      }
      const target = resolveOutputPath(raw, htmlFile);
      if (target) check(fs.existsSync(target), `${path.relative(outRoot, htmlFile)}: broken ${attribute} “${raw}”.`);
      if (raw?.startsWith('#')) {
        const id = decodeURIComponent(raw.slice(1));
        check(!id || $(`[id="${id.replaceAll('"', '\\"')}"]`).length > 0, `${path.relative(outRoot, htmlFile)}: missing fragment target “${raw}”.`);
      }
    }
  }
}

function absoluteDeploymentUrl(pathname) {
  const configuredSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid').replace(/\/$/, '');
  return new URL(pathname.replace(/^\/+/, ''), `${configuredSiteUrl}/`).toString();
}

const sourceHtmlRoot = path.join(projectRoot, 'sources', 'html');
const sourceVideoRoot = path.join(projectRoot, 'sources', 'videos');
const sourceHtmlFiles = fs.readdirSync(sourceHtmlRoot).filter((name) => fs.statSync(path.join(sourceHtmlRoot, name)).isFile());
const sourceVideoFiles = fs.existsSync(sourceVideoRoot)
  ? fs.readdirSync(sourceVideoRoot).filter((name) => fs.statSync(path.join(sourceVideoRoot, name)).isFile())
  : [];
check(sourceHtmlFiles.length === 10, `Expected 10 source HTML files; found ${sourceHtmlFiles.length}.`);
if (sourceVideoPolicy === 'required') {
  check(sourceVideoFiles.length === 10, `Expected 10 source video files; found ${sourceVideoFiles.length}.`);
} else if (sourceVideoPolicy === 'absent') {
  check(sourceVideoFiles.length === 0, `Deployment validation requires source videos to be absent; found ${sourceVideoFiles.length}.`);
} else {
  failures.push(`Unknown SOURCE_VIDEO_POLICY “${sourceVideoPolicy}”.`);
}

for (const course of courses) {
  const htmlFile = path.join(projectRoot, 'sources', 'html', course.sourceHtmlFilename);
  const videoFile = path.join(sourceVideoRoot, course.sourceVideoFilename);
  check(fs.existsSync(htmlFile), `Course ${course.number}: immutable source HTML is missing.`);
  if (fs.existsSync(htmlFile)) check(await sha256(htmlFile) === course.sourceHtmlSha256, `Course ${course.number}: source HTML checksum changed.`);
  if (sourceVideoPolicy === 'required') {
    check(fs.existsSync(videoFile), `Course ${course.number}: immutable source video is missing.`);
    if (fs.existsSync(videoFile)) check(await sha256(videoFile) === course.sourceVideoSha256, `Course ${course.number}: source video checksum changed.`);
  }
}

check(fs.existsSync(path.join(projectRoot, 'website', 'package.json')), 'Eleventy reference implementation is missing.');
if (!skipEleventyOutput) check(fs.existsSync(path.join(projectRoot, 'website', '_site', 'index.html')), 'Validated Eleventy static output is missing.');
check(!walk(outRoot).some((file) => /\.(?:mp4|mov|mkv|webm)$/i.test(file)), 'A local source-video file was copied into the Fumadocs export.');

notes.push(`Course pages: ${generatedCoursePages.length}`);
notes.push(`Semantic token coverage: ${coverageResults.map(({ course, coverage }) => `${course}=${(coverage * 100).toFixed(2)}%`).join(', ')}`);
notes.push(sourceVideoPolicy === 'required'
  ? 'Source checksums verified: 10 HTML + 10 MP4'
  : 'Repository source validation: 10 HTML checksums verified; source videos correctly absent');

if (failures.length) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  for (const note of notes) console.error(`- ${note}`);
  process.exitCode = 1;
} else {
  console.log('Validation passed.');
  for (const note of notes) console.log(`- ${note}`);
}
