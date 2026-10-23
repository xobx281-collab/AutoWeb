/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGitHubPages ? { basePath: '/AutoWeb', assetPrefix: '/AutoWeb/' } : {}),
};
export default nextConfig;
