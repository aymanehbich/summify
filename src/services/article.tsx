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
        content: `Please summarize the following article using markdown, **without** adding a "Summary" heading.

- Start with a single, clear sentence that captures the essence of the text.
- Follow with at least 10 bullet points highlighting the main ideas or key events.
- Include a "**Key Takeaways**" section with 3 actionable or important points.
- Optionally, add a "**Quote**" section with a relevant, impactful quote from the text.

Format example:

One concise sentence summarizing the article.

- Bullet point 1
- Bullet point 2
- ...
- Bullet point 10+

### Key Takeaways
1. Takeaway one
2. Takeaway two
3. Takeaway three

### Quote (Optional)
"A meaningful quote from the text."

---

Here is the article text:

"""
${text}
"""`,
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
        content: `Please summarize the following article using markdown, **without** adding a "Summary" heading.

- Start with a single, clear sentence that captures the essence of the text.
- Follow with at least 10 bullet points highlighting the main ideas or key events.
- Include a "**Key Takeaways**" section with 3 actionable or important points.
- Optionally, add a "**Quote**" section with a relevant, impactful quote from the text.

Format example:

**Title:** A short title for the article.

One concise sentence summarizing the article.

- Bullet point 1
- Bullet point 2
- ...
- Bullet point 10+

### Key Takeaways
1. Takeaway one
2. Takeaway two
3. Takeaway three

### Quote (Optional)
"A meaningful quote from the text."

---

Here is the article text:

"""
${text}
"""`,
      },
    ],
    max_tokens: 1000,
    temperature: 0.7,
    top_p: 1.0,
    model: MODEL_NAME,
  });

  if (!response || !response.choices || response.choices.length === 0) {
    throw new Error("Failed to generate structured summary.");
  }

  const content = response.choices[0].message.content || "";

  // Extract the title from the first "**Title:**" line (if present)
  const titleMatch = content.match(/^\*\*Title:\*\*\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled Document";

  // Remove the title line from content to get the summary
  const summary = content.replace(/^\*\*Title:\*\*\s*.+$/m, "").trim();

  return {
    title: title.replace(/["'*]/g, "").trim(),
    summary: summary.trim(),
  };
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
