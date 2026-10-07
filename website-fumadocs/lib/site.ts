const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid';

export const siteConfig = {
  name: 'AI Crash Courses',
  tagline: 'Complicated AI concepts explained simply.',
  description:
    'Ten beginner-friendly study guides for understanding modern AI, prompting, delegation, workflows, skills, safety, and responsible use.',
  url: configuredUrl.replace(/\/$/, ''),
} as const;

export function absoluteUrl(pathname: string): string {
  const strippedPath = pathname.replace(/^\/+/, '');
  const relativePath = strippedPath && !strippedPath.endsWith('/') && !/\/[^/]+\.[^/]+$/.test(`/${strippedPath}`)
    ? `${strippedPath}/`
    : strippedPath;
  return new URL(relativePath, `${siteConfig.url}/`).toString();
}
