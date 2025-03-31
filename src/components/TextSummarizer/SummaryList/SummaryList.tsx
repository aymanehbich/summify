import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Center,
  Text,
} from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";

interface Article {
  title: string;
  summary: string;
}

interface SummaryListProps {
  articles: Article[];
  onDelete: (title: string) => void;
}

function AccordionControl(props: AccordionControlProps & { onDelete: () => void }) {
  return (
    <Center>
      <Accordion.Control {...props} />
      <ActionIcon
        mr="md"
        variant="subtle"
        color="red"
        aria-label="Remove article"
        onClick={(e) => {
          e.stopPropagation();
          props.onDelete();
        }}
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Center>
  );
}

const SummaryList = ({ articles, onDelete }: SummaryListProps) => {
  return (
    <>
      <Text pl="sm" size="sm" fw={600} mt="md">
        Latest Articles
      </Text>
      <Accordion my="xs" variant="separated" chevronPosition="left">
        {articles.slice(0, 4).map((text, index) => (
          <Accordion.Item key={`${text.title}-${index}`} value={text.title}>
            <AccordionControl onDelete={() => onDelete(text.title)}>
              <Text size="sm" c="blue.9" lineClamp={1}>
                {text.title}
              </Text>
            </AccordionControl>
            <Accordion.Panel>
              <Text size="md">{text.summary}</Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default SummaryList;