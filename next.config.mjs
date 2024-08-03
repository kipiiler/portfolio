import withMDX from '@next/mdx';
import { withContentlayer } from 'next-contentlayer'

async function getNextConfig() {
  const recmaMdxDisplayname = await import('recma-mdx-displayname');

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
          port: "",
        },
      ],
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  };

  const mdxConfig = {
    extension: /\.mdx?$/,
    options: {
      recmaPlugins: [recmaMdxDisplayname.default],
    },
  };

  return withMDX(mdxConfig)(nextConfig);
}

const nextConfig = await getNextConfig();
export default withContentlayer(nextConfig);
