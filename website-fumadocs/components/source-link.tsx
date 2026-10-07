import { ExternalLink } from 'lucide-react';
import { getCourse } from '@/lib/courses';

export function SourceLink({ course: courseNumber }: { course: number }) {
  const course = getCourse(courseNumber);
  return (
    <aside className="source-link">
      <p className="component-kicker">Source attribution</p>
      <h2>Continue with the original course</h2>
      <p>This is an independent presentation of the supplied study guide. The original Agent Factory / Panaversity course remains the authoritative source.</p>
      <a href={course.officialSourceUrl} target="_blank" rel="noreferrer">Open the official source <ExternalLink aria-hidden="true" /></a>
    </aside>
  );
}
