// /deskStructure.js
import S from "@sanity/desk-tool/structure-builder";

const structure = () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Portfolio")
        .child(
          S.document()
            .schemaType("portfolio")
            .documentId("portfolio")
            .title("Portfolio")
        ),
      S.listItem()
        .title("Resume")
        .child(
          S.document().schemaType("resume").documentId("resume").title("Resume")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["resume", "portfolio"].includes(listItem.getId())
      ),
    ]);

export default structure;
