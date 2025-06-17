import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import { Notifications } from "@mantine/notifications";
import Hero from "./components/Hero/Hero";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MainLayout />}>
            <Route path="/" element={<Hero />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
