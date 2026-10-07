import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">AI</span>
          <span>Crash Courses</span>
        </span>
      ),
      url: '/',
      transparentMode: 'top',
    },
    links: [
      { text: 'All Courses', url: '/courses', active: 'nested-url' },
      { text: 'About', url: '/#about' },
    ],
  };
}
