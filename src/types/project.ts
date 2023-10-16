import { BlockContent } from "src/providers/sanity/schema";
import { Image } from "./image";
import { Company } from "./company";

export interface Project {
  _type: "project";
  title?: string;
  slug?: { _type: "slug"; current: string };
  year: number;
  company: Company;
  description?: string;
  link?: string;
  mainImage?: Image;
  body?: BlockContent;
}
