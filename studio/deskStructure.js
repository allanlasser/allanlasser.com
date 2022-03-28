// /deskStructure.js
import S from "@sanity/desk-tool/structure-builder";

const structure = () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Resume")
        .child(
          S.document().schemaType("resume").documentId("resume").title("Resume")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["resume"].includes(listItem.getId())
      ),
    ]);

export default structure;
