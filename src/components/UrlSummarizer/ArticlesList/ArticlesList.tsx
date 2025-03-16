import { Accordion, Text } from "@mantine/core";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";

interface Article {
  url: string;
  summary: string;
}
interface ArticleListProps {
  articles: Article[];
  onDelete: (url: string) => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  onDelete,
}) => {
  return (
    <>
      <Text pl="sm" size="sm" fw={600} mt="md">
        Latest Articles
      </Text>
      {/* <ScrollArea.Autosize mah={200} mx="auto"> */}
      <Accordion mt="xs" variant="separated" chevronPosition="left">
        {articles.slice(0, 4).map((article) => (
          <ArticleListItem
            key={article.url}
            article={article}
            onDelete={onDelete}
          />
        ))}
      </Accordion>
      {/* </ScrollArea.Autosize> */}
    </>
  );
};
