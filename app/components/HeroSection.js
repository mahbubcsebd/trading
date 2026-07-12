import Link from "next/link";
import { ArrowRight, TrendingUp, BarChart2, Bitcoin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.08),transparent)]" />
      
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 border border-blue-200 dark:border-blue-800">
          <TrendingUp className="w-4 h-4" />
          <span>বাংলায় ট্রেডিং শিখুন</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
          ট্রেডিং শেখার সম্পূর্ণ{" "}
          <span className="text-blue-600 dark:text-blue-400">নতুন অভিজ্ঞতা</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          ফরেক্স, ক্রিপ্টোকারেন্সি এবং স্টক মার্কেট নিয়ে বেসিক থেকে অ্যাডভান্সড পর্যন্ত শিখুন বাংলায়। আপনার শেখার নোটস এবং গাইডলাইন এক জায়গায়।
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/forex"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            শুরু করুন (ফরেক্স)
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#modules"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-all w-full sm:w-auto justify-center"
          >
            মডিউলগুলো দেখুন
          </Link>
        </div>
      </div>
    </section>
  );
}
