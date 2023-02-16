import { SanityDocument } from "@sanity/client";
import client from "src/providers/sanity";
import { Source, SourceType } from "src/types/source";

export interface CreateSourceArgs {
  type: SourceType;
  title: string;
  subtitle?: string;
  author?: string;
  url?: string;
  isbn?: string;
}

export default async function createSource(
  args: CreateSourceArgs
): Promise<SanityDocument<Source>> {
  const source = await client.create({
    _type: "source",
    ...args,
  });
  return source;
}
