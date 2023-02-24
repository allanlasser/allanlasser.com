import getResume from "src/data/getResume";
import Resume from "src/components/resume";
import { Metadata } from "next";

export default async function ResumePage() {
  const resume = await getResume();
  return <Resume {...resume} />;
}

export const metadata: Metadata = {
  title: "CV",
};

export const revalidate = 3600;
