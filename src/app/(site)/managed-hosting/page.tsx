import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, pageMetadata, serviceLd, webPageLd } from "@/lib/seo";
import View from "@/views/ManagedHostingServicesPage";

const title = "Managed Website Hosting Services";
const description =
  "Managed website hosting with free domain setup, SSL, daily backups and 24/7 support on secure, scalable infrastructure. Setup packages from $49.99.";

export const metadata = pageMetadata({ title, description, path: "/managed-hosting" });

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/managed-hosting" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Managed Hosting Services", path: "/managed-hosting" },
          ]),
          serviceLd({
            name: "Managed website hosting",
            description,
            path: "/managed-hosting",
            serviceType: "Managed web hosting",
            offers: [
              { name: "Starter Setup", price: 49.99 },
              { name: "Growth Plus", price: 69.99 },
            ],
          }),
        ]}
      />
      <View />
    </>
  );
}
