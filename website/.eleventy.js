const path = require("node:path");
const {
  getMigratedCourse,
  renderCourseToc,
} = require("./lib/migrate-source");

const pathPrefix = process.env.PATH_PREFIX || "/";
const siteUrl = process.env.SITE_URL || "https://example.invalid";

function withPathPrefix(urlPath) {
  const normalizedPath = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  if (pathPrefix === "/") return normalizedPath;
  return `${pathPrefix.replace(/\/$/, "")}${normalizedPath}`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("absoluteUrl", (urlPath) => {
    return new URL(withPathPrefix(urlPath), siteUrl).href;
  });

  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("pad2", (value) => String(value).padStart(2, "0"));

  eleventyConfig.addShortcode("migratedCourse", (course) => {
    return getMigratedCourse(course).html;
  });

  eleventyConfig.addShortcode("courseToc", (course) => {
    return renderCourseToc(getMigratedCourse(course).toc);
  });

  eleventyConfig.addWatchTarget("../sources/html/");

  return {
    pathPrefix,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
