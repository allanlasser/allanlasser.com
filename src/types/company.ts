import { Image } from "./image";

export interface Company {
  _type: "company";
  name: string;
  logo: Image;
}
