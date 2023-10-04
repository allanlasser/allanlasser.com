import blockContent from "./blockContent";
import post from "./post";
import company from "./company";
import portfolio from "./portfolio";
import resume, { position } from "./resume";
import project from "./project";
import note from "./note";
import source from "./source";
import homepage from "./homepage";
import album from "./album";

const schemas = [
  note,
  source,
  album,
  blockContent,
  post,
  company,
  project,
  position,
  portfolio,
  resume,
  homepage,
];

export default schemas;
