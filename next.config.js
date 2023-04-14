module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: {
    appDir: true
  },
  async redirects() {
    return [
      {
        source: '/library/:id',
        destination: '/shelf/:id',
        permanent: true,
      },
    ]
  },
};
