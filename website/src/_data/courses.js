const courses = [
  {
    number: 1,
    title: "Just Delegate It",
    shortTitle: "Delegation",
    slug: "just-delegate-it",
    sourceHtmlFilename: "1. just-delegate-it-study-guide.html",
    sourceVideoFilename: "1. جسٹ_ڈیلیگیٹ_اٹ__کریش_کورس.mp4",
    sourceHtmlSha256: "3ca987db1e8ce4aa92f1cfe953c67b1caef391e958962c5c4a86dd35d964f478",
    sourceVideoSha256: "06484e6fc5f6214979b32a30bdae25e8ff2260233c22219a6b868766e74aba8f",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/just-delegate-it-crash-course",
    summary:
      "Learn how to give AI a clear job, supervise the work, verify important claims, and keep responsibility for the final decision.",
  },
  {
    number: 2,
    title: "What AI Actually Is",
    shortTitle: "What AI Is",
    slug: "what-ai-actually-is",
    sourceHtmlFilename: "2. what_ai_actually_is_complete_study_guide.html",
    sourceVideoFilename: "2. AI_انجن_کا_اصل_راز.mp4",
    sourceHtmlSha256: "7d84662c5c82a3f70f234d62d21f50e07021528a57f00694eb470f4ad178eb6d",
    sourceVideoSha256: "a23c8b7ebb0f5168456d659f4108c515f3777f9485ceb33fd0d6e737da8edd4b",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/what-ai-actually-is-crash-course",
    summary:
      "Build a simple mental model of language models, tokens, training, context, hallucinations, tools, agents, and reasoning.",
  },
  {
    number: 3,
    title: "AI Fluency",
    shortTitle: "AI Fluency",
    slug: "ai-fluency",
    sourceHtmlFilename: "3. ai_fluency_complete_exam_study_guide.html",
    sourceVideoFilename: "3. اے_آئی_فلوئنسی_فریم_ورک.mp4",
    sourceHtmlSha256: "d8e71a7afc249a6b4e36ebf16d8d6ae427495dea18466b52bd28b64b16beb888",
    sourceVideoSha256: "968d76327b68a1af86ca057c1cc0e93b454ebaaf426ff38fbc93e17c2467fc89",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/ai-fluency-crash-course",
    summary:
      "Use the four Ds—Delegation, Description, Discernment, and Diligence—to work with AI effectively and responsibly.",
  },
  {
    number: 4,
    title: "AI Prompting in 2026",
    shortTitle: "AI Prompting",
    slug: "ai-prompting-2026",
    sourceHtmlFilename: "4. ai_prompting_2026_exam_study_guide.html",
    sourceVideoFilename: "4. AI_پرامپٹنگ__2026.mp4",
    sourceHtmlSha256: "6aebd84174c5af2ea4135a73cb4f5e849f6612f63cbddfb97d868c29849808da",
    sourceVideoSha256: "7b77b50a341fe17a0cadfc3efb2b1923ba9d130c038c20aa048e9bfe650a6449",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/ai-prompting-2026",
    summary:
      "Treat prompts as clear briefings and learn how context, retrieval, reasoning, examples, rubrics, tools, and permissions shape results.",
  },
  {
    number: 5,
    title: "Markdown In, HTML Out",
    shortTitle: "Markdown to HTML",
    slug: "markdown-in-html-out",
    sourceHtmlFilename: "5. markdown-in-html-out-study-guide.html",
    sourceVideoFilename: "5. Markdown_In,_HTML_آؤٹ.mp4",
    sourceHtmlSha256: "8352378e37e2de90dee2b5a6c7ce0ea236775261e27f4c9d0cb8779d4b007d94",
    sourceVideoSha256: "ad630f3482a2ee254b278dc6faf70ad90cb399212174cac111fa34675c1ebb19",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/markdown-html-crash-course",
    summary:
      "Use Markdown to describe structured work clearly and HTML to turn that work into readable, shareable output.",
  },
  {
    number: 6,
    title: "Code You Never Write",
    shortTitle: "Commissioning Code",
    slug: "code-you-never-write",
    sourceHtmlFilename: "6. code-you-never-write-study-guide.html",
    sourceVideoFilename: "6. کوڈ_جو_آپ_کبھی_نہیں_لکھتے.mp4",
    sourceHtmlSha256: "dddcae1beb0c1bcedd5abc016234802d882f4f427ecb3c6fa1da27fd0a040b14",
    sourceVideoSha256: "1bca6c872792a2a6f11b457c9f0f902a8069288bd8a8a8501291b1b4540ed2c1",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/code-you-never-write-crash-course",
    summary:
      "Learn when code is the right tool, how to commission it from AI, and how to verify programs you may not be able to read yourself.",
  },
  {
    number: 7,
    title: "Skills & Connectors",
    shortTitle: "Skills & Connectors",
    slug: "skills-and-connectors",
    sourceHtmlFilename: "7. skills-connectors-study-guide.html",
    sourceVideoFilename: "7. skills-and-connectors.mp4",
    sourceHtmlSha256: "f6977843041bc1f924b474c415bb9ada942349248f5aab5675942ff1ff9ead8e",
    sourceVideoSha256: "1c6a8b16c3f144d16e155d6d44bb31eed6f89e2d84cc2e77a2a89151354b8446",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/skills-connectors-crash-course",
    summary:
      "Understand how reusable Skills teach a method and how Connectors give AI controlled access to real apps and information.",
  },
  {
    number: 8,
    title: "How to Think in the AI Era",
    shortTitle: "Thinking with AI",
    slug: "how-to-think-in-the-ai-era",
    sourceHtmlFilename: "8. how-to-think-ai-era-study-guide.html",
    sourceVideoFilename: "8. AI_کے_دور_میں_سوچنا.mp4",
    sourceHtmlSha256: "7beb4e7d379527e0ac6fcb896318407769b30db21aeeb965c35d4a72b4cd9662",
    sourceVideoSha256: "156f179d458775eabe706911aad52e908d923f518ce21197f4b37b9c895089f8",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/how-to-think-ai-era",
    summary:
      "Protect your own judgment with practical disciplines for predicting, documenting, checking, tracing, testing, and collaborating with AI.",
  },
  {
    number: 9,
    title: "Workflow Design & Diagnosis",
    shortTitle: "Workflow Design",
    slug: "workflow-design-and-diagnosis",
    sourceHtmlFilename: "9. workflow_design_diagnosis_study_guide.html",
    sourceVideoFilename: "9. ورک_فلو_ڈیزائن_اور_تشخیص.mp4",
    sourceHtmlSha256: "15cf15b2f488decf4755d712a9acd4d8e9fba052522b9b48a19569a0ed431129",
    sourceVideoSha256: "f01722d10f35a865323142255777e2337e3a81c74eacdc402e2e963b86327b2c",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/workflow-design-diagnosis-crash-course",
    summary:
      "Break work into useful steps, decide where AI belongs, diagnose failures, make fixes reusable, and keep human gates clear.",
  },
  {
    number: 10,
    title: "Governance, Risk & Responsible Use",
    shortTitle: "Governance & Risk",
    slug: "governance-risk-responsible-use",
    sourceHtmlFilename: "10. governance-risk-responsible-use-study.html",
    sourceVideoFilename: "10. گورننس_اور_رسک_مینجمنٹ.mp4",
    sourceHtmlSha256: "cdf1f6d0f7d6f6df3ab19f06bc7d2c046ca0ab4a312c745fd980ff0a8b16fc90",
    sourceVideoSha256: "35399deb014e2128b32896d4fc44fab8cf735b1565804adc75098bfa8298a302",
    officialSourceUrl: "https://agentfactory.panaversity.org/docs/governance-risk-responsible-use-crash-course",
    summary:
      "Evaluate the case, data, capabilities, and people affected before AI acts, then document controls, incidents, and remaining risk.",
  },
];

for (const [index, course] of courses.entries()) {
  course.publicStudyUrlPath = `/courses/${course.slug}/`;
  course.youtubeUrl = null;
  course.previousCourse = index
    ? {
        number: courses[index - 1].number,
        title: courses[index - 1].title,
        path: `/courses/${courses[index - 1].slug}/`,
      }
    : null;
  course.nextCourse = index < courses.length - 1
    ? {
        number: courses[index + 1].number,
        title: courses[index + 1].title,
        path: `/courses/${courses[index + 1].slug}/`,
      }
    : null;
}

module.exports = courses;
