import {
  Library,
  Bookmark,
  Pencil,
  Briefcase,
  LayoutGrid,
  Scroll,
  Home,
} from "lucide-react";
import type { StructureBuilder } from "sanity/desk";

export default function deskStructure(S: StructureBuilder) {
  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(Home)
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Homepage")
        ),
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
      S.listItem()
        .title("Shelf")
        .icon(Library)
        .child(S.documentList().title("Sources").filter('_type == "source"')),
      S.listItem()
        .title("Notes")
        .icon(Bookmark)
        .child(S.documentList().title("Notes").filter('_type == "note"')),
      S.listItem()
        .title("Posts")
        .icon(Pencil)
        .child(S.documentList().title("Posts").filter('_type == "post"')),
      S.listItem()
        .title("Projects")
        .icon(Briefcase)
        .child(S.documentList().title("Projects").filter('_type == "project"')),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId();
        return !(
          id &&
          [
            "homepage",
            "resume",
            "portfolio",
            "project",
            "post",
            "note",
            "source",
          ].includes(id)
        );
      }),
    ]);
}
