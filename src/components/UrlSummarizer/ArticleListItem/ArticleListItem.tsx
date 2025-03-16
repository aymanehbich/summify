import AccordionControl from "@/components/custom-components/AccordionControl";
import { Accordion, Text } from "@mantine/core";

interface Article {
  url: string;
  summary: string;
}

interface ArticleListItemProps {
  article: Article;
  onDelete: (url: string) => void;
}

export const ArticleListItem: React.FC<ArticleListItemProps> = ({
  article,
  onDelete,
}) => {
  return (
    <Accordion.Item key={article.url} value={article.url}>
      <AccordionControl
        url={article.url}
        onDelete={() => onDelete(article.url)}
      >
        <Text size="sm" c="blue.9" lineClamp={1}>
          {article.url}
        </Text>
      </AccordionControl>
      <Accordion.Panel>
        <Text size="md">{article.summary}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
