import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, pageMetadata, webPageLd } from "@/lib/seo";
import View from "@/views/ContactUsPage";

const title = "Contact Us — Get a Free Project Quote";
const description =
  "Contact TaskHub Dijital in Dallas, TX: call 469-577-0392, email taskhubdijital@gmail.com or send a message to get a free quote for your website or AI project.";

export const metadata = pageMetadata({ title, description, path: "/contact" });

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/contact", type: "ContactPage" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <View />
    </>
  );
}
