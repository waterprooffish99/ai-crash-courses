import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-shell">
      <p className="eyebrow">404 error</p>
      <h1>That page is not in this learning path.</h1>
      <p>The address may have changed, or the link may be incomplete.</p>
      <Link className="primary-action" href="/courses">Browse all courses</Link>
    </main>
  );
}
