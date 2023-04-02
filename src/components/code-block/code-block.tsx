import Refractor from "react-refractor";
import ts from "refractor/lang/typescript";
import tsx from "refractor/lang/tsx";
import js from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import css from "refractor/lang/css";
import html from "refractor/lang/markup";
import styles from "./code-block.module.css";
import "./tomorrow-night.css";

Refractor.registerLanguage(ts);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(js);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(css);
Refractor.registerLanguage(html);

export interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export default function CodeBlock(props: CodeBlockProps) {
  return (
    <figure className={styles.codeBlock}>
      {props.title && (
        <figcaption className={styles.title}>{props.title}</figcaption>
      )}
      <Refractor language={props.language} value={props.code} />
    </figure>
  );
}
