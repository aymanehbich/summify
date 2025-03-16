import { Textarea, Button, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";

interface SummaryFormProps {
  onSubmit: (values: { text: string }) => Promise<void>;
  isFetching: boolean;
  form: UseFormReturnType<{ text: string }>; // Accept the form object as a prop
}

const SummaryForm = ({ onSubmit, isFetching, form }: SummaryFormProps) => {
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Textarea
        size="md"
        autosize
        placeholder="Paste or type text here... Press Enter to summarize"
        minRows={5}
        maxRows={14}
        key={form.key("text")}
        {...form.getInputProps("text")}
        mb="sm"
      />
      <Group justify="end">
        <Button
          type="submit"
          leftSection={<IconArrowRight size={20} stroke={1.5} />}
          disabled={!form.getValues().text || !!form.errors.text || isFetching}
        >
          Summarize
        </Button>
      </Group>
    </form>
  );
};

export default SummaryForm;
