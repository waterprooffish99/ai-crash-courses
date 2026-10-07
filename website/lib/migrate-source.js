const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { load } = require("cheerio");

const sourceDirectory = path.resolve(__dirname, "../../sources/html");
const cache = new Map();

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function parseAnswerObject(raw) {
  const match = raw.match(/const\s+answers\s*=\s*({[\s\S]*?});/);
  if (!match) return [];
  const answerObject = vm.runInNewContext(`(${match[1]})`, Object.create(null), {
    timeout: 100,
  });
  return Object.values(answerObject);
}

function parseGeneratedQuestions(raw) {
  const match = raw.match(/const\s+questions\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) return [];
  return vm.runInNewContext(`(${match[1]})`, Object.create(null), {
    timeout: 100,
  });
}

function replaceGeneratedQuiz($, raw) {
  const questions = parseGeneratedQuestions(raw);
  if (!questions.length || !$("#quiz #qs").length) return;

  const form = $("<form></form>")
    .attr("data-quiz", "")
    .attr("novalidate", "")
    .addClass("quiz-form");

  questions.forEach(([question, options, answerIndex], questionIndex) => {
    const fieldset = $("<fieldset></fieldset>")
      .addClass("quiz-question")
      .attr("data-answer", String.fromCharCode(97 + answerIndex));
    fieldset.append($("<legend></legend>").text(`${questionIndex + 1}. ${question}`));
    options.forEach((option, optionIndex) => {
      const value = String.fromCharCode(97 + optionIndex);
      const label = $("<label></label>").addClass("quiz-option");
      label.append(
        $("<input>")
          .attr("type", "radio")
          .attr("name", `q${questionIndex + 1}`)
          .attr("value", value),
      );
      label.append(` ${value.toUpperCase()}. ${option}`);
      fieldset.append(label);
    });
    form.append(fieldset);
  });

  const actions = $("<div></div>").addClass("quiz-actions");
  actions.append(
    $("<button></button>")
      .attr("type", "button")
      .attr("data-quiz-action", "check")
      .text("Check my score"),
  );
  actions.append(
    $("<button></button>")
      .attr("type", "button")
      .attr("data-quiz-action", "reset")
      .addClass("secondary")
      .text("Reset"),
  );
  form.append(actions);
  form.append(
    $("<p></p>")
      .addClass("quiz-result")
      .attr("data-quiz-result", "")
      .attr("aria-live", "polite"),
  );
  $("#quiz #qs").replaceWith(form);
  $("#quiz > button, #quiz > .result").remove();
}

function normalizeQuiz($, raw) {
  const injectedAnswers = parseAnswerObject(raw);
  const answerlessQuestions = $(".quizq");
  answerlessQuestions.each((index, element) => {
    if (injectedAnswers[index]) {
      $(element).attr("data-answer", injectedAnswers[index]);
    }
  });

  const questions = $(".quiz-card[data-answer], .q[data-answer], .quizq[data-answer]");
  questions.each((index, element) => {
    const block = $(element);
    const questionNode = block.children(".qtitle").first().length
      ? block.children(".qtitle").first()
      : block.children("p").first().length
        ? block.children("p").first()
        : block.children("b").first();
    const questionText = questionNode.text().trim() || `Question ${index + 1}`;
    questionNode.remove();
    element.name = "fieldset";
    element.tagName = "fieldset";
    block.removeClass("quiz-card q quizq").addClass("quiz-question");
    block.prepend($("<legend></legend>").text(questionText));
    block.find("label").addClass("quiz-option");
  });

  $(".quiz-question").each((_, element) => {
    const question = $(element);
    const container = question.closest("form").length
      ? question.closest("form")
      : question.closest(".quiz").length
        ? question.closest(".quiz")
        : question.closest("section");
    container.attr("data-quiz", "");
  });

  $("button").each((_, element) => {
    const button = $(element);
    const label = button.text().trim().toLowerCase();
    button.attr("type", "button");
    if (/check|score|answers/.test(label)) button.attr("data-quiz-action", "check");
    if (/reset/.test(label)) button.attr("data-quiz-action", "reset");
  });

  $("#scoreBox, #result, #quizResult").each((_, element) => {
    $(element)
      .addClass("quiz-result")
      .attr("data-quiz-result", "")
      .attr("aria-live", "polite");
  });
}

function normalizeInteractiveElements($) {
  const glossarySearch = $("#glossarySearch");
  if (glossarySearch.length) {
    glossarySearch.attr("type", "search");
    glossarySearch.before(
      '<label class="field-label" for="glossarySearch">Filter glossary terms</label>',
    );
  }

  $(".flash").each((_, element) => {
    const flashcard = $(element);
    element.name = "button";
    element.tagName = "button";
    flashcard
      .removeClass("flash")
      .addClass("flashcard")
      .attr("type", "button")
      .attr("aria-expanded", "false");
  });

  $("button.copy, button.copybtn").each((_, element) => {
    $(element).attr("type", "button").attr("data-copy-prompt", "");
  });
}

function normalizeHeadingsAndSections($, root) {
  const usedIds = new Set();
  root.find("[id]").each((_, element) => usedIds.add($(element).attr("id")));

  let lastHeadingLevel = 1;
  root.find("h2, h3, h4, h5, h6").each((_, element) => {
    let level = Number(element.name.slice(1));
    if (level > lastHeadingLevel + 1) {
      level = lastHeadingLevel + 1;
      element.name = `h${level}`;
      element.tagName = `h${level}`;
    }
    lastHeadingLevel = level;
  });

  root.find("section").addClass("lesson-section");
  root.find("section").each((index, element) => {
    const section = $(element);
    if (section.attr("id")) return;
    const heading = section.children("h2, h3").first().text().trim();
    if (!heading) return;
    const base = slugify(heading) || `section-${index + 1}`;
    let id = base;
    let suffix = 2;
    while (usedIds.has(id)) id = `${base}-${suffix++}`;
    usedIds.add(id);
    section.attr("id", id);
  });

  root.find("table").each((_, element) => {
    const table = $(element);
    if (!table.children("caption").length) {
      const label = table
        .prevAll("h2, h3, h4")
        .first()
        .text()
        .trim() || "Course reference table";
      table.prepend($("<caption></caption>").addClass("sr-only").text(label));
    }
    if (!table.parent().hasClass("table-scroll")) {
      table.wrap('<div class="table-scroll" tabindex="0"></div>');
      table.parent().attr("aria-label", "Scrollable table");
    }
  });
}

function selectEducationalRoot($, course, raw) {
  let root = $("main").first();
  if (!root.length) root = $("body .wrap").first();
  if (!root.length) root = $("body").first();

  $("style, script, nav, header, footer, aside, .topbar, .progress, .topbtn, .footer").remove();
  root.find("h1").remove();
  root.find("section#top, section#start, section.hero").remove();

  root.find('a[href*="agentfactory.panaversity.org"]').each((_, element) => {
    const link = $(element);
    const sourceSection = link.closest("section");
    if (sourceSection.length) sourceSection.remove();
    else link.remove();
  });

  root.find("[onclick]").removeAttr("onclick");
  root.find("[style]").removeAttr("style");
  root.find('a[target="_blank"]').attr("rel", "noopener noreferrer");

  if (course.number === 10) replaceGeneratedQuiz($, raw);
  normalizeQuiz($, raw);
  normalizeInteractiveElements($);
  normalizeHeadingsAndSections($, root);

  return root;
}

function buildToc($, root) {
  const toc = [];
  root.find("section[id]").each((_, element) => {
    const section = $(element);
    const heading = section.children("h2").first();
    if (!heading.length) return;
    toc.push({ id: section.attr("id"), title: heading.text().trim() });
  });
  return toc;
}

function getMigratedCourse(course) {
  if (cache.has(course.slug)) return cache.get(course.slug);
  const sourcePath = path.join(sourceDirectory, course.sourceHtmlFilename);
  const raw = fs.readFileSync(sourcePath, "utf8");
  const $ = load(raw, { decodeEntities: false });
  const root = selectEducationalRoot($, course, raw);
  const toc = buildToc($, root);
  const html = `<div class="course-content">${root.html() || ""}</div>`;
  const result = { html, toc, sourcePath };
  cache.set(course.slug, result);
  return result;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderCourseToc(toc) {
  if (!toc.length) return "";
  const items = toc
    .map(
      (item) =>
        `<li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.title)}</a></li>`,
    )
    .join("");
  return `<nav class="course-toc" aria-label="On this page"><p>On this page</p><ol>${items}</ol></nav>`;
}

module.exports = { getMigratedCourse, renderCourseToc };
