import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// import { schemaTypes } from "src/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// export default defineConfig({
//   basePath: "/studio",

//   projectId,
//   dataset,

//   plugins: [deskTool()],

//   schema: {
//     types: schemaTypes,
//   },
// });

export default defineConfig({
  title: "Homebase",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [deskTool()],
  schema: {
    types: [],
  },
});
