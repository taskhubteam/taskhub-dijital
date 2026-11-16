#!/usr/bin/env node
// Creates (or resets the password of) an admin user in the D1 database.
//
//   npm run admin:create              → local dev database (.wrangler/state)
//   npm run admin:create -- --remote  → production D1 on Cloudflare
//
// Prompts for name, email and password; the password is hashed here (PBKDF2-SHA256, same
// format as src/lib/auth.ts) and never leaves your machine in plain text.
import { execFileSync } from "node:child_process";
import { pbkdf2Sync, randomBytes, randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const DB_NAME = "taskhub-dijital";
const ITERATIONS = 100_000;
const remote = process.argv.includes("--remote");

async function readAnswers() {
  // Non-interactive (piped) input: three lines — name, email, password.
  if (!stdin.isTTY) {
    let text = "";
    for await (const chunk of stdin) text += chunk;
    const [n = "", e = "", p = ""] = text.split(/\r?\n/);
    return { name: n, email: e, password: p };
  }
  const rl = createInterface({ input: stdin, output: stdout });
  const n = await rl.question("Name [TaskHub Admin]: ");
  const e = await rl.question("Admin email: ");
  // Hide password input.
  const ask = rl.question("Password (min 8 chars): ");
  const write = rl._writeToOutput?.bind(rl);
  rl._writeToOutput = (s) => (s.includes("Password") ? write?.(s) : write?.("*"));
  const p = await ask;
  rl.close();
  stdout.write("\n");
  return { name: n, email: e, password: p };
}

const answers = await readAnswers();
const name = answers.name.trim() || "TaskHub Admin";
const email = answers.email.trim().toLowerCase();
const password = answers.password;

if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Invalid email");
if (password.length < 8) throw new Error("Password must be at least 8 characters");

const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, ITERATIONS, 32, "sha256");
const passwordHash = [
  "pbkdf2",
  ITERATIONS,
  salt.toString("base64url"),
  hash.toString("base64url"),
].join("$");

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const sql = `INSERT INTO users (id, email, password_hash, name, role, created_at)
VALUES (${q(randomUUID())}, ${q(email)}, ${q(passwordHash)}, ${q(name)}, 'admin', ${q(new Date().toISOString())})
ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, name = excluded.name;`;

execFileSync(
  "npx",
  ["wrangler", "d1", "execute", DB_NAME, remote ? "--remote" : "--local", "--command", sql],
  { stdio: ["ignore", "inherit", "inherit"] },
);
console.log(
  `\nAdmin ${email} is ready (${remote ? "production" : "local"}). Sign in at /admin/login`,
);
