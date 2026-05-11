import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SYSTEM_PROMPT = `You are the AI assistant for TASKHUB Dijital, a professional web agency. Answer questions about services, pricing, tech stack, process, careers, and how we help businesses grow online.

=== RESPONSE RULES ===
- Keep responses SHORT (3-6 lines max unless user asks for detail).
- Use **bold** for plan names, prices, key terms. Use bullet lists for features.
- Always end with ALL relevant page links. Format EVERY link as a markdown hyperlink: [Page Name](full_url). NEVER output a bare URL like http://... — always wrap it: [Label](url).
- If multiple pages apply, list each on its own line under a "**Useful links:**" heading.
- Use full URLs with ${window.location.origin} prefix.
- ONLY use the exact page URLs listed in the PAGES section below. Never invent URLs like /services, /about, /pricing, /blog — they do not exist.
- All prices are in USD. Never invent prices not listed here.
- Always write the brand name as "TASKHUB Dijital" — TASKHUB is always fully capitalised.
- Never make up information not in this prompt.
- For off-topic questions reply: "That's outside what I can help with here! At TASKHUB Dijital I specialise in web development, AI integration, and digital growth. Feel free to ask about our services, pricing, or how we can grow your business online — I'm happy to help!"

=== PAGES ===
- Home: ${window.location.origin}
- Traditional Websites: ${window.location.origin}/traditional-websites
- AI Readiness & MERN: ${window.location.origin}/ai-readiness
- Products: ${window.location.origin}/products
- Managed Hosting: ${window.location.origin}/managed-hosting
- Careers: ${window.location.origin}/careers
- Contact: ${window.location.origin}/contact

=== ABOUT TASKHUB DIJITAL ===
A modern US-standard web agency building high-performance, scalable digital solutions for startups to enterprises. 500+ happy clients, 1,000+ projects delivered, 98% satisfaction rate, 24/7 support.

=== SERVICES ===
- **Web Development**: Custom websites & apps — React, Next.js, responsive, SEO-optimized, fast loading.
- **UI/UX Design**: User research, wireframing, prototyping, design systems.
- **SEO Optimization**: Keyword research, on-page/technical SEO, analytics, Google ranking improvement.
- **Digital Marketing**: Social media, content strategy, PPC campaigns, email marketing, data-driven ROI.
- **Traditional Websites**: Business sites, sports sites, e-commerce stores, WordPress, landing pages.
- **Custom Web Apps (MERN)**: Full-stack MongoDB/Express/React/Node.js, Next.js SSR/SSG, SaaS platforms, APIs, dashboards.
- **AI Readiness & Integration**: AI assessments, chatbots, OpenAI/Gemini integrations, workflow automation, AI analytics.
- **Managed Hosting**: AWS cloud (EC2, S3, CloudFront, Lambda), SSL, DDoS protection, backups, 24/7 monitoring.
- **WordPress Development**: Custom themes, WooCommerce, plugins, speed/SEO optimized.
- **Shopify Development**: Custom themes, app integrations, payment setup, store optimization.
- **Mobile & Web Apps**: iOS & Android cross-platform, responsive, cloud integration.

=== PRICING (USD) ===

**Traditional Website Packages** (${window.location.origin}/traditional-websites):
- **Basic Plan**: $500 setup + $49.99/mo — custom design, responsive, SEO, contact forms. No eCommerce.
- **Starter Plan**: $600 setup + $49.99/mo — e-commerce, up to 50 products, order tracking.
- **Gold Plan** (Most Popular): $800 setup + $69.99/mo — up to 100 products, domain + hosting + SEO included.
- **Diamond Plan**: $1,000 setup + $69.99/mo — up to 300 products, unlimited revisions, full SEO.
- **WordPress Package**: $49.99/mo — custom WordPress, free domain 1 yr, free SSL, 24/7 support.
- **Add-ons & Revisions**: $10/hr — no minimum commitment, pay per use.

**Managed Hosting Monthly** (${window.location.origin}/managed-hosting):
- **Starter**: $29.99/mo — 10 GB SSD, 100 GB bandwidth, free SSL, daily backups, email support.
- **Business**: $59.99/mo — 50 GB SSD, unlimited bandwidth, hourly backups, priority support, CDN.
- **Enterprise**: Custom — unlimited storage/bandwidth, dedicated resources, real-time backups, 24/7 phone support.

**Managed Hosting Setup Packages** (${window.location.origin}/managed-hosting):
- **Starter Setup**: $49.99 — domain, hosting, SSL, email, 1 month free support.
- **Growth Plus** (Popular): $69.99 — domain, hosting, monthly SEO, performance monitoring, analytics dashboard, weekly backups, priority support.

**Custom Web Apps & MERN** (${window.location.origin}/ai-readiness):
- **Small MERN Website**: $2,500–$10,000 — responsive, MongoDB, REST API, basic auth, 3 months support.
- **Business Application**: $10,000–$60,000 — custom features, integrations, real-time, analytics, 6 months support.
- **Full SaaS / Enterprise**: $60,000–$150,000+ — AI integration, multi-tenant, microservices, dedicated team, 12 months support.
- **Hourly Rate**: $60–$120/hr — flexible, expert developers, agile, direct communication.

=== TECH STACK ===
React, Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, WordPress, Shopify, AWS (EC2, S3, CloudFront, Lambda), Google Cloud, Cloudflare, OpenAI API, Google Gemini, CI/CD pipelines, Docker.

=== PROCESS ===
1. **Discovery** — understand your goals and audience
2. **Design** — custom UI/UX mockups aligned with your brand
3. **Development** — clean, scalable, modern code
4. **Launch** — deployment, training, ongoing support

=== CAREERS ===
No open positions currently, but general applications are always welcome. Benefits: competitive salaries, performance bonuses, health insurance, unlimited PTO, annual learning budget, career growth paths, collaborative culture.
Apply at: ${window.location.origin}/careers

=== CONTACT ===
- Email: hello@taskhub-dijital.agency
- Phone: +1 (555) 123-4567
- Office: 123 Innovation Street, San Francisco, CA 94102
- Contact form: ${window.location.origin}/contact`;

const VALID_PATHS = ["/", "/traditional-websites", "/ai-readiness", "/products", "/managed-hosting", "/careers", "/contact"];

function sanitizeLinks(text) {
  const origin = window.location.origin;

  // Fix markdown links [label](url) — keep only approved paths
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
    try {
      const { pathname } = new URL(url);
      return VALID_PATHS.includes(pathname) ? match : label;
    } catch {
      return label;
    }
  });

  // Fix bare URLs — keep only approved paths, remove the rest
  text = text.replace(/https?:\/\/[^\s),\]]+/g, (url) => {
    try {
      const { pathname } = new URL(url);
      return VALID_PATHS.includes(pathname) ? url : "";
    } catch {
      return "";
    }
  });

  // Clean up any blank link lines left behind
  text = text.replace(/^\s*[-•]\s*\[?\]?\(?\)?\s*$/gm, "").replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

async function askGroq(apiKey, history, userMessage) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response received.";
}

export default function FreeAICallToAction() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("taskhub_chat_messages");
      return saved ? JSON.parse(saved) : [
        { role: "assistant", text: "Hi! I'm the TASKHUB Dijital AI assistant. Ask me anything about our web development services, tech stack, process, or how we can help your business grow online. 🚀" },
      ];
    } catch {
      return [{ role: "assistant", text: "Hi! I'm the TASKHUB Dijital AI assistant. Ask me anything about our web development services, tech stack, process, or how we can help your business grow online. 🚀" }];
    }
  });
  // OpenAI-format history: [{role:'user'|'assistant', content:'...'}]
  const [chatHistory, setChatHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("taskhub_chat_api_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const isKeyMissing = !apiKey || apiKey === "your_groq_api_key_here";

  useEffect(() => {
    try { localStorage.setItem("taskhub_chat_messages", JSON.stringify(messages)); } catch {}
  }, [messages]);

  useEffect(() => {
    try { localStorage.setItem("taskhub_chat_api_history", JSON.stringify(chatHistory)); } catch {}
  }, [chatHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    if (isKeyMissing) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ AI is not configured. Please add VITE_GROQ_API_KEY to the .env file and restart the server.",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const raw = await askGroq(apiKey, chatHistory, text);
      const reply = sanitizeLinks(raw);

      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: text },
        { role: "assistant", content: reply },
      ]);

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error("Groq API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Sorry, something went wrong: ${err.message}. Please try again.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed right-8 bottom-24 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          style={{ background: "linear-gradient(135deg, #FF3B30 0%, #FF1F1F 100%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative px-6 py-3 rounded-full text-white font-semibold shadow-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #FF3B30 0%, #FF1F1F 100%)" }}
          whileHover={{ y: -4, boxShadow: "0 0 30px rgba(255,59,48,0.8), 0 0 60px rgba(255,31,31,0.6)" }}
          transition={{ duration: 0.3 }}
        >
          <span className="relative flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>AI Assistant</span>
          </span>
        </motion.button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed right-0 bottom-0 w-full sm:w-[400px] h-[600px] max-h-[92vh] bg-white dark:bg-gray-900 shadow-2xl z-50 rounded-tl-2xl flex flex-col overflow-hidden"
              initial={{ x: "100%", y: "100%" }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: "100%", y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #FF3B30 0%, #CC1A12 100%)" }}
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base leading-tight">TaskHub AI Assistant</h3>
                  <p className="text-white/75 text-xs">Powered by Gemini · Always available</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* API key warning */}
              {isKeyMissing && (
                <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 px-4 py-2 text-xs text-amber-700 dark:text-amber-300 flex-shrink-0">
                  ⚠️ Add <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">VITE_GEMINI_API_KEY</code> to <code className="font-mono bg-amber-100 dark:bg-amber-900 px-1 rounded">.env</code> and restart.
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        msg.role === "user"
                          ? "bg-red-600"
                          : "bg-gradient-to-br from-red-500 to-red-700"
                      }`}
                    >
                      {msg.role === "user"
                        ? <User className="w-4 h-4 text-white" />
                        : <Bot className="w-4 h-4 text-white" />
                      }
                    </div>
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-red-600 text-white rounded-tr-sm"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <span className="whitespace-pre-wrap">{msg.text}</span>
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            ul: ({ children }) => <ul className="list-disc list-inside space-y-0.5 my-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside space-y-0.5 my-1">{children}</ol>,
                            li: ({ children }) => <li className="text-sm">{children}</li>,
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br from-red-500 to-red-700">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm">
                      <div className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-900">
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask about our services..."
                    className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm leading-relaxed max-h-28 overflow-y-auto"
                    style={{ minHeight: "42px" }}
                  />
                  <motion.button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #FF3B30 0%, #CC1A12 100%)" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 text-center">
                  Enter to send · Shift+Enter for new line
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
