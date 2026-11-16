import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, pageMetadata, serviceLd, webPageLd } from "@/lib/seo";
import View from "@/views/AIReadinessPage";

const title = "AI-Ready Websites & MERN Stack Development";
const description =
  "AI-ready websites and custom MERN stack web apps with AI integration, scalable architecture and security. Small MERN sites from $2.5k; hourly from $60.";

export const metadata = pageMetadata({ title, description, path: "/ai-readiness" });

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/ai-readiness" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "AI Websites", path: "/ai-readiness" },
          ]),
          serviceLd({
            name: "AI-ready MERN stack development",
            description,
            path: "/ai-readiness",
            serviceType: "Custom web application development",
            offers: [
              { name: "Small MERN Website (from)", price: 2500 },
              { name: "Business Application (from)", price: 10000 },
              { name: "Full SaaS / Advanced Platform (from)", price: 60000 },
              { name: "Hourly development rate (from)", price: 60, unit: "HOUR" },
            ],
          }),
        ]}
      />
      <View />
    </>
  );
}
