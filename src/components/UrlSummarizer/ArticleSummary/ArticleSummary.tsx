import React from "react";
import { Card, Group, Text } from "@mantine/core";

interface ArticleSummaryProps {
  summary: string;
}

export const ArticleSummary = React.forwardRef<
  HTMLDivElement,
  ArticleSummaryProps
>(({ summary }, ref) => {
  return (
    <Card mt="lg" p="md" withBorder ref={ref}>
      <Group justify="initial">
        <Text
          variant="gradient"
          gradient={{ from: "green", to: "yellow", deg: 90 }}
          size="xl"
          fw={700}
          mb="sm"
        >
          Summary:
        </Text>
      </Group>
      <Text size="md">{summary}</Text>
    </Card>
  );
});

ArticleSummary.displayName = "ArticleSummary"; // Optional: Helps with debugging in React DevTools
