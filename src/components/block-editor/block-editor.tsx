import {
  PortableTextBlock,
  PortableTextInput,
  PortableTextInputProps,
} from "sanity";
import type { OnPasteFn } from "@sanity/portable-text-editor";
import { htmlToBlocks } from "@sanity/block-tools";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";

const handlePaste: OnPasteFn = async (input) => {
  const { event, schemaTypes, path } = input;
  const text = event.clipboardData.getData("text/plain");
  const html = event.clipboardData.getData("text/html");
  let safeHtml: string | undefined;
  if (html) {
    safeHtml = await htmlToSafeHtml(html);
  } else if (text) {
    safeHtml = await textToSafeHtml(text);
  }
  const hasCodeType = schemaTypes.portableText.of
    .map(({ name }) => name)
    .includes("code");
  if (hasCodeType && safeHtml) {
    console.log({ safeHtml });
    const blocks = htmlToBlocks(safeHtml, schemaTypes.portableText, {
      parseHtml: (html) => new DOMParser().parseFromString(html, "text/html"),
      rules: [
        {
          deserialize(el, next, block) {
            /**
             *  `el` and `next` is DOM Elements
             * learn all about them:
             * https://developer.mozilla.org/en-US/docs/Web/API/Element
             **/
            /* We only want special formatting for <pre> blocks */
            if (
              !el ||
              !el.hasChildNodes ||
              (el.nodeName && el.nodeName.toLowerCase() !== "pre")
            ) {
              return undefined;
            }
            console.log(el);
            const code = el.childNodes[0];
            const childNodes =
              code && code.nodeName.toLowerCase() === "code"
                ? code.childNodes
                : el.childNodes;
            let text = "";
            childNodes.forEach((node) => {
              console.log(node.textContent);
              text += `${node.textContent}\n`;
            });
            /**
             * Return this as an own block (via block helper function),
             * instead of appending it to a default block's children
             */
            return block({
              _type: "code",
              code: text,
            });
          },
        },
      ],
    });
    return {
      insert: blocks as PortableTextBlock[],
      path,
    };
  }
  return undefined;
};

async function textToSafeHtml(text: string): Promise<string> {
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(text);
  return String(html);
}

async function htmlToSafeHtml(rawHtml: string): Promise<string> {
  const html = await unified()
    .use(rehypeParse)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(rawHtml);
  return String(html);
}

export default function BlockEditor(props: PortableTextInputProps) {
  return <PortableTextInput {...props} onPaste={handlePaste} />;
}
