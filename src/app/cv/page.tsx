import { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";
import Resume from "src/components/resume";

const GET_RESUME = groq`*[_type == "resume" && _id == "resume"][0]`;

export interface ResumePageProps {
  resume: Schema.Resume;
}

export default async function ResumePage({ children }) {
  const resume = await Sanity.fetch<Schema.Resume>(GET_RESUME);
  return <Resume {...resume} />;
}

// async function getResume() {

//   const resume =
//   return {
//     props: {
//       resume,
//     },
//     revalidate: 3600,
//   };
// }
