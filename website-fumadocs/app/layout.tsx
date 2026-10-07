import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { absoluteUrl, siteConfig } from '@/lib/site';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.tagline} · ${siteConfig.name}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.tagline,
    description: siteConfig.description,
    url: absoluteUrl('/'),
  },
  twitter: {
    card: 'summary',
    title: siteConfig.tagline,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <RootProvider
          theme={{ defaultTheme: 'dark', enableSystem: true }}
          search={{ options: { type: 'static' } }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
