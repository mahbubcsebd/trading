import fs from 'fs';
import {
  ArrowRight,
  BarChart2,
  Bitcoin,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Fuel,
  Home,
  Landmark,
  Layers,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import path from 'path';
import { Navbar } from './components/Navbar';

/* ── Load forex data server-side ── */
function loadForexData() {
  try {
    const indexPath = path.join(process.cwd(), 'data', 'forex', 'index.json');
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

    const topics = indexData.topics.map((topic) => {
      try {
        const topicPath = path.join(
          process.cwd(),
          'data',
          'forex',
          'topics',
          `${topic.slug}.json`,
        );
        const data = JSON.parse(fs.readFileSync(topicPath, 'utf8'));
        return { ...topic, sections: data.sections || [] };
      } catch {
        return { ...topic, sections: [] };
      }
    });

    return { ...indexData, topics };
  } catch {
    return { topics: [] };
  }
}

/* ── Stat Card ── */
function StatCard({ value, label, icon: Icon }) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-6 rounded-2xl text-center"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
        style={{
          background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
          color: 'var(--accent)',
        }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <span
        className="text-2xl font-bold"
        style={{ color: 'var(--text-primary)' }}
      >
        {value}
      </span>
      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  );
}

/* ── Home Page ── */
export default function HomePage() {
  const forexData = loadForexData();
  const forexTopics = forexData.topics || [];
  const totalSections = forexTopics.reduce(
    (acc, t) => acc + (t.sections?.length || 0),
    0,
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--accent) 12%, transparent), transparent)',
          }}
        />
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 border"
            style={{
              borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
              background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
              color: 'var(--accent)',
            }}
          >
            <TrendingUp className="w-4 h-4" />
            Exness প্ল্যাটফর্ম ব্যবহার করে বাংলায় শিখুন
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            ট্রেডিং শেখার সবচেয়ে{' '}
            <span style={{ color: 'var(--accent)' }}>সহজ পথ</span>
          </h1>

          <p
            className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            ফরেক্স ট্রেডিং বাংলায় ধাপে ধাপে শিখুন — বেসিক থেকে শুরু করে
            ক্যান্ডেলস্টিক, সাপোর্ট-রেসিস্ট্যান্স এবং ইন্ডিকেটর পর্যন্ত। সহজ
            ভাষায়, গল্পের মতো।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/forex"
              className="flex items-center gap-2 px-7 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 w-full sm:w-auto justify-center"
              style={{
                background: 'var(--accent)',
                boxShadow:
                  '0 4px 20px color-mix(in srgb, var(--accent) 40%, transparent)',
              }}
            >
              ফরেক্স শুরু করুন
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#curriculum"
              className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all w-full sm:w-auto justify-center"
              style={{
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
              }}
            >
              কি শিখব?
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="py-10 px-4"
        style={{ background: 'var(--bg-surface)' }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            value={`${forexTopics.length}টি`}
            label="অধ্যায়"
            icon={BookOpen}
          />
          <StatCard value={`${totalSections}টি`} label="টপিক" icon={Layers} />
          <StatCard
            value="বিনামূল্যে"
            label="সম্পূর্ণ ফ্রি"
            icon={CheckCircle2}
          />
          <StatCard value="বাংলায়" label="সহজ ভাষায়" icon={Target} />
        </div>
      </section>

      {/* ── Forex Curriculum ── */}
      <section
        id="curriculum"
        className="py-16 px-4"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--accent)' }}
              >
                ফরেক্স মডিউল
              </p>
              <h2
                className="text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                কি কি শিখব?
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                {forexTopics.length}টি অধ্যায়, {totalSections}টি বিস্তারিত টপিক
              </p>
            </div>
            <Link
              href="/forex"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold self-start"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              শুরু করুন <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Chapter cards */}
          <div className="space-y-4">
            {forexTopics.map((topic, topicIdx) => (
              <Link
                key={topic.slug}
                href={`/forex?topic=${topic.slug}`}
                className="group block rounded-2xl p-6 transition-all hover:-translate-y-0.5"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex items-start gap-5">
                  {/* Chapter number */}
                  <span
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    {topicIdx + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Title & description */}
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div>
                        <h3
                          className="font-bold text-base"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {topic.title}
                        </h3>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {topic.description}
                        </p>
                      </div>
                      <div
                        className="shrink-0 flex items-center gap-1 text-xs font-medium"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {topic.sections.length} টপিক
                      </div>
                    </div>

                    {/* Sections list */}
                    {topic.sections.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {topic.sections.map((section) => (
                          <span
                            key={section.id}
                            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg"
                            style={{
                              background: 'var(--bg-surface-2)',
                              color: 'var(--text-secondary)',
                              border: '1px solid var(--border)',
                            }}
                          >
                            <CheckCircle2
                              className="w-3 h-3 shrink-0"
                              style={{ color: 'var(--accent)' }}
                            />
                            {section.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <ChevronRight
                    className="shrink-0 w-5 h-5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--accent)' }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Modules ── */}

      <section
        id="modules"
        className="py-16 px-4"
        style={{ background: 'var(--bg-surface)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              সব মডিউল
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              একটি দিয়ে শুরু করুন, ধীরে ধীরে সব শিখুন
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Forex — Active */}
            <Link
              href="/forex"
              className="group p-6 rounded-2xl transition-all hover:-translate-y-1 block"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-bold"
                  style={{
                    background:
                      'color-mix(in srgb, var(--accent) 15%, transparent)',
                    color: 'var(--accent)',
                  }}
                >
                  FX
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full font-semibold"
                  style={{
                    background: 'color-mix(in srgb, #22c55e 15%, transparent)',
                    color: '#22c55e',
                  }}
                >
                  সক্রিয়
                </span>
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                ফরেক্স ট্রেডিং
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {forexTopics.length}টি অধ্যায় · {totalSections}টি টপিক · Exness
                প্ল্যাটফর্ম ব্যবহার করে বাংলায় শিখুন।
              </p>
              <div
                className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                style={{ color: 'var(--accent)' }}
              >
                শুরু করুন <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Crypto — Coming Soon */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                opacity: 0.65,
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Bitcoin className="w-5 h-5" />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  শীঘ্রই
                </span>
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                ক্রিপ্টোকারেন্সি
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                ব্লকচেইন, Bitcoin, Altcoin ট্রেডিং এবং DeFi পরিচিতি।
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                পরিকল্পিত অধ্যায়: ক্রিপ্টো পরিচিতি · ওয়ালেট সেটআপ · স্পট
                ট্রেডিং · ফিউচার্স
              </p>
            </div>

            {/* Stocks — Coming Soon */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                opacity: 0.65,
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <BarChart2 className="w-5 h-5" />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  শীঘ্রই
                </span>
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                স্টক মার্কেট
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                শেয়ার বাজারের মূলনীতি, fundamental ও technical বিশ্লেষণ।
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                পরিকল্পিত অধ্যায়: শেয়ার কি · ডিম্যাট একাউন্ট · বিএসই/ডিএসই ·
                ফান্ডামেন্টাল
              </p>
            </div>

            {/* Commodities — Coming Soon */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                opacity: 0.65,
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Fuel className="w-5 h-5" />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  শীঘ্রই
                </span>
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                কমোডিটি ট্রেডিং
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                গোল্ড, সিলভার, অয়েল ও অন্যান্য কমোডিটিতে ট্রেডিং কৌশল।
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                পরিকল্পিত অধ্যায়: গোল্ড ট্রেডিং · অয়েল মার্কেট · সিজনাল
                প্যাটার্ন · হেজিং
              </p>
            </div>

            {/* Mutual Funds — Coming Soon */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                opacity: 0.65,
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Landmark className="w-5 h-5" />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  শীঘ্রই
                </span>
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                মিউচুয়াল ফান্ড
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                ইনডেক্স ফান্ড, SIP এবং দীর্ঘমেয়াদী বিনিয়োগ পরিকল্পনা।
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                পরিকল্পিত অধ্যায়: ফান্ড টাইপ · SIP পদ্ধতি · রিস্ক প্রোফাইল ·
                রিটার্ন ক্যালকুলেশন
              </p>
            </div>

            {/* Real Estate — Coming Soon */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                opacity: 0.65,
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Home className="w-5 h-5" />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  শীঘ্রই
                </span>
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                রিয়েল এস্টেট
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                জমি ও ফ্ল্যাট বিনিয়োগ, ভাড়া আয় এবং বাজার বিশ্লেষণ।
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                পরিকল্পিত অধ্যায়: প্রপার্টি ভ্যালুয়েশন · ভাড়া আয় · লিগ্যাল
                প্রসেস · REIT
              </p>
            </div>

            {/* Personal Finance — Coming Soon */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                opacity: 0.65,
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Wallet className="w-5 h-5" />
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  শীঘ্রই
                </span>
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                পার্সোনাল ফাইন্যান্স
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                বাজেটিং, সঞ্চয়, ঋণ ব্যবস্থাপনা ও আর্থিক স্বাধীনতা।
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                পরিকল্পিত অধ্যায়: বাজেট প্ল্যান · ইমার্জেন্সি ফান্ড · ঋণ কমানো
                · রিটায়ারমেন্ট
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to start ── */}
      <section
        className="py-16 px-4"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            কিভাবে শুরু করবেন?
          </h2>
          <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
            মাত্র ৩টি ধাপে শেখা শুরু করুন
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: '০১',
                title: 'নোটস পড়ুন',
                desc: 'ফরেক্স মডিউলে গিয়ে অধ্যায় অনুযায়ী বাংলায় লেখা বিস্তারিত নোটস পড়ুন।',
              },
              {
                step: '০২',
                title: 'Exness Demo তে প্র্যাকটিস',
                desc: 'Exness-এ ফ্রি Demo Account খুলুন। রিয়েল টাকা ছাড়াই যা শিখলেন তা প্র্যাকটিস করুন।',
              },
              {
                step: '০৩',
                title: 'ধীরে Real শুরু করুন',
                desc: 'ডেমোতে ধারাবাহিকভাবে লাভ করলে খুব ছোট পরিমাণ দিয়ে Real শুরু করুন।',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="p-6 rounded-2xl text-left"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  className="text-3xl font-bold mb-4"
                  style={{
                    color: 'color-mix(in srgb, var(--accent) 30%, transparent)',
                  }}
                >
                  {step}
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/forex"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
              style={{
                background: 'var(--accent)',
                boxShadow:
                  '0 4px 20px color-mix(in srgb, var(--accent) 35%, transparent)',
              }}
            >
              এখনই শুরু করুন
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-8 border-t text-center"
        style={{
          borderColor: 'var(--border)',
          background: 'var(--bg-surface)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="flex items-center justify-center gap-2 mb-3 font-bold"
            style={{ color: 'var(--accent)' }}
          >
            <TrendingUp className="w-5 h-5" />
            ট্রেডিং নোটস
          </div>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            বাংলায় ট্রেডিং শেখার ফ্রি প্ল্যাটফর্ম
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm mb-5">
            <Link href="/forex" style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              ফরেক্স
            </Link>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>ক্রিপ্টোকারেন্সি</span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>স্টক মার্কেট</span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>কমোডিটি</span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>মিউচুয়াল ফান্ড</span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>রিয়েল এস্টেট</span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>পার্সোনাল ফাইন্যান্স</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} ট্রেডিং নোটস।
          </p>
        </div>
      </footer>
    </div>
  );
}
