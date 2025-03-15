// src/components/custom-components/AccordionControl.tsx

import React from "react";
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Center,
  CopyButton,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconTrash } from "@tabler/icons-react";
import classes from "./AccordionControl.module.css";

// Define the props for AccordionControl, extending AccordionControlProps
interface AccordionControlPropsWithUrl extends AccordionControlProps {
  url: string;
  onDelete: () => void; // Add onDelete prop
}

// AccordionControl component
const AccordionControl: React.FC<AccordionControlPropsWithUrl> = ({
  url,
  onDelete,
  ...props
}) => {
  return (
    <Center>
      <Accordion.Control className={classes.accordionControl} {...props} />
      <Center pr="sm" className={classes.center}>
        {/* <Group> */}
        {/* <Center inline> */}
        <CopyButton value={url} timeout={1000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
            >
              <ActionIcon
                color={copied ? "teal" : "gray"}
                variant="subtle"
                onClick={copy}
              >
                {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
        <Tooltip label="Delete" withArrow position="right">
          <ActionIcon
            // pr="sm"
            variant="subtle"
            color="red"
            aria-label="Remove article"
            onClick={onDelete} // Trigger onDelete function
          >
            <IconTrash size={14} />
          </ActionIcon>
        </Tooltip>
        {/* </Center> */}
        {/* </Group> */}
      </Center>
    </Center>
  );
};

export default AccordionControl;
