import { Container } from "@mantine/core";
import classes from "./Hero.module.css";
import { HeroTitle } from "./HeroTitle/HeroTitle";
import { HeroTabs } from "./HeroTabs/HeroTabs";

const Hero = () => {
  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <HeroTitle
          title="Summarize Articles with"
          highlight="Summify"
          me="hbich aymane"
          description="Summify quickly summarizes articles, extracting key points to save you time and boost productivity."
        />

        <Container mt="lg" p={0} size={700}>
          <HeroTabs />
        </Container>
      </div>
    </Container>
  );
};
export default Hero;
