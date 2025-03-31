import { Card, Text, Title, Group } from "@mantine/core";
import { forwardRef } from "react";

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
        <Title order={4} my="sm" ta="center" fw={700}>
          {title}
        </Title>
        <Text>{summary}</Text>
      </Card>
    );
  }
);

export default SummaryCard;
