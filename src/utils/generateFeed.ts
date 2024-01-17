import { Feed } from "feed";
import smartquotes from "smartquotes";
import markdownToHtml from "./markdownToHtml";
import getSiteUrl from "./getSiteUrl";
import { getPublishedPosts } from "src/data/getPosts";
import { toHTML } from "@portabletext/to-html";
import { Post } from "src/types/post";

function generatePostContent(post: Post) {
  const html = toHTML(post.body, {
    components: {
      types: {
        note: ({ value }) => {
          const cite = [
            value.source.author,
            value.source?.url
              ? `<a href="${value.source.url}" rel="external">${smartquotes(
                  value.source.title
                )}</a>`
              : smartquotes(value.source.title),
            value.page,
          ].filter((entry) => Boolean(entry));
          return `<figure>${markdownToHtml(value.body)}${
            cite.length > 0 ? `<figcaption>${cite.join(", ")}</figcaption>` : ""
          }</figure>`;
        },
      },
    },
  });
  return html;
}

export default async function generateFeed() {
  const posts = await getPublishedPosts();
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
    posts.map(
      async (post) =>
        new Promise<void>(async (resolve) => {
          const id = `${siteURL}/posts/${post.slug.current}`;
          const url = post.source?.url ? post.source.url : id;
          const content = generatePostContent(post);
          const title = post.title ?? post.source?.title ?? "";
          feed.addItem({
            title: smartquotes(title),
            id,
            link: url,
            date: new Date(post.publishedAt),
            content,
          });
          resolve();
        })
    )
  );
  return feed;
}
