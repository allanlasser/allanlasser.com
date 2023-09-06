import {
  Library,
  Bookmark,
  Pencil,
  Briefcase,
  LayoutGrid,
  Scroll,
  Home,
  Image,
  Building2,
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
      S.divider(),
      S.listItem()
        .title("Posts")
        .icon(Pencil)
        .child(S.documentList().title("Posts").filter('_type == "post"')),
      S.listItem()
        .title("Albums")
        .icon(Image)
        .child(S.documentList().title("Albums").filter('_type == "album"')),
      S.divider(),
      S.listItem()
        .title("Shelf")
        .icon(Library)
        .child(S.documentList().title("Sources").filter('_type == "source"')),
      S.listItem()
        .title("Notes")
        .icon(Bookmark)
        .child(S.documentList().title("Notes").filter('_type == "note"')),
      S.divider(),
      S.listItem()
        .title("Companies")
        .icon(Building2)
        .child(
          S.documentList().title("Companies").filter('_type == "company"')
        ),
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
            "album",
            "company",
          ].includes(id)
        );
      }),
    ]);
}
