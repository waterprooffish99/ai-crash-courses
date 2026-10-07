import type { ReactNode } from 'react';

export function Exercise({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="learning-exercise">
      <summary>{title}</summary>
      <div>{children}</div>
    </details>
  );
}
