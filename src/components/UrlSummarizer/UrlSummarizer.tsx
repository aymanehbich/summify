import React, { useState, useEffect } from "react";
import { LoadingOverlay, Modal, Button, Group, Text } from "@mantine/core";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { ArticleList } from "./ArticlesList/ArticlesList";
import { ArticleSummary } from "./ArticleSummary/ArticleSummary";
import { useLazyFetchAndSummarizeArticleQuery } from "@/services/article";
import UrlInput from "./UrlInput/UrlInput";

interface Article {
  url: string;
  summary: string;
}
export const UrlSummarizer: React.FC = () => {
  const [article, setArticle] = useState<Article>({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 70,
  });
  const [articleSummary, { isFetching }] =
    useLazyFetchAndSummarizeArticleQuery();
  const [deleteUrl, setDeleteUrl] = useState<string | null>(null);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles") || "[]"
    ) as Article[];
    setAllArticles(articlesFromLocalStorage);
  }, []);

  const handleSubmit = async (values: { url: string }) => {
    try {
      const normalizedUrl = values.url.replace(/\/+$/, "");
      const { data } = await articleSummary({ articleUrl: normalizedUrl });

      // if (error) throw new Error(error.error);

      if (data?.summary) {
        const existingArticleIndex = allArticles.findIndex(
          (article) => article.url === normalizedUrl
        );

        let updatedAllArticles: Article[];

        if (existingArticleIndex !== -1) {
          updatedAllArticles = [...allArticles];
          updatedAllArticles[existingArticleIndex].summary = data.summary;
        } else {
          updatedAllArticles = [
            { url: normalizedUrl, summary: data.summary },
            ...allArticles,
          ];
        }

        setArticle({ url: normalizedUrl, summary: data.summary });
        setAllArticles(updatedAllArticles);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));

        notifications.show({
          title: "Success",
          message: "Article summarized successfully!",
          color: "green",
        });
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to process the request.",
        color: "red",
      });
      console.error("Error:", error);
    }
  };

  const handleConfirmDelete = (url: string) => {
    const updatedAllArticles = allArticles.filter(
      (article) => article.url !== url
    );
    setAllArticles(updatedAllArticles);
    localStorage.setItem("articles", JSON.stringify(updatedAllArticles));

    if (article.url === url) {
      setArticle({ url: "", summary: "" });
    }

    close();
  };

  useEffect(() => {
    if (article.summary) {
      scrollIntoView();
    }
  }, [article.summary, scrollIntoView]);

  return (
    <>
      <LoadingOverlay
        styles={{
          overlay: {
            backgroundColor: "var(--mantine-color-body)",
            opacity: 0.7,
            position: "fixed",
          },
        }}
        visible={isFetching}
        loaderProps={{ type: "dots" }}
        overlayProps={{ blur: 100 }}
        zIndex={11}
      />
      <UrlInput onSubmit={handleSubmit} isFetching={isFetching} />
      {allArticles.length > 0 && (
        <>
          <ArticleList
            articles={allArticles}
            onDelete={(url) => {
              setDeleteUrl(url);
              open();
            }}
          />
          <Modal
            opened={opened}
            onClose={close}
            title="Delete Article"
            centered
          >
            <Text>Are you sure you want to delete this article?</Text>
            <Group grow mt="sm">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button
                color="red"
                // variant="light"
                onClick={() => deleteUrl && handleConfirmDelete(deleteUrl)}
              >
                Delete
              </Button>
            </Group>
          </Modal>
        </>
      )}
      {article.summary && (
        <ArticleSummary summary={article.summary} ref={targetRef} />
      )}
    </>
  );
};

export default UrlSummarizer;
