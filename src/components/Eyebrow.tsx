import type { LucideIcon } from "lucide-react";

/** Small pill above page titles — same look as the badges on the service pages. */
export default function Eyebrow({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 mb-6">
      <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{children}</span>
    </div>
  );
}
