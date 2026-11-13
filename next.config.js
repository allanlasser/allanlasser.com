// Posts that moved to compostmodernism.org, keyed by old /posts/<slug>.
const compostmodernismPosts = require("./redirects/compostmodernism-posts.json");

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/library/:id",
        destination: "/shelf/:id",
        permanent: true,
      },
      ...Object.entries(compostmodernismPosts).map(([slug, destination]) => ({
        source: `/posts/${slug}`,
        destination,
        // Temporary while we verify the migration live; make permanent later.
        permanent: false,
      })),
    ];
  },
};
