import { Accordion, AccordionControl, Text } from "@mantine/core";

interface Article {
  title: string;
  summary: string;
}

interface SummaryListProps {
  articles: Article[];
}

const SummaryList = ({ articles }: SummaryListProps) => {
  return (
    <>
      <Text pl="sm" size="sm" fw={600} mt="md">
        Latest Articles
      </Text>
      <Accordion my="xs" variant="separated" chevronPosition="left">
        {articles.slice(0, 4).map((text, index) => (
          <Accordion.Item key={`${text.title}-${index}`} value={text.title}>
            <AccordionControl>
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