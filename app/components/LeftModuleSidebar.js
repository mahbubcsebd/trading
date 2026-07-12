import Link from "next/link";
import { TrendingUp, Bitcoin, BarChart2 } from "lucide-react";

const MODULES = [
  { slug: "forex", label: "ফরেক্স", icon: TrendingUp, available: true },
  { slug: "crypto", label: "ক্রিপ্টো", icon: Bitcoin, available: false },
  { slug: "stocks", label: "স্টকস", icon: BarChart2, available: false },
];

export function LeftModuleSidebar({ currentModule }) {
  return (
    <aside
      className="w-52 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col border-r py-6 px-3 overflow-y-auto"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-3"
        style={{ color: "var(--text-muted)" }}>
        মডিউল
      </p>
      <nav className="flex flex-col gap-1">
        {MODULES.map(({ slug, label, icon: Icon, available }) => {
          const isActive = slug === currentModule;
          return available ? (
            <Link
              key={slug}
              href={`/${slug}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "#fff" : "var(--text-secondary)",
              }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ) : (
            <div
              key={slug}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-not-allowed"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: "var(--bg-surface-2)", color: "var(--text-muted)" }}>
                শীঘ্রই
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
