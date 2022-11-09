import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";

export default async function PortfolioProjectHead({ params }) {
  const { slug } = params;
  const PROJECT_QUERY = groq`*[_type == "project" && slug.current == "${slug}"][0]`;
  const project = await Sanity.fetch<Schema.Project>(PROJECT_QUERY);
  const title = `Allan Lasser: Work: ${project.title}`;
  return (
    <>
      <title>{title}</title>
    </>
  );
}
