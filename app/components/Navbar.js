import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { BookOpen } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full h-14 flex items-center border-b border-border bg-surface">
      <div className="w-full max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-accent">
          <BookOpen className="w-5 h-5" />
          <span>ট্রেডিং নোটস</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link href="/"
              className="text-content-secondary hover:text-accent transition-colors">হোম</Link>
            <Link href="/forex"
              className="text-content-secondary hover:text-accent transition-colors">ফরেক্স</Link>
            <span className="text-content-muted text-sm cursor-not-allowed">
              ক্রিপ্টো
            </span>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
