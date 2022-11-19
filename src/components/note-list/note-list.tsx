import { Note } from "src/types/note";
import list from "src/styles/list.module.css";
import NoteItem from "../note-item/note-item";
import styles from "./note-list.module.css";

export interface NoteListProps {
  notes: Note[];
}

/**
 *  The NoteList component renders out notes with their sources attached.
 *  They are sorted by the date the note was created, with the most
 *  recent note appearing at the top of the list.
 */
export default function NoteList(props: NoteListProps) {
  const { notes } = props;
  return (
    <ul className={list.noStyle}>
      {notes.map((note) => (
        <li key={note._id} className={styles.listItem}>
          <NoteItem {...note} />
        </li>
      ))}
    </ul>
  );
}
