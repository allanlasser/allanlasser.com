import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createBookFromISBN, findExistingSource } from "src/data/source";

const POSTBody = z.object({
  secret: z.string(),
  isbn: z.string(),
});

/** Create a new book from the ISBN */
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
  const { isbn } = parsed.data;
  try {
    const book =
      (await findExistingSource({ isbn })) ?? (await createBookFromISBN(isbn));
    return NextResponse.json(book, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, {
      status: 500,
      statusText: "An error occurred.",
    });
  }
}
