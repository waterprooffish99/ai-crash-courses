const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { load } = require("cheerio");
const courses = require("../src/_data/courses");
const { getMigratedCourse } = require("../lib/migrate-source");

const websiteRoot = path.resolve(__dirname, "..");
const outputRoot = path.join(websiteRoot, "_site");
const projectRoot = path.resolve(websiteRoot, "..");
const errors = [];
const checks = [];

function check(condition, message) {
  if (condition) checks.push(message);
  else errors.push(message);
}

function allFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? allFiles(target) : [target];
  });
}

function normalizedText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function outputFileForUrl(rawUrl, fromFile) {
  const relativePage = `/${path.relative(outputRoot, fromFile).replaceAll(path.sep, "/")}`;
  const pageUrl = relativePage.endsWith("/index.html")
    ? relativePage.slice(0, -"index.html".length)
    : relativePage;
  const parsed = new URL(rawUrl, `https://local.test${pageUrl}`);
  let pathname = decodeURIComponent(parsed.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  return {
    file: path.join(outputRoot, pathname.replace(/^\/+/, "")),
    fragment: parsed.hash ? decodeURIComponent(parsed.hash.slice(1)) : "",
  };
}

async function sha256(file) {
  const hash = crypto.createHash("sha256");
  await new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .on("data", (chunk) => hash.update(chunk))
      .on("error", reject)
      .on("end", resolve);
  });
  return hash.digest("hex");
}

async function validateSources() {
  for (const course of courses) {
    const htmlPath = path.join(projectRoot, "sources", "html", course.sourceHtmlFilename);
    const videoPath = path.join(projectRoot, "sources", "videos", course.sourceVideoFilename);
    check(fs.existsSync(htmlPath), `Source HTML exists: course ${course.number}`);
    check(fs.existsSync(videoPath), `Source video exists: course ${course.number}`);
    if (fs.existsSync(htmlPath)) {
      check(
        (await sha256(htmlPath)) === course.sourceHtmlSha256,
        `Source HTML checksum matches: course ${course.number}`,
      );
    }
    if (fs.existsSync(videoPath)) {
      check(
        (await sha256(videoPath)) === course.sourceVideoSha256,
        `Source video checksum matches: course ${course.number}`,
      );
    }
  }
}

function validateCoursePages() {
  const expectedInteractions = {
    2: { quizzes: 15, flashcards: 6, copyButtons: 6 },
    3: { quizzes: 15, flashcards: 0, copyButtons: 6 },
    4: { quizzes: 12, flashcards: 0, copyButtons: 0 },
    8: { quizzes: 8, flashcards: 0, copyButtons: 0 },
    10: { quizzes: 12, flashcards: 0, copyButtons: 0 },
  };
  const expectedDirectories = new Set(courses.map((course) => course.slug));
  const generatedDirectories = fs
    .readdirSync(path.join(outputRoot, "courses"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(outputRoot, "courses", entry.name, "index.html")))
    .map((entry) => entry.name);

  check(generatedDirectories.length === 10, "Exactly 10 generated course pages");
  check(generatedDirectories.every((slug) => expectedDirectories.has(slug)), "Only manifest courses generated");

  for (const course of courses) {
    const pagePath = path.join(outputRoot, "courses", course.slug, "index.html");
    check(fs.existsSync(pagePath), `Generated course page exists: course ${course.number}`);
    if (!fs.existsSync(pagePath)) continue;
    const html = fs.readFileSync(pagePath, "utf8");
    const $ = load(html);
    const sourceMigration = load(getMigratedCourse(course).html);

    check($("h1").first().text().trim() === course.title, `Canonical h1: course ${course.number}`);
    check($("title").text().includes(course.title), `Unique title metadata: course ${course.number}`);
    check(Boolean($('meta[name="description"]').attr("content")), `Meta description: course ${course.number}`);
    check(Boolean($('link[rel="canonical"]').attr("href")), `Canonical URL: course ${course.number}`);
    check(Boolean($('meta[property="og:title"]').attr("content")), `Open Graph metadata: course ${course.number}`);
    check(Boolean($('meta[name="twitter:card"]').attr("content")), `Twitter metadata: course ${course.number}`);
    check($("main#main-content").length === 1, `Semantic main landmark: course ${course.number}`);
    check($("h1").length === 1, `Exactly one h1: course ${course.number}`);
    check($(".video-placeholder").length === 1, `Video placeholder: course ${course.number}`);
    check($(".source-attribution").length === 1, `Source attribution: course ${course.number}`);

    const expectedText = normalizedText(sourceMigration(".course-content").text());
    const builtText = normalizedText($(".course-content").text());
    check(expectedText === builtText && builtText.length > 1000, `Migrated content is complete: course ${course.number}`);
    check(
      sourceMigration(".course-content table").length === $(".course-content table").length,
      `All tables migrated: course ${course.number}`,
    );
    check(
      sourceMigration(".course-content pre").length === $(".course-content pre").length,
      `All code/prompt blocks migrated: course ${course.number}`,
    );
    check(
      sourceMigration(".course-content details").length === $(".course-content details").length,
      `All disclosure exercises migrated: course ${course.number}`,
    );

    const previous = $(".sequence-link--previous");
    const next = $(".sequence-link--next");
    check(course.previousCourse ? previous.length === 1 : previous.length === 0, `Previous-course navigation: course ${course.number}`);
    check(course.nextCourse ? next.length === 1 : next.length === 0, `Next-course navigation: course ${course.number}`);
    check($(".all-courses-link").attr("href") === "/courses/", `All-courses navigation: course ${course.number}`);

    $(".course-toc a").each((_, link) => {
      const fragment = $(link).attr("href").slice(1);
      check($(`[id="${fragment}"]`).length === 1, `TOC target #${fragment}: course ${course.number}`);
    });

    const ids = $("[id]").map((_, element) => $(element).attr("id")).get();
    check(new Set(ids).size === ids.length, `No duplicate IDs: course ${course.number}`);
    check(!html.includes("onclick="), `No source inline event handlers: course ${course.number}`);

    if (expectedInteractions[course.number]) {
      const expected = expectedInteractions[course.number];
      check(
        $(".quiz-question[data-answer]").length === expected.quizzes,
        `Quiz questions preserved: course ${course.number}`,
      );
      check($(".flashcard").length === expected.flashcards, `Flashcards preserved: course ${course.number}`);
      check(
        $("[data-copy-prompt]").length === expected.copyButtons,
        `Prompt-copy controls preserved: course ${course.number}`,
      );
    }

    check(!html.includes("sources/videos"), `No local video path exposed: course ${course.number}`);
    check(!/\.(mp4|mov|mkv|webm)(?:["'#?])/i.test(html), `No source video reference: course ${course.number}`);
  }
}

function validateHomepage() {
  const homepage = path.join(outputRoot, "index.html");
  check(fs.existsSync(homepage), "Homepage generated");
  if (!fs.existsSync(homepage)) return;
  const $ = load(fs.readFileSync(homepage, "utf8"));
  check($("h1").length === 1, "Homepage has exactly one h1");
  check(Boolean($('meta[name="description"]').attr("content")), "Homepage has meta description");
  check(Boolean($('meta[property="og:title"]').attr("content")), "Homepage has Open Graph metadata");
  for (const course of courses) {
    check(
      $(`a[href="${course.publicStudyUrlPath}"]`).length >= 1,
      `Homepage links to course ${course.number}`,
    );
  }
  check($(".course-card").length === 10, "Homepage presents all 10 courses");
}

function validateInternalLinks() {
  const htmlFiles = allFiles(outputRoot).filter((file) => file.endsWith(".html"));
  for (const file of htmlFiles) {
    const $ = load(fs.readFileSync(file, "utf8"));
    $("a[href], link[href], script[src], img[src]").each((_, element) => {
      const reference = $(element).attr("href") || $(element).attr("src");
      if (!reference || /^(https?:|mailto:|tel:|data:)/i.test(reference)) return;
      check(!/^(blob:|javascript:)/i.test(reference), `Safe local URL in ${path.relative(outputRoot, file)}: ${reference}`);
      if (/^(blob:|javascript:)/i.test(reference)) return;
      const target = outputFileForUrl(reference, file);
      check(fs.existsSync(target.file), `Internal target exists: ${reference} from ${path.relative(outputRoot, file)}`);
      if (target.fragment && fs.existsSync(target.file) && target.file.endsWith(".html")) {
        const targetPage = load(fs.readFileSync(target.file, "utf8"));
        check(targetPage(`[id="${target.fragment}"]`).length === 1, `Fragment exists: ${reference}`);
      }
    });
  }
}

function validateSupportingFiles() {
  check(fs.existsSync(path.join(outputRoot, "sitemap.xml")), "Sitemap generated");
  check(fs.existsSync(path.join(outputRoot, "robots.txt")), "robots.txt generated");
  check(fs.existsSync(path.join(outputRoot, "assets", "css", "site.css")), "Shared stylesheet copied");
  check(fs.existsSync(path.join(outputRoot, "assets", "js", "enhancements.js")), "Enhancement script copied");
  const media = allFiles(outputRoot).filter((file) => /\.(mp4|mov|mkv|webm)$/i.test(file));
  check(media.length === 0, "No video files copied into the website");

  const css = fs.readFileSync(path.join(outputRoot, "assets", "css", "site.css"), "utf8");
  check(css.includes("@media (min-width: 42rem)"), "Mobile-first tablet breakpoint present");
  check(css.includes("@media (min-width: 68rem)"), "Mobile-first desktop breakpoint present");
  check(css.includes(":focus-visible"), "Visible keyboard focus styles present");
  check(css.includes("prefers-reduced-motion"), "Reduced-motion preference respected");
}

async function main() {
  check(fs.existsSync(outputRoot), "Eleventy output directory exists");
  if (fs.existsSync(outputRoot)) {
    validateHomepage();
    validateCoursePages();
    validateInternalLinks();
    validateSupportingFiles();
  }
  await validateSources();

  if (errors.length) {
    console.error(`Validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Validation passed: ${checks.length} checks.`);
  console.log(`Generated course pages: ${courses.length}`);
  console.log("Source integrity: all 20 SHA-256 checksums match.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
