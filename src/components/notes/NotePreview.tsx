import type { PreviewProps } from "sanity";
import { Box, Text } from "@sanity/ui";
import ReactMarkdown from "react-markdown";
import smartquotes from "smartquotes";

interface PreviewNoteProps extends PreviewProps {
  body: string;
}

export function NotePreview(props: PreviewNoteProps) {
  const { body } = props;
  return (
    <div className='notePreview'>
      <Box as='main' padding={2}>
        {body && (
          <Text size={2} className='bodyText'>
            <ReactMarkdown>{smartquotes(body)}</ReactMarkdown>
          </Text>
        )}
      </Box>
      <Box as='footer' padding={2} frameBorder={1}>
        {props.renderDefault(props)}
      </Box>
    </div>
  );
}
