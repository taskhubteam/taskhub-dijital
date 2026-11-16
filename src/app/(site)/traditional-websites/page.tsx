import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, pageMetadata, serviceLd, webPageLd } from "@/lib/seo";
import View from "@/views/TraditionalWebsitesPage";

const title = "Custom Business Websites for US Companies";
const description =
  "Premium traditional websites for modern businesses: business, sports and e-commerce sites built to US standards — responsive, fast and SEO-ready. View plans.";

export const metadata = pageMetadata({ title, description, path: "/traditional-websites" });

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/traditional-websites" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Traditional Websites", path: "/traditional-websites" },
          ]),
          serviceLd({
            name: "Traditional business websites",
            description,
            path: "/traditional-websites",
            serviceType: "Website design and development",
            offers: [
              { name: "Diamond (setup)", price: 2500 },
              { name: "Gold (setup)", price: 4500 },
              { name: "Platinum (setup)", price: 6500 },
              { name: "Enterprise (setup)", price: 9500 },
            ],
          }),
        ]}
      />
      <View />
    </>
  );
}
