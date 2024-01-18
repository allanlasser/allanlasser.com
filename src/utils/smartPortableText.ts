import type { PortableTextBlock, PortableTextTextBlock } from "sanity";
import smartquotes from "smartquotes";

function isTextBlock(block: PortableTextBlock): block is PortableTextTextBlock {
  return block._type === "block" && Boolean(block.children);
}

export default function smartPortableText(blocks: PortableTextBlock[]) {
  return blocks.map((block) => {
    if (!isTextBlock(block)) {
      return block;
    }
    const children = block.children.map((child) => {
      if (child._type !== "span" || !child.text) {
        return child;
      }

      const text = smartquotes(child.text);

      return Object.assign({}, child, { text });
    });

    return Object.assign({}, block, { children });
  });
}
