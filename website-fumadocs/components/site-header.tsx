import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="landing-header">
      <div className="landing-shell landing-header-inner">
        <Link className="brand-lockup" href="/" aria-label="AI Crash Courses home">
          <span className="brand-mark" aria-hidden="true">AI</span>
          <strong>Crash Courses</strong>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/courses">All Courses</Link>
          <Link href="/#about">About</Link>
        </nav>
      </div>
    </header>
  );
}
