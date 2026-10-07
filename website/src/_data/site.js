module.exports = function () {
  return {
    title: "AI Crash Courses",
    tagline: "Complicated AI concepts explained simply.",
    description:
      "Ten beginner-friendly study guides for understanding modern AI, prompting, delegation, workflows, skills, safety, and responsible use.",
    url: process.env.SITE_URL || "https://example.invalid",
    urlIsPlaceholder: !process.env.SITE_URL,
    language: "en",
  };
};
