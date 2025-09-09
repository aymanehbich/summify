import { Title, Text, Container } from "@mantine/core";
import classes from "./HeroTitle.module.css";

interface HeroTitleProps {
  title: string;
  highlight: string;
  // me?: string; // New subtitle prop
  description: string;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  title,
  highlight,
  // me,
  description,
}) => {
  return (
    <>
      <Title className={classes.title}>
        {title}{" "}
        <Text
          variant="gradient"
          gradient={{ from: "green", to: "yellow", deg: 90 }}
          component="span"
          className={classes.highlight}
          inherit
        >
          {highlight}
        </Text>
        {/* <Text component="span" size="sm" c="dimmed">
          by {me}
        </Text> */}
      </Title>

      <Container p={0} size={600}>
        <Text size="lg" c="dimmed" className={classes.description}>
          {description}
        </Text>
      </Container>
    </>
  );
};
