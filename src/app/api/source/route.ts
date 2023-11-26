import { NextRequest, NextResponse } from "next/server";
import createSource, { CreateSourceArgs } from "src/data/createSource";
import getAllSources from "src/data/getAllSources";
import getSource from "src/data/getSource";
import { Source } from "src/types/source";

interface POSTBody extends CreateSourceArgs {
  secret: string;
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
  // create new entry in Sanity
  const source = await createSource(body);
  // return the link the page in the studio
  return NextResponse.json(
    {
      message: "Note successfully created",
      liveUrl: `https://allanlasser.com/shelf/${source._id}`,
      studioUrl: `https://allanlasser.com/studio/desk/shelf;${source._id}`,
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
  console.log(id);
  if (id && Boolean(id.length)) {
    const idArray = ([] as string[]).concat(id);
    if (idArray.length === 1) {
      data = await getSource(idArray[0]);
      // data = await getNote(idArray[0]);
    } else {
      data = await Promise.all(idArray.map(async (id) => await getSource(id)));
    }
  } else {
    console.log("get all sources");
    data = await getAllSources();
    console.log(data);
  }
  return NextResponse.json(data, { status: 200 });
}
