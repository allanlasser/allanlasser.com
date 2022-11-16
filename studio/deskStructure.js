// /deskStructure.js
import {
  Library,
  Bookmark,
  Pencil,
  Briefcase,
  LayoutGrid,
  Scroll,
} from "lucide-react";
import S from "@sanity/desk-tool/structure-builder";

const structure = () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Posts")
        .icon(Pencil)
        .child(S.documentList().title("Posts").filter('_type == "post"')),
      S.listItem()
        .title("Notes")
        .icon(Bookmark)
        .child(S.documentList().title("Notes").filter('_type == "note"')),
      S.listItem()
        .title("Library")
        .icon(Library)
        .child(S.documentList().title("Sources").filter('_type == "source"')),
      S.divider(),
      S.listItem()
        .title("Projects")
        .icon(Briefcase)
        .child(S.documentList().title("Projects").filter('_type == "project"')),
      S.listItem()
        .title("Portfolio")
        .icon(LayoutGrid)
        .child(
          S.document()
            .schemaType("portfolio")
            .documentId("portfolio")
            .title("Portfolio")
        ),
      S.listItem()
        .title("Resume")
        .icon(Scroll)
        .child(
          S.document().schemaType("resume").documentId("resume").title("Resume")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "resume",
            "portfolio",
            "project",
            "post",
            "note",
            "source",
          ].includes(listItem.getId())
      ),
    ]);

export default structure;
