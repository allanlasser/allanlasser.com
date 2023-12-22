import { Feed } from "feed";
import smartquotes from "smartquotes";
import { getNoteTitle, getNonBookNotes } from "src/data/note";
import markdownToHtml from "./markdownToHtml";
import getSiteUrl from "./getSiteUrl";

export default async function generateFeed() {
  const notes = await getNonBookNotes();
  const siteURL = getSiteUrl();
  const date = new Date();
  const author = {
    name: "Allan Lasser",
    email: "allan@lasser.design",
    link: "https://allanlasser.com/",
  };
  const feed = new Feed({
    title: "Allan Lasser",
    description: "Thoughts, reading notes, and highlights",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Allan Lasser`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/feeds/rss.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });
  await Promise.all(
    notes.map(
      async (note) =>
        new Promise<void>(async (resolve) => {
          const id = `${siteURL}/notes/${note._id}`;
          const url = note.source?.url ? note.source.url : id;
          const content = String(await markdownToHtml(smartquotes(note.body)));
          const title = getNoteTitle(note);
          feed.addItem({
            title: title ? smartquotes(title) : "",
            id,
            link: url,
            content,
            date: new Date(note._createdAt),
          });
          resolve();
        })
    )
  );
  return feed;
}
