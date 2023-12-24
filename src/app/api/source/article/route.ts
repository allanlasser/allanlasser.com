import { type NextRequest, NextResponse } from "next/server";
import { createArticleFromUrl, findExistingSource } from "src/data/source";
import { z } from "zod";

const POSTBody = z.object({
  secret: z.string(),
  url: z.string().url(),
});

/** Create a new article from the URL */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = POSTBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.toString(), { status: 400 });
  }
  if (parsed.data.secret !== process.env.API_SECRET) {
    return NextResponse.json("Not Authorized", {
      status: 401,
      statusText: "Not Authorized",
    });
  }
  const { url } = parsed.data;
  try {
    const article =
      (await findExistingSource({ url })) ?? (await createArticleFromUrl(url));
    return NextResponse.json(article, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
