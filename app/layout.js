import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "ট্রেডিং নোটস",
  description: "ট্রেডিং শেখার এবং নোট রাখার ডাইনামিক প্ল্যাটফর্ম",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning className={hindSiliguri.variable}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
