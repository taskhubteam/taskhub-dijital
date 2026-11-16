import { FileText } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/** Shared layout for the privacy policy and terms of service. */
export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          <header className="text-center mb-12">
            <Eyebrow icon={FileText}>{eyebrow}</Eyebrow>
            <h1 className="hero-rise text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Last updated: <time dateTime={updated}>{new Date(`${updated}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
            </p>
            <div className="mt-6 text-lg text-gray-600 dark:text-gray-400">{intro}</div>
          </header>
          <div className="post-content">{children}</div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
