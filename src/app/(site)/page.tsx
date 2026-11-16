import FaqSection from "@/components/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { HOME_FAQS } from "@/content/faqs";
import { faqLd, pageMetadata, serviceLd, webPageLd } from "@/lib/seo";
import LandingPage from "@/views/LandingPage";

const title = "TaskHub Dijital — AI Websites & Agentic Systems";
const description =
  "TaskHub Dijital builds agentic AI systems, AI-ready websites, WordPress sites and managed hosting for US businesses. Website plans from $800. Book a free call.";

export const metadata = pageMetadata({ title, description, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/" }),
          serviceLd({
            name: "Website design & development",
            description:
              "Custom, responsive, SEO-ready business websites with domain and hosting included.",
            path: "/",
            serviceType: "Web design and development",
            offers: [
              { name: "Starter Plan (setup)", price: 800 },
              { name: "Gold Plan (setup)", price: 1500 },
              { name: "Diamond Plan (setup)", price: 2500 },
              { name: "Add-ons & revisions", price: 10, unit: "HOUR" },
            ],
          }),
          faqLd(HOME_FAQS),
        ]}
      />
      <LandingPage faq={<FaqSection faqs={HOME_FAQS} />} />
    </>
  );
}
