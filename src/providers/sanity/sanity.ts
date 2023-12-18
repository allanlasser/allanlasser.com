import { ClientPerspective, createClient, SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const env = process.env.NODE_ENV || "production";
const perspective = (process.env.SANITY_PERSPECTIVE ||
  "published") as ClientPerspective;

export const sanityConfig = {
  projectId:
    process.env.SANITY_PROJECT || process.env.NEXT_PUBLIC_SANITY_PROJECT,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2022-01-01",
  perspective,
  useCdn: false,
  // studioUrl: "/studio",
  token: process.env.SANITY_TOKEN,
};

let client: SanityClient;
// @ts-expect-error client is a singleton
if (!client) {
  client = createClient(sanityConfig);
}
const builder = imageUrlBuilder(client);

export function srcFor(source) {
  return builder.image(source);
}

function decodeAssetId(id?: string) {
  const pattern = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/;
  const [, assetId, dimensions, format] = id ? pattern.exec(id) ?? [] : [];
  const [width, height] =
    dimensions?.split("x").map((v) => parseInt(v, 10)) ?? [];
  return {
    assetId,
    dimensions: { width, height },
    format,
  };
}

export function dimensionsFor(source) {
  const { dimensions } = decodeAssetId(source.asset._ref);
  return dimensions;
}

export default client;
