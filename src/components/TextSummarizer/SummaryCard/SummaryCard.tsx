import { Card, Text, Title, Group } from "@mantine/core";
import { forwardRef } from "react";
import { Markdown } from "@/components/custom-components/Markdown";
interface SummaryCardProps {
  title: string;
  summary: string;
}

const SummaryCard = forwardRef<HTMLDivElement, SummaryCardProps>(
  ({ title, summary }, ref) => {
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
        <Title order={2} my="sm" ta="center" fw={700}>
          {title}
        </Title>{" "}
        <Markdown>{summary}</Markdown>
      </Card>
    );
  }
);

export default SummaryCard;
