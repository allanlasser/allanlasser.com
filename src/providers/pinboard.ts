import qs from "qs";

export interface Bookmark {
  hash: string;
  href: string;
  time: string;
  description: string;
}

export async function getRecentBookmarks(tags): Promise<Bookmark[]> {
  const query = qs.stringify({
    auth_token: process.env.PINBOARD_API_TOKEN,
    tag: tags,
    format: "json",
  });
  const res = await fetch(`https://api.pinboard.in/v1/posts/recent?${query}`);
  const data = await res.json();
  return data.posts;
}
