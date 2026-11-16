import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, pageMetadata, webPageLd } from "@/lib/seo";
import View from "@/views/ProductsPage";

const title = "WordPress, Shopify & MERN Development";
const description =
  "Premium digital products and services: WordPress and Shopify development, MERN stack web apps and mobile apps — AI-ready, fast and built for the US market.";

export const metadata = pageMetadata({ title, description, path: "/products" });

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/products" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
        ]}
      />
      <View />
    </>
  );
}
