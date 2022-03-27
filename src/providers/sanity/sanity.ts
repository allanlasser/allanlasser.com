import sanityClient, { SanityClient } from "@sanity/client";

const env = process.env.NODE_ENV || "development";

export const sanityConfig = {
  projectId: process.env.SANITY_PROJECT,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2022-01-01",
  useCdn: env !== "development", // `false` if you want to ensure fresh data
};

let client: SanityClient;
if (!client) {
  client = sanityClient(sanityConfig);
}

export default client;
