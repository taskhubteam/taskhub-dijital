import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import NotFoundPage from "@/views/NotFoundPage";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <ThemeProvider>
      <NotFoundPage />
    </ThemeProvider>
  );
}
