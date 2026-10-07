import { Play } from 'lucide-react';
import { getCourse } from '@/lib/courses';

export function CourseVideo({ course: courseNumber }: { course: number }) {
  const course = getCourse(courseNumber);
  return (
    <section className="course-video" aria-labelledby={`video-${course.number}`}>
      <div className="video-icon" aria-hidden="true"><Play /></div>
      <div>
        <p className="component-kicker">Course video</p>
        <h2 id={`video-${course.number}`}>Video coming in a later publishing phase</h2>
        <p>The matching video for “{course.title}” will be embedded here after it is published to YouTube. No local source-video path is exposed.</p>
      </div>
    </section>
  );
}
