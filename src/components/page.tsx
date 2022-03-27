import React from "react";
import cn from "classnames";
import useSmartquotes from "src/hooks/useSmartquotes";
import pageStyles from "src/styles/page.module.css";
import typography from "src/styles/typography.module.css";

export interface PageProps {
  title?: string;
}

const Page: React.FC<PageProps> = (props) => {
  useSmartquotes();
  return (
    <article className={cn(pageStyles.container, typography.text)}>
      {props.title && (
        <h1 className={cn(typography.title, pageStyles.title)}>
          {props.title}
        </h1>
      )}
      {props.children}
    </article>
  );
};

export default Page;
