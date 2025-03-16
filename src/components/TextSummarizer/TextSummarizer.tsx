import { useEffect, useState } from "react";
import { useLazySummarizeProvidedTextQuery } from "@/services/article";
import { LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import SummaryForm from "./SummaryForm/SummaryForm";
import SummaryList from "./SummaryList/SummaryList";
import SummaryCard from "./SummaryCard/SummaryCard";

interface Article {
  title: string;
  summary: string;
}

const TextSummarizer = () => {
  const [summaryData, setSummaryData] = useState<Article | null>(null);
  const [allSummaryData, setAllSummaryData] = useState<Article[]>([]);

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
        setSummaryData({ title: data.title, summary: data.summary });
        localStorage.setItem("summary", JSON.stringify(updatedAllArticles));
        setAllSummaryData(updatedAllArticles);
      }
      form.reset();
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
    form.reset();
  };

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
        form={form} // Pass the form object to SummaryForm
      />
      {allSummaryData.length > 0 && <SummaryList articles={allSummaryData} />}
      {summaryData && summaryData.title && summaryData.summary && (
        <SummaryCard title={summaryData.title} summary={summaryData.summary} />
      )}
    </>
  );
};

export default TextSummarizer;
