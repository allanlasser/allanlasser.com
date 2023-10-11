module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  async redirects() {
    return [
      {
        source: "/library/:id",
        destination: "/shelf/:id",
        permanent: true,
      },
    ];
  },
};
