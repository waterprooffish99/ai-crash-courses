import Link from 'next/link';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { courses, getCourse } from '@/lib/courses';

export function CourseNavigation({ course: courseNumber }: { course: number }) {
  const course = getCourse(courseNumber);
  const index = courses.findIndex((item) => item.number === course.number);
  const previous = index > 0 ? courses[index - 1] : null;
  const next = index < courses.length - 1 ? courses[index + 1] : null;

  return (
    <nav className="course-navigation" aria-label="Course sequence">
      {previous ? (
        <Link href={`/courses/${previous.slug}`}>
          <span><ArrowLeft aria-hidden="true" /> Previous Course</span>
          <strong>{previous.number}. {previous.title}</strong>
        </Link>
      ) : <span aria-hidden="true" />}
      <Link className="all-courses" href="/courses"><LayoutGrid aria-hidden="true" /> All Courses</Link>
      {next ? (
        <Link className="next-course" href={`/courses/${next.slug}`}>
          <span>Next Course <ArrowRight aria-hidden="true" /></span>
          <strong>{next.number}. {next.title}</strong>
        </Link>
      ) : <span aria-hidden="true" />}
    </nav>
  );
}
