"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  FileText,
  Inbox,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Settings,
  Tags,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { logout, type CurrentUser } from "@/lib/api/auth";
import { SITE_NAME } from "@/lib/site";

const NAV: { to: string; label: string; exact: boolean; indent: boolean; icon: LucideIcon }[] = [
  { to: "/admin", label: "Dashboard", exact: true, indent: false, icon: LayoutDashboard },
  { to: "/admin/posts", label: "Posts", exact: false, indent: false, icon: FileText },
  { to: "/admin/categories", label: "Categories", exact: false, indent: true, icon: Tags },
  { to: "/admin/media", label: "Media", exact: false, indent: false, icon: ImageIcon },
  { to: "/admin/messages", label: "Messages", exact: false, indent: false, icon: Inbox },
  { to: "/admin/settings", label: "Settings", exact: false, indent: false, icon: Settings },
];

/** Page title row used by every admin screen. */
export function AdminPageHeader({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">{title}</h1>
          {description && <p className="mt-0.5 text-sm text-neutral-500">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function AdminShell({ user, children }: { user: CurrentUser; children: ReactNode }) {
  const navigate = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await logout();
    toast.success("Logged out");
    navigate.push("/admin/login");
  }

  const initial = user.email.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-neutral-900 md:flex-row">
      <aside className="sticky top-0 z-30 flex shrink-0 flex-col border-b border-neutral-200 bg-white md:h-screen md:w-60 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <img src="/images/logo.webp" alt="" width={36} height={36} className="size-9 object-contain" />
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight">{SITE_NAME}</span>
              <span className="block text-xs text-neutral-500">Admin</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 md:hidden"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Log out
          </button>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-visible md:pb-4 md:pt-2">
          <div className="hidden px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 md:block">
            Manage
          </div>
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                href={item.to}
                aria-current={
                  (item.exact ? pathname === item.to : pathname.startsWith(item.to)) ? "page" : undefined
                }
                className={`group flex shrink-0 items-center gap-2.5 rounded-lg py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 ${
                  item.indent ? "px-3 md:pl-6" : "px-3"
                } aria-[current=page]:!bg-blue-50 aria-[current=page]:!text-blue-700`}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 md:mt-4"
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
            View site
          </a>
        </nav>

        <div className="hidden border-t border-neutral-200 p-3 md:block">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-blue-900 text-xs font-semibold text-white">
              {initial}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-neutral-600" title={user.email}>
              {user.email}
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-10">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}
