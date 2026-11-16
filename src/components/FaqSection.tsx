import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/faqs";

/**
 * FAQ in the site's existing section style. Uses native <details> so every answer is in the
 * server-rendered HTML (crawlable, no JS needed) and matches the FAQPage JSON-LD.
 */
export default function FaqSection({ faqs, title = "Frequently Asked Questions" }: { faqs: Faq[]; title?: string }) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="faq-title" className="section-title mb-4">
            {title}
          </h2>
          <p className="section-subtitle">Quick answers about our services, pricing and process</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-gray-900 dark:text-white [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg">{faq.q}</h3>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
