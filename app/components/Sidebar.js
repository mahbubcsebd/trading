"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function Sidebar({ topics, moduleSlug = "forex" }) {
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get("topic") || topics[0]?.slug;

  return (
    <aside className="w-full border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/50">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          ফরেক্স মডিউল
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{topics.length} টি টপিক</p>
      </div>
      <nav className="flex flex-col p-3 gap-1">
        {topics.map((topic, index) => {
          const isActive = topic.slug === currentTopic;
          return (
            <Link
              key={topic.id}
              href={`/${moduleSlug}?topic=${topic.slug}`}
              scroll={false}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              <span className="flex items-center gap-3 text-sm">
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-300"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="leading-tight">{topic.title}</span>
              </span>
              {isActive && <ChevronRight className="w-4 h-4 shrink-0" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
