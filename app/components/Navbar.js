import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { BookOpen } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full h-14 flex items-center border-b"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}>
      <div className="w-full max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg"
          style={{ color: "var(--accent)" }}>
          <BookOpen className="w-5 h-5" />
          <span>ট্রেডিং নোটস</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link href="/" style={{ color: "var(--text-secondary)" }}
              className="hover:text-blue-500 transition-colors">হোম</Link>
            <Link href="/forex" style={{ color: "var(--text-secondary)" }}
              className="hover:text-blue-500 transition-colors">ফরেক্স</Link>
            <span style={{ color: "var(--text-muted)" }} className="text-sm cursor-not-allowed">
              ক্রিপ্টো
            </span>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
