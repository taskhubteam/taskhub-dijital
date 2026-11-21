import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, pageMetadata, webPageLd } from "@/lib/seo";
import { ADDRESS, EMAIL, LEGAL_NAME, PHONE_DISPLAY, SITE_NAME, SITE_URL, WHATSAPP_DISPLAY } from "@/lib/site";

const UPDATED = "2026-11-21";
const title = "Privacy Policy";
const description =
  "How TaskHub Dijital collects, uses and protects personal information when you visit taskhubdijital.com, contact us or use our web and hosting services.";

export const metadata = pageMetadata({ title, description, path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  const address = `${ADDRESS.streetAddress}, ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion} ${ADDRESS.postalCode}`;
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ name: title, description, path: "/privacy-policy" }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: title, path: "/privacy-policy" },
          ]),
        ]}
      />
      <LegalPage
        eyebrow="Legal"
        title={title}
        updated={UPDATED}
        intro={
          <p>
            Your privacy matters to us. This policy explains what information {SITE_NAME} collects, why we
            collect it, how we use it and the choices you have.
          </p>
        }
      >
        <h2>1. Who we are</h2>
        <p>
          {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) is a web development, AI and
          managed hosting service operated by {LEGAL_NAME}, {address}, United States. This policy applies to{" "}
          <Link href="/">{SITE_URL.replace(/^https?:\/\//, "")}</Link> and to the services we provide to
          clients.
        </p>

        <h2>2. Information we collect</h2>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Contact and quote requests:</strong> your name, email address, phone number, city, state,
            company and the details of your project or message.
          </li>
          <li>
            <strong>Job applications:</strong> the information and résumé you choose to email us.
          </li>
          <li>
            <strong>Client projects:</strong> business details, website content, account access and billing
            information needed to deliver the services you order.
          </li>
          <li>
            <strong>Messages:</strong> anything you send us by email, phone or WhatsApp.
          </li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Technical data:</strong> like most websites, our hosting and security provider processes your
            IP address, browser type, device type, pages requested and the date and time of each request to
            deliver pages, keep the site secure and block abuse.
          </li>
          <li>
            <strong>Preferences:</strong> if you switch between light and dark mode, your choice is saved in your
            own browser (local storage). It is not sent to us.
          </li>
          <li>
            <strong>Analytics:</strong> we use Google Analytics to understand, in aggregate, how visitors use the
            site, for example which pages are viewed. It uses cookies or similar technology.
          </li>
        </ul>

        <h2>3. How we use your information</h2>
        <ul>
          <li>To reply to your questions and send quotes you ask for.</li>
          <li>To provide, host, maintain and support the websites and services you order.</li>
          <li>To send invoices and manage payments.</li>
          <li>To review job applications.</li>
          <li>To keep our website and services secure and prevent spam or abuse.</li>
          <li>To improve our website, content and services.</li>
          <li>To meet legal, tax and accounting obligations.</li>
        </ul>
        <p>We do not sell your personal information, and we do not use it for third-party advertising.</p>

        <h2>4. Service providers we use</h2>
        <p>
          We share information only with trusted providers that help us run our website and business, and only
          as needed for that purpose:
        </p>
        <ul>
          <li>
            <strong>Cloudflare</strong> hosts our website and database and provides security and content
            delivery.
          </li>
          <li>
            <strong>Brevo</strong> delivers the email notifications for messages sent through the form on our{" "}
            <Link href="/contact">contact page</Link>.
          </li>
          <li>
            <strong>GoHighLevel (LeadConnector)</strong> is our customer relationship system. Details you submit
            through our contact form are saved there so our team can follow up with you.
          </li>
          <li>
            <strong>WhatsApp</strong> (Meta) handles conversations if you contact us through the WhatsApp button
            ({WHATSAPP_DISPLAY}).
          </li>
          <li>
            <strong>Google</strong> provides website analytics and search performance data.
          </li>
          <li>
            <strong>jsDelivr</strong> serves some technology logos shown on our home page.
          </li>
        </ul>
        <p>
          Each provider processes data under its own privacy policy. We may also disclose information if
          required by law, to protect our rights or safety, or as part of a business transfer.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Our public website does not use advertising cookies. Cookies or similar technology may be set by
          Google Analytics and by our security provider to protect the site. A cookie is also used to keep our staff signed in to our private admin area. You can
          block or delete cookies in your browser settings, although some features may then not work.
        </p>

        <h2>6. How long we keep information</h2>
        <p>
          We keep contact messages and quote requests for as long as needed to respond and follow up, and client
          records for as long as you are a client plus any period required for legal, tax or accounting
          reasons. We delete or anonymize information when it is no longer needed.
        </p>

        <h2>7. How we protect information</h2>
        <p>
          We use HTTPS encryption, access controls, secure hosting and regular updates to protect your
          information. No method of transmission or storage is completely secure, but we work to protect your
          data and to limit access to people who need it.
        </p>

        <h2>8. Your choices and rights</h2>
        <p>
          You may ask us to access, correct or delete the personal information we hold about you, or to stop
          contacting you. Depending on where you live, including some U.S. states, you may have additional
          privacy rights under local law. To make a request, email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          We may need to verify your identity before acting on a request, and we will not treat you differently
          for exercising your rights.
        </p>

        <h2>9. Children&apos;s privacy</h2>
        <p>
          Our website and services are intended for businesses and adults. We do not knowingly collect personal
          information from children under 13. If you believe a child has sent us personal information, please
          contact us and we will delete it.
        </p>

        <h2>10. Links to other websites</h2>
        <p>
          Our site links to other websites, including client sites in our <Link href="/portfolio">portfolio</Link>{" "}
          and our social media pages. We are not responsible for the privacy practices of those websites.
        </p>

        <h2>11. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. When we do, we will change the &ldquo;Last updated&rdquo;
          date at the top of this page. Please review it periodically.
        </p>

        <h2>12. Contact us</h2>
        <p>
          Questions about this policy or your information? Contact {SITE_NAME}, {address} · Email:{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · Phone: {PHONE_DISPLAY}. You can also read our{" "}
          <Link href="/terms-of-service">Terms of Service</Link>.
        </p>
      </LegalPage>
    </>
  );
}
