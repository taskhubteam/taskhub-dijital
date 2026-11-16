import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, pageMetadata, webPageLd } from "@/lib/seo";
import View from "@/views/CareersPage";

const title = "Careers — Join Our Team";
const description =
  "Join the TaskHub Dijital team. See open positions, benefits and what it is like to build AI-powered websites and agentic systems with us.";

export const metadata = pageMetadata({ title, description, path: "/careers" });

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/careers" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
          ]),
        ]}
      />
      <View />
    </>
  );
}
