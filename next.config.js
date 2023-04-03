module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
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
