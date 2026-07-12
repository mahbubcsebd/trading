"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Pagination({ prevTopic, nextTopic, moduleSlug = "forex" }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
      {prevTopic ? (
        <Link
          href={`/${moduleSlug}?topic=${prevTopic.slug}`}
          scroll={false}
          className="flex-1 flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-500 shrink-0" />
          <div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mb-1">পূর্ববর্তী টপিক</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">{prevTopic.title}</div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextTopic ? (
        <Link
          href={`/${moduleSlug}?topic=${nextTopic.slug}`}
          scroll={false}
          className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
        >
          <div className="text-right">
            <div className="text-xs text-slate-400 dark:text-slate-500 mb-1">পরবর্তী টপিক</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 leading-tight">{nextTopic.title}</div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 shrink-0" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
