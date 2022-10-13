/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/api/x',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
