import Script from "next/script";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/CustomCursor";
import FreeAICallToAction from "@/components/FreeAICallToAction";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/context/ThemeContext";
import { ORGANIZATION_LD, WEBSITE_LD } from "@/lib/seo";
import { GA_MEASUREMENT_ID } from "@/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <JsonLd data={[ORGANIZATION_LD, WEBSITE_LD]} />
      <CustomCursor />
      <Toaster
        position="top-right"
        toastOptions={{ duration: 4000, style: { borderRadius: "12px", fontFamily: "Inter, sans-serif" } }}
      />
      <FreeAICallToAction />
      {children}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}
    </ThemeProvider>
  );
}
