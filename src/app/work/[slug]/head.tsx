import getProject from "src/data/getProject";

export default async function PortfolioProjectHead({ params }) {
  const project = await getProject(params.slug);
  const title = `Allan Lasser: Work: ${project.title}`;
  return (
    <>
      <title>{title}</title>
    </>
  );
}
