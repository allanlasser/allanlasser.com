import { GetStaticProps, NextPage } from "next";
import { groq } from "next-sanity";
import Sanity, { Schema } from "src/providers/sanity";
import Resume from "src/components/resume";

export interface ResumePageProps {
  resume: Schema.Resume;
}

const ResumePage: NextPage<ResumePageProps> = (props) => {
  const { resume } = props;
  return (
    <div>
      <Resume {...resume} />
    </div>
  );
};

export default ResumePage;

export const getStaticProps: GetStaticProps<ResumePageProps> = async () => {
  const query = groq`*[_type == "resume" && _id == "resume"][0]`;
  const resume = await Sanity.fetch<Schema.Resume>(query);
  return {
    props: {
      resume,
    },
    revalidate: 3600,
  };
};
