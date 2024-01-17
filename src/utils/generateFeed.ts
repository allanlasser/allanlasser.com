import { Feed } from "feed";
import smartquotes from "smartquotes";
import markdownToHtml from "./markdownToHtml";
import getSiteUrl from "./getSiteUrl";
import { getAllPosts, getPublishedPosts } from "src/data/getPosts";
import { toHTML } from "@portabletext/to-html";
import { Post } from "src/types/post";
import { encode } from "html-entities";
import { dimensionsFor, srcFor } from "src/providers/sanity";

function generateImage({ value }) {
  const { width, height } = dimensionsFor(value);
  const src = srcFor(value).width(width).height(height).url();
  return `<img src="${src}" width="${width}" height="${height}" title="${value.title}" alt="${value.alt}" />`;
}

function generatePostContent(post: Post) {
  const html = toHTML(post.body, {
    components: {
      types: {
        image: generateImage,
        // TODO: Add Album references back into block content
        // album: ({ value }) => value.images.map(generateImage).join("\n"),
        code: ({ value }) => `<pre><code>${encode(value.code)}</code></pre>`,
        note: ({ value }) => String(markdownToHtml(value.body)),
      },
    },
  });
  return html;
}

export default async function generateFeed() {
  const isDev = process.env.NODE_ENV === "development";
  const posts = isDev ? await getAllPosts() : await getPublishedPosts();
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
