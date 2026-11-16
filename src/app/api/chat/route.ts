import { SYSTEM_PROMPT } from "@/lib/chat-prompt";

// Site chat assistant. The Groq key stays on the server (Worker secret GROQ_API_KEY).

type ChatTurn = { role: "user" | "assistant"; content: string };

const MAX_MESSAGE = 1000;
const MAX_TURNS = 12;

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "The assistant is not configured yet." }, { status: 503 });
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE) : "";
  if (!message) return Response.json({ error: "Message is required" }, { status: 400 });

  const history: ChatTurn[] = Array.isArray(body.history)
    ? body.history
        .filter(
          (t): t is ChatTurn =>
            !!t &&
            (t.role === "user" || t.role === "assistant") &&
            typeof t.content === "string",
        )
        .slice(-MAX_TURNS)
        .map((t) => ({ role: t.role, content: t.content.slice(0, 4000) }))
    : [];

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history, { role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    console.error("[chat] Groq error", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "The assistant is busy. Please try again." }, { status: 502 });
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return Response.json({ reply: data.choices?.[0]?.message?.content ?? "No response received." });
}
