import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import OpenAI from "openai";

const FLASK_API_URL = "https://aymane-hbich-summify.vercel.app";
const AZURE_INFERENCE_URL = "https://models.inference.ai.azure.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const EXTRACTOR_API_KEY = import.meta.env.VITE_API_KEY_EXTRACTOR;
const MODEL_NAME = "gpt-4o";

// Create OpenAI client
const openaiClient = new OpenAI({
  baseURL: AZURE_INFERENCE_URL,
  apiKey: GITHUB_TOKEN,
  dangerouslyAllowBrowser: true,
});

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({ baseUrl: FLASK_API_URL }),
  endpoints: (builder) => ({
    // Endpoint to extract text from a URL and summarize it
    fetchAndSummarizeArticle: builder.query({
      queryFn: async (params: { articleUrl: string }) => {
        try {
          // Step 1: Extract the article text using Flask backend
          const articleExtractionResponse = await axios.get(
            `${FLASK_API_URL}/extract`,
            {
              params: {
                url: params.articleUrl,
              },
              headers: {
                "X-API-Key": EXTRACTOR_API_KEY,
              },
            }
          );

          const extractedArticleText = articleExtractionResponse.data.text;

          // Step 2: Summarize the extracted text using OpenAI SDK
          const articleSummary = await summarizeText(extractedArticleText);

          return { data: { summary: articleSummary } };
        } catch (error: any) {
          return handleError(error);
        }
      },
    }),

    // Endpoint to summarize directly provided text with a title
    summarizeProvidedText: builder.query({
      queryFn: async (params: { text: string }) => {
        try {
          const { text } = params;

          // Generate title and summary for the provided text
          const { title, summary } = await generateTitleAndSummary(text);

          return { data: { title, summary } };
        } catch (error: any) {
          return handleError(error);
        }
      },
    }),
  }),
});

// Helper function to summarize text using OpenAI SDK
async function summarizeText(text: string): Promise<string> {
  const response = await openaiClient.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Summarize this text concisely with a minimum of 10 lines: ${text}`,
      },
    ],
    max_tokens: 1000,
    temperature: 1.0,
    top_p: 1.0,
    model: MODEL_NAME,
  });

  if (!response || !response.choices || response.choices.length === 0) {
    throw new Error("Failed to summarize the text.");
  }

  return response.choices[0].message.content || "";
}

// Helper function to generate both title and summary using OpenAI SDK
async function generateTitleAndSummary(
  text: string
): Promise<{ title: string; summary: string }> {
  const response = await openaiClient.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Given the following text, please provide:
1. A concise, descriptive title (no more than 10 words, avoid special formatting)
2. A comprehensive summary (minimum 10 lines)

Format your response exactly like this:
TITLE: Your title here
SUMMARY: Your summary here

Here's the text to analyze:
${text}`,
      },
    ],
    max_tokens: 1000,
    temperature: 0.7,
    top_p: 1.0,
    model: MODEL_NAME,
  });

  if (!response || !response.choices || response.choices.length === 0) {
    throw new Error("Failed to generate title and summary for the text.");
  }

  const content = response.choices[0].message.content || "";

  // Parse the response using regex
  const titleMatch = content.match(/TITLE:\s*(.*?)(?=\nSUMMARY:|$)/s);
  const summaryMatch = content.match(/SUMMARY:\s*(.*)/s);

  let title = titleMatch ? titleMatch[1].trim() : "Untitled Document";
  let summary = summaryMatch ? summaryMatch[1].trim() : content.trim();

  // Remove unwanted characters from title
  title = title.replace(/\*\*/g, "").replace(/["'*]/g, "").trim();

  return { title, summary };
}

// Helper function to handle errors
function handleError(error: any) {
  let errorMessage = "Failed to process the request.";
  if (error.response) {
    errorMessage =
      error.response.data.detail ||
      error.response.data.message ||
      error.response.data.error ||
      errorMessage;
  } else if (error.message) {
    errorMessage = error.message;
  }
  return {
    error: {
      status: error.response?.status || "CUSTOM_ERROR",
      error: errorMessage,
    },
  };
}

// Export hooks for both endpoints
export const {
  useLazyFetchAndSummarizeArticleQuery,
  useLazySummarizeProvidedTextQuery,
} = articleApi;
