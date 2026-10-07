import type { ReactNode } from 'react';

export function LearningCallout({ children, tone = 'note' }: { children: ReactNode; tone?: 'note' | 'warning' | 'exam' | 'success' }) {
  return <aside className="learning-callout" data-tone={tone}>{children}</aside>;
}
