import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconLink, IconArrowRight } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import classes from "./UrlInput.module.css";

interface SearchInputProps {
  onSubmit: (values: { url: string }) => void;
  isFetching: boolean;
}

const UrlInput: React.FC<SearchInputProps> = ({ onSubmit, isFetching }) => {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: { url: "" },
    validate: {
      url: (value) =>
        /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*(\?.*)?$/.test(
          value
        )
          ? null
          : "Invalid URL",
    },
    validateInputOnChange: true,
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        size="md"
        type="url"
        placeholder="eg. https://example.com"
        {...form.getInputProps("url")}
        leftSection={<IconLink size={20} stroke={1.5} />}
        rightSection={
          <ActionIcon
            className={classes.actionIcon}
            disabled={!form.values.url || !!form.errors.url || isFetching}
            type="submit"
            size={34}
            color={theme.primaryColor}
          >
            <IconArrowRight size={20} stroke={1.5} />
          </ActionIcon>
        }
      />
    </form>
  );
};

export default UrlInput;
