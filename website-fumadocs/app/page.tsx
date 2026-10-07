import Link from 'next/link';
import { ArrowRight, BookOpen, Route, Sparkles } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { courses } from '@/lib/courses';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="landing-hero landing-shell">
          <p className="eyebrow"><Sparkles aria-hidden="true" /> A practical learning path for modern AI</p>
          <h1>Complicated AI concepts <span>explained simply.</span></h1>
          <p className="landing-lead">Ten focused courses help you understand what AI is, communicate with it, design reliable workflows, and use it responsibly—without assuming a technical background.</p>
          <div className="hero-actions">
            <Link className="primary-action" href={`/courses/${courses[0].slug}`}>Start with Course 1 <ArrowRight aria-hidden="true" /></Link>
            <Link className="secondary-action" href="#courses">Explore all courses</Link>
          </div>
          <div className="path-facts" aria-label="Learning path summary">
            <div><BookOpen aria-hidden="true" /><strong>10</strong><span>Courses</span></div>
            <div><Route aria-hidden="true" /><strong>1</strong><span>Clear sequence</span></div>
            <div><Sparkles aria-hidden="true" /><strong>0</strong><span>Prerequisites</span></div>
          </div>
        </section>

        <section className="course-catalog landing-shell" id="courses" aria-labelledby="courses-heading">
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">The complete learning path</p>
              <h2 id="courses-heading">Build understanding one course at a time</h2>
            </div>
            <p>Follow the sequence or jump directly to the idea you need. Every lesson is searchable, easy to navigate, and designed for careful study.</p>
          </div>
          <ol className="landing-course-grid">
            {courses.map((course) => (
              <li className="landing-course-card" key={course.slug}>
                <span className="course-number" aria-hidden="true">{String(course.number).padStart(2, '0')}</span>
                <div>
                  <p className="course-label">Course {course.number}</p>
                  <h3><Link href={`/courses/${course.slug}`}>{course.title}</Link></h3>
                  <p>{course.summary}</p>
                </div>
                <Link className="course-action" href={`/courses/${course.slug}`} aria-label={`Start Course ${course.number}: ${course.title}`}>
                  Start Course <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-panel landing-shell" id="about" aria-labelledby="about-heading">
          <p className="eyebrow">Independent learning resource</p>
          <h2 id="about-heading">Clear presentation, transparent sourcing</h2>
          <p>This website reorganizes supplied Agent Factory / Panaversity study guides into one consistent learning experience. It preserves the educational substance, links to verified official sources, and clearly separates this project’s presentation from the original publisher.</p>
        </section>
      </main>
      <footer className="landing-footer">
        <div className="landing-shell">
          <strong>AI Crash Courses</strong>
          <p>An independent learning resource. It is not presented as an official Agent Factory product.</p>
        </div>
      </footer>
    </>
  );
}
