import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, pageMetadata, webPageLd } from "@/lib/seo";
import { ADDRESS, EMAIL, LEGAL_NAME, PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/site";

const UPDATED = "2026-11-16";
const title = "Terms of Service";
const description =
  "The terms that apply when you use taskhubdijital.com or hire TaskHub Dijital for website design, development, AI, SEO and managed hosting services.";

export const metadata = pageMetadata({ title, description, path: "/terms-of-service" });

export default function TermsPage() {
  const address = `${ADDRESS.streetAddress}, ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion} ${ADDRESS.postalCode}`;
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/terms-of-service" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: title, path: "/terms-of-service" },
          ]),
        ]}
      />
      <LegalPage
        eyebrow="Legal"
        title={title}
        updated={UPDATED}
        intro={
          <p>
            Please read these terms carefully. By using our website or our services, you agree to them. If you
            do not agree, please do not use the website or services.
          </p>
        }
      >
        <h2>1. About these terms</h2>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) are an agreement between you and {LEGAL_NAME}, doing
          business as {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;), {address}. They cover
          your use of <Link href="/">{SITE_URL.replace(/^https?:\/\//, "")}</Link> and the services we provide,
          including website design and development, AI systems, SEO, digital marketing and managed hosting
          (the &ldquo;Services&rdquo;).
        </p>
        <p>
          If you sign a proposal, quote or contract with us, that document applies together with these Terms.
          If they conflict, the signed document takes priority.
        </p>

        <h2>2. Using our website</h2>
        <ul>
          <li>You may browse and use the website for lawful purposes only.</li>
          <li>
            You must not attempt to disrupt, hack or overload the website, scrape it in a way that harms its
            performance, or submit spam or harmful content through our forms.
          </li>
          <li>
            Content on this website, including text, graphics and our logo, belongs to us or our licensors and may
            not be copied for commercial use without permission.
          </li>
          <li>
            Articles on our <Link href="/blog">blog</Link> are general information, not professional, legal or
            financial advice.
          </li>
        </ul>

        <h2>3. Quotes and pricing</h2>
        <p>
          Prices shown on our website are starting prices and may change without notice. Your final price,
          scope and timeline are set out in the written quote or proposal we send you. Work outside the agreed
          scope, including add-ons and revisions, is billed separately, for example at our published hourly rate.
        </p>

        <h2>4. Payments</h2>
        <ul>
          <li>Setup fees are due as stated in your quote, which may include a deposit before work begins.</li>
          <li>Monthly plans, such as hosting and website management, are billed in advance each month.</li>
          <li>
            If a payment is late, we may pause work or suspend hosting services after giving you notice, until
            the balance is paid.
          </li>
          <li>Fees do not include taxes unless stated, and payment processor fees may apply.</li>
        </ul>

        <h2>5. Your responsibilities as a client</h2>
        <ul>
          <li>Provide accurate information, content, images and feedback on time.</li>
          <li>
            Make sure you have the rights to any content, logos, images or materials you give us, and that they do
            not infringe anyone else&apos;s rights.
          </li>
          <li>Review and approve work within a reasonable time so the project can move forward.</li>
          <li>Keep your account passwords secure and tell us about any unauthorized access.</li>
        </ul>
        <p>Delays in content or feedback may change the project timeline.</p>

        <h2>6. Ownership of the work</h2>
        <p>
          Once you have paid in full, you own the final website design and content created specifically for
          you, unless your quote says otherwise. Your domain name should be registered in your name. We keep
          ownership of our own tools, code libraries, templates and know-how, and you receive the right to use
          any of them included in your project. Third-party software, themes, plugins and fonts remain subject
          to their own licenses.
        </p>
        <p>
          Unless you ask us not to, we may show the finished project, such as screenshots and a link, in our{" "}
          <Link href="/portfolio">portfolio</Link> and marketing.
        </p>

        <h2>7. Hosting and maintenance</h2>
        <ul>
          <li>
            We work to keep hosted websites fast, secure and available. Uptime figures we mention are targets,
            not guarantees, and short interruptions for maintenance, updates or events outside our control may
            occur.
          </li>
          <li>
            We take regular backups, but you should keep your own copies of important content and data.
          </li>
          <li>
            You must not use our hosting for illegal content, spam, malware, or anything that harms our systems or
            other customers. We may suspend services that break this rule.
          </li>
          <li>
            You may cancel a monthly plan with notice as described in your quote. On cancellation, we will help
            you move your website and domain to another provider.
          </li>
        </ul>

        <h2>8. Third-party services</h2>
        <p>
          Our Services may rely on third-party providers, such as hosting, domain registrars, payment processors,
          email services, AI providers and plugins. Their terms and pricing apply to their services, and we are
          not responsible for their outages, changes or policies.
        </p>

        <h2>9. AI features</h2>
        <p>
          AI systems, chatbots and automations can make mistakes. You are responsible for reviewing important
          outputs and for deciding which actions an AI system may take without human approval. We recommend
          keeping a person in charge of payments, legal matters and other sensitive decisions.
        </p>

        <h2>10. SEO and results</h2>
        <p>
          We build websites with SEO best practices, but no one can guarantee specific search rankings, traffic,
          leads or sales, because search engines and AI assistants control their own results.
        </p>

        <h2>11. Disclaimers</h2>
        <p>
          The website and Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the extent
          allowed by law, we disclaim all warranties not expressly stated in your quote or contract, including
          implied warranties of merchantability, fitness for a particular purpose and non-infringement.
        </p>

        <h2>12. Limitation of liability</h2>
        <p>
          To the extent allowed by law, we are not liable for indirect, incidental, special or consequential
          damages, or for lost profits, revenue or data. Our total liability for any claim related to the
          Services is limited to the amount you paid us for the specific Service in the three months before the
          claim.
        </p>

        <h2>13. Indemnity</h2>
        <p>
          You agree to defend and compensate us against claims arising from content or materials you provide,
          or from your breach of these Terms or of the law.
        </p>

        <h2>14. Ending services</h2>
        <p>
          Either party may end a project or plan as described in the quote or contract. We may suspend or end
          Services if you seriously breach these Terms or do not pay. Sections that by their nature should
          continue, such as payment, ownership, disclaimers and limitation of liability, survive termination.
        </p>

        <h2>15. Governing law</h2>
        <p>
          These Terms are governed by the laws of the State of Texas, United States, without regard to its
          conflict-of-law rules. Any dispute will be handled in the state or federal courts located in Dallas
          County, Texas, unless we agree otherwise in writing.
        </p>

        <h2>16. Changes to these terms</h2>
        <p>
          We may update these Terms from time to time. When we do, we will change the &ldquo;Last updated&rdquo;
          date at the top of this page. Continuing to use the website or Services after a change means you
          accept the updated Terms.
        </p>

        <h2>17. Contact us</h2>
        <p>
          Questions about these Terms? Contact {SITE_NAME}, {address} · Email:{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · Phone: {PHONE_DISPLAY}. See also our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </LegalPage>
    </>
  );
}
