import { deromanize } from "romans";
import { Note } from "src/types/note";

function isRoman(page: number | string) {
  return typeof page === "string" && isNaN(parseInt(page));
}

/** Note pages are strings, which may represent an Arabic or Roman numeral.
 *  Since they're used in prefaces and introductions, Roman numerals should always preceed Arabic numerals.
 *  So we want to split the notes by whether their page is Roman or Arabaic numeral.
 *  This can be tested with the above `isRoman` function.
 *  Once we've got our notes grouped by Arabic and Roman numeral, we can then sort them.
 *  Finally, we'll return the concatenation of the two lists with Roman coming first.
 */
export default function orderNotesByPage(notes: Note[]): Note[] {
  const [roman, arabic] = notes.reduce<[Note[], Note[]]>(
    ([roman, arabic], note) => {
      if (isRoman(note.page)) {
        return [[...roman, note], arabic];
      } else {
        return [roman, [...arabic, note]];
      }
    },
    [[], []]
  );
  const sortedRoman = roman.sort(
    (a, b) =>
      deromanize(a.page.toUpperCase()) - deromanize(b.page.toUpperCase())
  );
  const sortedArabic = arabic.sort(
    (a, b) => parseInt(a.page) - parseInt(b.page)
  );
  return [...sortedRoman, ...sortedArabic];
}
