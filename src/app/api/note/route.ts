import { NextRequest, NextResponse } from "next/server";
import createNote, { CreateNoteArgs } from "src/data/createNote";
import getAllNotes from "src/data/getAllNotes";
import getNote from "src/data/getNote";
import { Note } from "src/types/note";

interface POSTBody extends CreateNoteArgs {
  secret: string;
}

type ResponseData =
  | string
  | Note
  | Note[]
  | {
      message: string;
      liveUrl?: string;
      studioUrl?: string;
    };

export async function POST(
  req: NextRequest
): Promise<NextResponse<ResponseData>> {
  const body: POSTBody = await req.json();
  // ensure secret
  if (body.secret !== process.env.API_SECRET) {
    return NextResponse.json("Not Authorized", {
      status: 401,
      statusText: "Not Authorized",
    });
  }
  // create new entry in Sanity
  const { note } = await createNote(body);
  // return the link the page in the studio
  return NextResponse.json(
    {
      message: "Note successfully created",
      liveUrl: `https://allanlasser.com/notes/${note._id}`,
      studioUrl: `https://allanlasser.com/studio/desk/notes;${note._id}`,
    },
    { status: 200 }
  );
}

export async function GET(
  req: NextRequest
): Promise<NextResponse<ResponseData>> {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.getAll("id") ?? "";
  let data: Note | Note[];
  if (id && Boolean(id.length)) {
    const idArray = ([] as string[]).concat(id);
    if (idArray.length === 1) {
      data = await getNote(idArray[0]);
    } else {
      data = await Promise.all(idArray.map(async (id) => await getNote(id)));
    }
  } else {
    data = await getAllNotes();
  }
  return NextResponse.json(data, { status: 200 });
}
