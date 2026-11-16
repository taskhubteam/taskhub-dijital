"use server";

import { z } from "zod";
import { getDb } from "@/lib/db";
import {
  createSession,
  destroySession,
  getSessionPayload,
  hashPassword,
  requireSession,
  verifyPassword,
  type Role,
} from "@/lib/auth";

type UserRow = {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: Role;
};

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

async function findUserBy(column: "id" | "email", value: string): Promise<UserRow | null> {
  return getDb()
    .prepare(`SELECT id, email, password_hash, name, role FROM users WHERE ${column} = ?`)
    .bind(value)
    .first<UserRow>();
}


export async function login(input: { data: z.input<typeof loginSchema> }) {
    const data = loginSchema.parse(input.data);
    const user = await findUserBy("email", data.email.toLowerCase());

    if (!user || !(await verifyPassword(data.password, user.password_hash))) {
      throw new Error("Invalid email or password");
    }

    await createSession({ userId: user.id, role: user.role });
    return { ok: true as const };
  }

export async function logout() {
  await destroySession();
  return { ok: true as const };
}

export async function getCurrentUser() : Promise<CurrentUser | null> {
    const session = await getSessionPayload();
    if (!session) return null;

    const user = await findUserBy("id", session.userId);
    if (!user) return null;

    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }

async function requireCurrentUser(): Promise<UserRow> {
  const session = await requireSession();
  const user = await findUserBy("id", session.userId);
  if (!user) throw new Error("User not found");
  return user;
}

const updateEmailSchema = z.object({ email: z.string().email(), currentPassword: z.string().min(1) });

export async function updateEmail(input: { data: z.input<typeof updateEmailSchema> }) : Promise<{ ok: true }> {
    const data = updateEmailSchema.parse(input.data);
    const user = await requireCurrentUser();
    if (!(await verifyPassword(data.currentPassword, user.password_hash))) {
      throw new Error("Current password is incorrect");
    }

    const email = data.email.toLowerCase();
    const existing = await findUserBy("email", email);
    if (existing && existing.id !== user.id) {
      throw new Error("Another account already uses this email");
    }

    await getDb().prepare("UPDATE users SET email = ? WHERE id = ?").bind(email, user.id).run();
    return { ok: true };
  }

const updatePasswordSchema = z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(8) });

export async function updatePassword(input: { data: z.input<typeof updatePasswordSchema> }) : Promise<{ ok: true }> {
    const data = updatePasswordSchema.parse(input.data);
    const user = await requireCurrentUser();
    if (!(await verifyPassword(data.currentPassword, user.password_hash))) {
      throw new Error("Current password is incorrect");
    }

    const passwordHash = await hashPassword(data.newPassword);
    await getDb()
      .prepare("UPDATE users SET password_hash = ? WHERE id = ?")
      .bind(passwordHash, user.id)
      .run();
    return { ok: true };
  }
