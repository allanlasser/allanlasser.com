import sanityClient, { SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const env = process.env.NODE_ENV || "development";

export const sanityConfig = {
  projectId:
    process.env.SANITY_PROJECT || process.env.NEXT_PUBLIC_SANITY_PROJECT,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2022-01-01",
  useCdn: env !== "development", // `false` if you want to ensure fresh data
};

let client: SanityClient;
if (!client) {
  client = sanityClient(sanityConfig);
}
const builder = imageUrlBuilder(client);

export function srcFor(source) {
  return builder.image(source);
}

export default client;
