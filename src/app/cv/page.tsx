import getResume from "src/data/getResume";
import Resume from "src/components/resume";

export default async function ResumePage({ children }) {
  const resume = await getResume();
  return <Resume {...resume} />;
}

export const revalidate = 3600;
