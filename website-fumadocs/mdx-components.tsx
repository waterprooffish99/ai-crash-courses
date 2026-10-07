import type { MDXComponents } from 'mdx/types';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { CourseNavigation } from '@/components/course-navigation';
import { CourseVideo } from '@/components/course-video';
import { Exercise } from '@/components/exercise';
import { Flashcard } from '@/components/flashcard';
import { Glossary } from '@/components/glossary';
import { LearningCallout } from '@/components/learning-callout';
import { Quiz } from '@/components/quiz';
import { SourceLink } from '@/components/source-link';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    CourseNavigation,
    CourseVideo,
    Exercise,
    Flashcard,
    Glossary,
    LearningCallout,
    Quiz,
    SourceLink,
    ...components,
  };
}
