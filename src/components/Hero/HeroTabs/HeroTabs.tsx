// import { UrlSummarizer } from "@/components/UrlSummarizer/UrlSummarizer";
import { Center, Loader, Tabs, Text } from "@mantine/core";
import { IconLink, IconTextScan2 } from "@tabler/icons-react";
import React, { Suspense } from "react";

export const HeroTabs: React.FC = () => {
  const TextSummarizer = React.lazy(
    () => import("@/components/TextSummarizer/TextSummarizer")
  );
  const UrlSummarizer = React.lazy(
    () => import("@/components/UrlSummarizer/UrlSummarizer")
  );
  return (
    <Tabs
      variant="default"
      radius="sm"
      defaultValue="search"
      keepMounted={false}
      styles={
        {
          // tab: { backgroundColor: "--tab-bg: var(--mantine-color-body)" },
        }
      }
    >
      <Tabs.List mb="lg" grow>
        <Tabs.Tab value="search" leftSection={<IconLink size={17} />}>
          Add URL
        </Tabs.Tab>
        <Tabs.Tab value="text" leftSection={<IconTextScan2 size={17} />}>
          Paste Text
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="search">
        <Text size="md" c="dimmed" mb="xs">
          Enter an article URL to receive a concise summary of the most
          important points.
        </Text>
        <Suspense
          fallback={
            <Center>
              <Loader type="dots" />
            </Center>
          }
        >
          <UrlSummarizer />
        </Suspense>
      </Tabs.Panel>

      <Tabs.Panel value="text">
        <Text size="md" c="dimmed" mb="xs">
          Paste or type text to generate a summary.
        </Text>
        <Suspense
          fallback={
            <Center>
              <Loader type="dots" />
            </Center>
          }
        >
          <TextSummarizer />
        </Suspense>
      </Tabs.Panel>
    </Tabs>
  );
};
