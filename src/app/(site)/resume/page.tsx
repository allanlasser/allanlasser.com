import getResume from "src/data/getResume";
import Resume from "src/components/resume";
import { Metadata } from "next";
import layout from "src/styles/layout.module.css";

export default async function ResumePage() {
  const resume = await getResume();
  return (
    <div className={layout.detail}>
      <Resume {...resume} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Résumé",
};

export const revalidate = 3600;
