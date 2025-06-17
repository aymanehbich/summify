import React from "react";
import ReactMarkdown from "react-markdown";
import { List, ListItem, Title, Text, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

interface MarkdownRendererProps {
  children: string;
}

export const Markdown: React.FC<MarkdownRendererProps> = ({ children }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <Title order={1} my="md" {...props} />,
        h2: ({ node, ...props }) => <Title order={2} my="md" {...props} />,
        h3: ({ node, ...props }) => (
          <Title order={3} c="dark.7" mt="md" mb="xs" {...props} />
        ),
        h4: ({ node, ...props }) => <Title order={4} my="md" {...props} />,
        h5: ({ node, ...props }) => <Title order={5} {...props} />,
        h6: ({ node, ...props }) => <Title order={6} {...props} />,
        p: ({ node, ...props }) => <Text size="md" {...props} />,
        ul: ({ node, ...props }) => (
          <List
            // styles={{ itemWrapper: { alignItems: "flex-start" } }}
            my="sm"
            icon={
              <ThemeIcon
                variant="transparent"
                color="green"
                size={24}
                radius="xl"
              >
                <IconCircleCheck size={16} />
              </ThemeIcon>
            }
            type="unordered"
            {...props}
          />
        ),
        // ReactMarkdown may pass HTML 'type' attributes like "a", "A", "i", etc. from <ol>,
        // but Mantine's <List> only supports "ordered" or "unordered" as valid 'type' values.
        // We remove the 'type' from props to prevent type errors and manually set 'type="ordered"'.
        ol: ({ node, ...props }) => {
          // Strip out the 'type' attribute from props to avoid Mantine type error
          const { type, ...rest } = props;
          return <List mb="sm" type="ordered" withPadding {...rest} />;
        },
        li: ({ node, ...props }) => <ListItem {...props} />,
        // strong: ({ node, ...props }) => <Text size="md" {...props} />,
        strong: ({ node, ...props }) => (
          <Text fw={500} component="strong" size="md" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
