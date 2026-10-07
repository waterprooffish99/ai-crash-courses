import { createMDX } from 'fumadocs-mdx/next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX();

export default withMDX(config);
