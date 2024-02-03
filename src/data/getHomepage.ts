import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";
import { getNonBookNotes } from "src/data/note";
import { getAllPosts, getPublishedPosts } from "src/data/getPosts";
import { Source } from "src/types/source";
import { Note } from "src/types/note";
import { Post } from "src/types/post";

interface GetHomepage {
  bio: string;
  reading: Array<Source>;
  read: Array<Source>;
}

const GET_HOMEPAGE = groq`*[_type == "homepage" && _id == "homepage"][0] {
  bio,
  reading[]->{
    _id,
    title,
    subtitle,
    author,
    "imageUrl": cover.asset->url,
    "noteCount": count(*[_type=="note" && references(^._id)]),
  },
  read[]->{
    _id,
    title,
    subtitle,
    author,
    "imageUrl": cover.asset->url,
    "noteCount": count(*[_type=="note" && references(^._id)]),
  }
}`;

export async function getHomepage(): Promise<GetHomepage> {
  return Sanity.fetch(GET_HOMEPAGE);
}

function getDateToCompare(item: Note | Post) {
  let date: Date;
  switch (item._type) {
    case "note":
      date = new Date(item._createdAt);
      break;
    case "post":
      date = new Date(item.publishedAt);
      break;
  }
  return date;
}

export async function getNotesAndPosts(): Promise<Array<Note | Post>> {
  const isDev = process.env.NODE_ENV === "development";
  const notes = await getNonBookNotes();
  const posts = isDev ? await getAllPosts() : await getPublishedPosts();
  const notesAndPosts: Array<Note | Post> = [...notes, ...posts].sort(
    (a, b) => {
      const aDate = getDateToCompare(a);
      const bDate = getDateToCompare(b);
      return bDate.getTime() - aDate.getTime();
    }
  );
  return notesAndPosts;
}
