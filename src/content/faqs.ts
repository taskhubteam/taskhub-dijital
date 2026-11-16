// FAQ answers are written for people *and* answer engines (Google AI Overviews, ChatGPT,
// Perplexity…): each answer is self-contained and uses only facts shown elsewhere on the site.
// Keep them in sync with the pricing on the home page.

export type Faq = { q: string; a: string };

export const HOME_FAQS: Faq[] = [
  {
    q: "What does TaskHub Dijital do?",
    a: "TaskHub Dijital is a web and AI agency based in Dallas, Texas. We conceive, build and deploy agentic AI systems, AI-ready websites, custom web applications, WordPress sites and managed hosting, plus UI/UX design, SEO and digital marketing for small and growing businesses.",
  },
  {
    q: "How much does a website cost with TaskHub Dijital?",
    a: "Website plans start with the Starter Plan at $800 setup plus $49.99/month for domain and hosting (up to 5 pages). The Gold Plan is $1,500 setup plus $69.99/month (up to 15 pages) and the Diamond Plan is $2,500 setup plus $69.99/month (up to 20 pages). Every plan includes a custom, responsive, SEO-ready design.",
  },
  {
    q: "Do you offer managed website hosting?",
    a: "Yes. Managed hosting plans include Starter Hosting at $49.99/month (10 GB SSD, free SSL, daily backups), Business Hosting at $69.99/month (50 GB SSD, unlimited bandwidth, hourly backups, CDN) and Enterprise Hosting at $99.99 with dedicated resources and real-time backups.",
  },
  {
    q: "What is an agentic AI system?",
    a: "An agentic AI system is software built around AI agents that can plan and carry out multi-step tasks — such as answering customers, qualifying leads or automating back-office workflows — instead of only replying to single prompts. TaskHub Dijital designs, builds and deploys these systems and connects them to your website and tools.",
  },
  {
    q: "Do you build WordPress websites?",
    a: "Yes. Our WordPress service includes a custom design that matches your brand, a mobile-responsive and SEO-friendly build, fast loading speed, and reliable hosting with a free domain for the first year.",
  },
  {
    q: "Can I request changes after my website launches?",
    a: "Yes. Add-ons and revisions are billed at $10 per hour with no minimum commitment, so you only pay for the updates you need.",
  },
  {
    q: "Where is TaskHub Dijital located and who do you work with?",
    a: "TaskHub Dijital is a US company (PO Box 494995, Dallas, TX 75044) that works with startups, small businesses and growing companies across the United States.",
  },
  {
    q: "How do I get started?",
    a: "Book a free call from the Get Started button, send a message through the contact page, email taskhubdijital@gmail.com or call 469-577-0392. We will discuss your goals and recommend the right plan.",
  },
];
