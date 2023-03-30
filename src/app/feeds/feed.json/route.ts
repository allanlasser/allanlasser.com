import generateFeed from "src/utils/generateFeed";

export async function GET() {
  const feed = await generateFeed();
  return new Response(feed.json1(), {
    headers: { "Content-Type": "application/json" },
  });
}
