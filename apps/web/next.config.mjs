/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  reactStrictMode: true,
  transpilePackages: ['@insurance-agent/shared', '@insurance-agent/config'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
