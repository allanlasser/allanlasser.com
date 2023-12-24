import { groq } from "next-sanity";
import { SanityDocument } from "@sanity/client";
import Sanity from "src/providers/sanity";
import { Note } from "src/types/note";
import { Source, SourceType } from "src/types/source";
import { getOpenGraphData } from "src/providers/openGraph";

export interface CreateSourceArgs {
  type: SourceType;
  title: string;
  subtitle?: string;
  author?: string;
  url?: string;
  isbn?: string;
}

export async function createSource(
  args: CreateSourceArgs
): Promise<SanityDocument<Source>> {
  const source = await Sanity.create({
    _type: "source",
    ...args,
  });
  return source;
}

export async function findExistingSource(
  args: CreateSourceArgs
): Promise<Source | null> {
  const searchValue = args.url ?? args.isbn ?? args.title;
  const FIND_SOURCE = groq`*[_type == "source" && ((type == "book" && isbn == $searchValue) || (type == "article" && url == $searchValue) || (title == $searchValue))][0] {
    _id,
    url,
    isbn,
    title
  }
  `;
  return Sanity.fetch<Source>(FIND_SOURCE, { searchValue });
}

export async function getSource(id: string): Promise<Source> {
  const GET_SOURCE = groq`*[_type == "source" && _id == "${id}"][0] {
    _id,
    _createdAt,
    type,
    title,
    subtitle,
    author,
    "imageUrl": cover.asset->url,
    url,
    isbn
  }
  `;
  return Sanity.fetch<Source>(GET_SOURCE);
}

export async function getSourceNotes(id: string): Promise<Note[]> {
  const GET_SOURCE_NOTES = groq`*[_type=='note' && references('${id}')] {
    _id,
    _createdAt,
    body,
    page,
    source -> {
      _id,
      type,
      title,
      url
    }
  }`;
  return Sanity.fetch<Note[]>(GET_SOURCE_NOTES);
}

export async function getAllSources() {
  const GET_ALL_SOURCES = groq`*[_type == "source"] | order(_createdAt desc){
    _id,
    _createdAt,
    type,
    title,
    subtitle,
    author,
    "imageUrl": cover.asset->url,
    url,
    isbn
  }
  `;
  return Sanity.fetch<Source[]>(GET_ALL_SOURCES);
}

export async function getAllBooks() {
  const GET_ALL_BOOKS = groq`*[_type == "source" && type == "book"] | order(_createdAt desc){
    _id,
    _createdAt,
    type,
    title,
    subtitle,
    author,
    "imageUrl": cover.asset->url,
    url,
    isbn
  }
  `;
  return Sanity.fetch<Source[]>(GET_ALL_BOOKS);
}

export async function createArticleFromUrl(url: string) {
  const ogData = await getOpenGraphData(url);
  const source = await Sanity.create({
    _type: "source",
    type: "article",
    title: ogData.ogTitle,
    author: ogData.articleAuthor ?? ogData.ogArticleAuthor ?? ogData.author,
    url,
  });
  return source;
}
