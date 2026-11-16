"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";



const VALID_PATHS = ["/", "/traditional-websites", "/ai-readiness", "/products", "/managed-hosting", "/careers", "/contact", "/blog"];

function sanitizeLinks(text) {

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

async function askAssistant(history, userMessage) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history, message: userMessage }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data.reply ?? "No response received.";
}

const INITIAL_MESSAGES = [
  { role: "assistant", text: "Hi! I'm the TASKHUB Dijital AI assistant. Ask me anything about our web development services, tech stack, process, or how we can help your business grow online. 🚀" },
];

export default function FreeAICallToAction() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  // OpenAI-format history: [{role:'user'|'assistant', content:'...'}]
  const [chatHistory, setChatHistory] = useState([]);
  const [restored, setRestored] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Restore the saved conversation after hydration (localStorage doesn't exist on the server).
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem("taskhub_chat_messages");
      const savedHistory = localStorage.getItem("taskhub_chat_api_history");
      if (savedMessages) setMessages(JSON.parse(savedMessages));
      if (savedHistory) setChatHistory(JSON.parse(savedHistory));
    } catch {}
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try { localStorage.setItem("taskhub_chat_messages", JSON.stringify(messages)); } catch {}
  }, [messages, restored]);

  useEffect(() => {
    if (!restored) return;
    try { localStorage.setItem("taskhub_chat_api_history", JSON.stringify(chatHistory)); } catch {}
  }, [chatHistory, restored]);

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

    try {
      const raw = await askAssistant(chatHistory, text);
      const reply = sanitizeLinks(raw);

      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: text },
        { role: "assistant", content: reply },
      ]);

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error("Chat assistant error:", err);
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
