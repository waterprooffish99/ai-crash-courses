import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/mdx-components';
import { source } from '@/lib/source';
import { absoluteUrl, siteConfig } from '@/lib/site';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      id="main-content"
      toc={page.data.toc}
      tableOfContent={{ style: 'clerk' }}
      breadcrumb={{ includeRoot: true, includePage: true }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description ? <DocsDescription>{page.data.description}</DocsDescription> : null}
      <DocsBody className="course-body">
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug ?? []);
  if (!page) notFound();

  const canonical = page.url;
  const description = page.data.description ?? siteConfig.description;

  return {
    title: page.data.title,
    description,
    alternates: { canonical: absoluteUrl(canonical) },
    openGraph: {
      type: 'article',
      title: page.data.title,
      description,
      url: absoluteUrl(canonical),
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary',
      title: page.data.title,
      description,
    },
  };
}
