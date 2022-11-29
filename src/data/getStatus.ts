import { groq } from "next-sanity";
import Sanity from "src/providers/sanity";

const GET_STATUS = groq`*[_type == "homepage" && _id == "homepage"][0]{ status }`;

export default async function getHomepage() {
  const { status } = await Sanity.fetch(GET_STATUS);
  return status;
}
