"use client";

import { useRouter } from "next/navigation";
import { Inbox, Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin-shell";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteMessage, setMessageRead, type Message } from "@/lib/api/messages";

export default function AdminMessages({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Message | null>(null);
  const unread = messages.filter((m) => !m.read).length;

  async function toggle(message: Message) {
    const opening = openId !== message.id;
    setOpenId(opening ? message.id : null);
    if (opening && !message.read) {
      await setMessageRead({ data: { id: message.id, read: true } });
      router.refresh();
    }
  }

  async function markUnread(message: Message) {
    await setMessageRead({ data: { id: message.id, read: false } });
    setOpenId(null);
    router.refresh();
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    await deleteMessage({ data: { id: pendingDelete.id } });
    toast.success("Message deleted");
    setPendingDelete(null);
    router.refresh();
  }

  return (
    <div>
      <AdminPageHeader
        icon={Inbox}
        title="Messages"
        description={`${messages.length} total · ${unread} unread — sent from the contact page`}
      />

      <div className="mt-6 divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {messages.length === 0 && (
          <p className="py-14 text-center text-sm text-neutral-500">No messages yet.</p>
        )}
        {messages.map((m) => {
          const open = openId === m.id;
          return (
            <div key={m.id} className={cn(!m.read && "bg-blue-50/40")}>
              <button
                type="button"
                onClick={() => toggle(m)}
                aria-expanded={open}
                className="flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-neutral-50"
              >
                {m.read ? (
                  <MailOpen
                    className="mt-0.5 size-4 shrink-0 text-neutral-400"
                    aria-hidden="true"
                  />
                ) : (
                  <Mail className="mt-0.5 size-4 shrink-0 text-blue-700" aria-hidden="true" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className={cn("text-sm text-neutral-900", !m.read && "font-semibold")}>
                      {m.name}{" "}
                      <span className="font-normal text-neutral-500">&lt;{m.email}&gt;</span>
                    </span>
                    <span className="text-xs text-neutral-500" suppressHydrationWarning>
                      {new Date(m.createdAt).toLocaleString()}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-neutral-600">
                    {m.subject ? `${m.subject} — ` : ""}
                    {m.body}
                  </span>
                </span>
              </button>

              {open && (
                <div className="border-t border-neutral-100 px-5 pt-3 pb-5 pl-12">
                  {m.budget && (
                    <p className="mb-3 text-xs text-neutral-500">
                      Budget: <span className="font-medium text-neutral-800">{m.budget}</span>
                    </p>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-neutral-800">
                    {m.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <a
                        href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject || "Your message"}`)}`}
                      >
                        <Reply className="size-4" aria-hidden="true" />
                        Reply by email
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => markUnread(m)}>
                      <Mail className="size-4" aria-hidden="true" />
                      Mark unread
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-600"
                      onClick={() => setPendingDelete(m)}
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ConfirmDeleteDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title={`Delete message from ${pendingDelete?.name}?`}
        description="This can't be undone."
        onConfirm={confirmDelete}
      />
    </div>
  );
}
