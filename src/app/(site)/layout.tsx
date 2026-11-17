import Script from "next/script";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/context/ThemeContext";
import { ORGANIZATION_LD, WEBSITE_LD } from "@/lib/seo";
import { GA_HOSTS, GA_MEASUREMENT_ID } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <JsonLd data={[ORGANIZATION_LD, WEBSITE_LD]} />
      <CustomCursor />
      <Toaster
        position="top-right"
        toastOptions={{ duration: 4000, style: { borderRadius: "12px", fontFamily: "Inter, sans-serif" } }}
      />
      <WhatsAppButton />
      {children}
      {GA_MEASUREMENT_ID && (
        // Loaded after the page is idle so it never competes with first paint. Production host only.
        <Script id="ga" strategy="lazyOnload">
          {`if(${JSON.stringify(GA_HOSTS)}.indexOf(location.hostname)>-1){window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';document.head.appendChild(s);}`}
        </Script>
      )}
    </ThemeProvider>
  );
}
