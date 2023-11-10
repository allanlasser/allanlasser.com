import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import getRoute from "src/utils/getRoute";

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

interface WebhookBody {
  _type: string;
  _id: string;
  slug: { current: string } | null;
}

function pathsToRevalidate(body: WebhookBody): string[] {
  /* Projects and posts use slugs; sources and notes use ids */
  const { _type, _id, slug } = body;
  let param = _id;
  if (slug) param = slug.current;
  /* Get the path to revalidate */
  const route = getRoute(_type, param);
  if (!route) return [];
  /* Get the related paths to revalidate */
  let relatedRoutes: string[] = [];
  switch (_type) {
    case "post":
    case "note":
      relatedRoutes = ["/"];
      break;
    case "project":
      relatedRoutes = ["/portfolio"];
      break;
    case "source":
      relatedRoutes = ["/", "/shelf"];
      break;
  }
  return [route, ...relatedRoutes];
}

interface RevalidateResponse {
  revalidated: boolean;
  now: number;
  message: string;
}

export async function POST(request: NextRequest) {
  /* Ensure the request is valid. */
  if (!SANITY_WEBHOOK_SECRET) {
    const message = "Sanity webhook secret has not been set.";
    return NextResponse.json<RevalidateResponse>(
      { revalidated: false, now: Date.now(), message },
      { status: 500, statusText: message }
    );
  }
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    const message = "Missing Sanity signature header";
    return NextResponse.json<RevalidateResponse>(
      { revalidated: false, now: Date.now(), message },
      { status: 400, statusText: message }
    );
  }
  const isValid = isValidSignature(
    JSON.stringify(request.body),
    signature,
    SANITY_WEBHOOK_SECRET
  );
  if (!isValid) {
    const message = "Sanity webhook secret is invalid.";
    return NextResponse.json<RevalidateResponse>(
      { revalidated: false, now: Date.now(), message },
      { status: 403, statusText: message }
    );
  }
  /* The request is valid. Attempt revalidation. */
  const body: WebhookBody = await request.json();
  const paths = pathsToRevalidate(body);
  paths.forEach((path) => revalidatePath(path));
  const message = `Revalidated the following paths: ${JSON.stringify(paths)}`;
  return NextResponse.json<RevalidateResponse>(
    { revalidated: true, now: Date.now(), message },
    { status: 200 }
  );
}
