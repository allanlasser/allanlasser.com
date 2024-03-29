import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { markdownSchema } from "sanity-plugin-markdown";
import { media } from "sanity-plugin-media";
import schemas from "src/schemas/schema";
import deskStructure from "src/utils/deskStructure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const singletonTypes = ["homepage", "resume", "portfolio"];

export default defineConfig({
  title: "Homebase",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
    media(),
    markdownSchema(),
    codeInput(),
  ],
  schema: {
    types: schemas,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => !singletonTypes.includes(templateItem.templateId)
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (singletonTypes.includes(schemaType)) {
        return prev.filter(
          ({ action }) =>
            !(action && ["unpublish", "delete", "duplicate"].includes(action))
        );
      }
      return prev;
    },
  },
});
