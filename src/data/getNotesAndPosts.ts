import getAllNotes from "./getAllNotes";
import {getAllPosts, getPublishedPosts} from "src/data/getPosts";
import { Note } from "src/types/note";
import { Post } from "src/types/post";

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

export default async function getNotesAndPosts(): Promise<Array<Note | Post>> {
  const isDev = process.env.NODE_ENV === 'development';
  const notes = await getAllNotes();
  const posts = isDev ? await getAllPosts() : await getPublishedPosts();
  const notesAndPosts: Array<Note | Post> = [...notes, ...posts].sort((a, b) => {
    const aDate = getDateToCompare(a);
    const bDate = getDateToCompare(b);
    return bDate.getTime() - aDate.getTime()
  })
  return notesAndPosts
}