/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["cliques-assets.s3.amazonaws.com", "media0.giphy.com"] },
};

module.exports = nextConfig;
