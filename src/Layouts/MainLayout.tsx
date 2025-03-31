import React, { Suspense, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  ActionIcon,
  AppShell,
  Group,
  Loader,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { CustomLogo } from "@/components/Logo/CustomLogo";
import classes from "./MainLayout.module.css";
import { GithubIcon2 } from "@/components/Icons/GithubIcon2";
import { IconMoon, IconSun } from "@tabler/icons-react";
const MainLayout: React.FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = useCallback(() => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  }, [computedColorScheme, setColorScheme]);
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="md" justify="space-between">
          <UnstyledButton component={Link} to={"/"}>
            <CustomLogo type="full" size={44} />
          </UnstyledButton>
          <Group gap="sm">
            <ActionIcon
              variant="default"
              size={35}
              radius="md"
              aria-label="Visite Github"
              component={Link}
              to="https://github.com/aymanehbich/Summify"
              target="_blank"
            >
              <GithubIcon2 size={22} />
            </ActionIcon>
            <ActionIcon
              onClick={toggleColorScheme}
              variant="default"
              size={35}
              radius="md"
              aria-label="Toggle color scheme"
            >
              <IconSun className={classes.light} size={22} stroke={1.5} />
              <IconMoon className={classes.dark} size={22} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main className={classes.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
