import { NextRequest, NextResponse } from "next/server";
import {
  getSource,
  getAllSources,
  createSource,
  CreateSourceArgs,
  findExistingSource,
} from "src/data/source";
import { Source } from "src/types/source";

interface POSTBody extends CreateSourceArgs {
  secret?: string;
}

type ResponseData =
  | string
  | Source
  | Source[]
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
  delete body.secret;
  // check if a note already exists for the given URL or ISBN
  // if it does, we'll just return the existing source
  const existingSource = await findExistingSource(body);
  if (existingSource) {
    return NextResponse.json({
      message: "Existing source found",
      id: existingSource._id,
      liveUrl: `https://allanlasser.com/shelf/${existingSource._id}`,
      studioUrl: `https://allanlasser.com/studio/desk/shelf;${existingSource._id}`,
    });
  }
  // create new entry in Sanity
  const newSource = await createSource(body);
  // return the link the page in the studio
  return NextResponse.json(
    {
      message: "Source successfully created",
      id: newSource._id,
      liveUrl: `https://allanlasser.com/shelf/${newSource._id}`,
      studioUrl: `https://allanlasser.com/studio/desk/shelf;${newSource._id}`,
    },
    { status: 200 }
  );
}

export async function GET(
  req: NextRequest
): Promise<NextResponse<ResponseData>> {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.getAll("id") ?? "";
  let data: Source | Source[];

  if (id && Boolean(id.length)) {
    const idArray = ([] as string[]).concat(id);
    if (idArray.length === 1) {
      data = await getSource(idArray[0]);
      // data = await getNote(idArray[0]);
    } else {
      data = await Promise.all(idArray.map(async (id) => await getSource(id)));
    }
  } else {
    data = await getAllSources();
  }
  return NextResponse.json(data, { status: 200 });
}
