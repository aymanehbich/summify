import { useEffect, useState } from "react";
import { useLazySummarizeProvidedTextQuery } from "@/services/article";
import { LoadingOverlay, Modal, Button, Group, Text } from "@mantine/core";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import SummaryForm from "./SummaryForm/SummaryForm";
import SummaryList from "./SummaryList/SummaryList";
import SummaryCard from "./SummaryCard/SummaryCard";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

interface Article {
  title: string;
  summary: string;
}

const TextSummarizer = () => {
  const [summaryData, setSummaryData] = useState<Article | null>(null);
  const [allSummaryData, setAllSummaryData] = useState<Article[]>([]);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 70,
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteTitle, setDeleteTitle] = useState<string | null>(null);

  const [triggerSummarize, { isFetching }] =
    useLazySummarizeProvidedTextQuery();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      text: "",
    },
    validate: {
      text: (value) =>
        value.length < 100 ? "Text must be more than 100 characters" : null,
    },
  });

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("summary") || "[]"
    ) as Article[];
    setAllSummaryData(articlesFromLocalStorage);
  }, []);

  const handleSubmit = async (values: { text: string }) => {
    const text = values.text.trim();
    try {
      const { data } = await triggerSummarize({ text });
      if (data) {
        const updatedAllArticles = [
          { title: data.title, summary: data.summary },
          ...allSummaryData,
        ];
        const newSummary = { title: data.title, summary: data.summary };
        setSummaryData(newSummary);
        localStorage.setItem("summary", JSON.stringify(updatedAllArticles));
        setAllSummaryData(updatedAllArticles);

        notifications.show({
          title: "Success",
          message: "Text summarized successfully!",
          color: "green",
        });
      }
      form.reset();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to process the request.",
        color: "red",
      });
      console.error("Error summarizing text:", error);
    }
  };

  const handleConfirmDelete = (title: string) => {
    const updatedAllArticles = allSummaryData.filter(
      (article) => article.title !== title
    );
    setAllSummaryData(updatedAllArticles);
    localStorage.setItem("summary", JSON.stringify(updatedAllArticles));

    if (summaryData?.title === title) {
      setSummaryData(null);
    }

    close();

    notifications.show({
      title: "Success",
      message: "Article deleted successfully!",
      color: "green",
    });
  };

  useEffect(() => {
    if (summaryData?.summary) {
      scrollIntoView();
    }
  }, [summaryData?.summary, scrollIntoView]);

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
      <SummaryForm
        onSubmit={handleSubmit}
        isFetching={isFetching}
        form={form}
      />
      {allSummaryData.length > 0 && (
        <>
          <SummaryList
            articles={allSummaryData}
            onDelete={(title) => {
              setDeleteTitle(title);
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
                onClick={() => deleteTitle && handleConfirmDelete(deleteTitle)}
              >
                Delete
              </Button>
            </Group>
          </Modal>
        </>
      )}
      {summaryData && summaryData.title && summaryData.summary && (
        <SummaryCard
          title={summaryData.title}
          summary={summaryData.summary}
          ref={targetRef}
        />
      )}
    </>
  );
};

export default TextSummarizer;
