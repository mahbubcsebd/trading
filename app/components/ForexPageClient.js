"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { TrendingUp, Bitcoin, BarChart2, BookOpen, Lightbulb, HelpCircle, Target, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────
   Content renderer
───────────────────────────────────────── */
function renderInline(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-content-primary font-semibold">
        {p}
      </strong>
    ) : p
  );
}

function renderContent(content) {
  if (!content) return null;
  const lines = content.split("\n");
  const elements = [];
  let listBuffer = [];

  const flushList = () => {
    if (!listBuffer.length) return;
    elements.push(
      <ul key={`ul-${elements.length}`} className="my-4 space-y-2">
        {listBuffer.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-content-secondary leading-7">
              {renderInline(item)}
            </span>
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((line, idx) => {
    if (!line.trim()) { flushList(); return; }
    if (line.startsWith("- ")) { listBuffer.push(line.slice(2)); return; }
    flushList();
    elements.push(
      <p key={idx} className="leading-8 my-3 text-content-secondary">
        {renderInline(line)}
      </p>
    );
  });
  flushList();
  return elements;
}

/* ─────────────────────────────────────────
   Question Accordion Component
───────────────────────────────────────── */
function QuestionAccordion({ q, idx }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 rounded-xl border border-border bg-surface overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-surface-2 transition-colors"
      >
        <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-accent/15 text-accent">
          <HelpCircle className="w-4 h-4" />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-sm leading-relaxed mt-1 text-content-primary">
            {q.question}
          </p>
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 pl-13 border-t border-border">
          <div className="flex items-start gap-2 mt-4 text-sm leading-relaxed text-content-secondary">
            <Target className="w-4 h-4 shrink-0 mt-0.5 text-green-500" />
            <span>{renderInline(q.answer)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Left sidebar — Chapter list
───────────────────────────────────────── */
function LeftSidebar({ topics, activeTopic, onTopicClick }) {
  return (
    <aside className="w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] hidden lg:flex flex-col border-r border-border bg-surface overflow-y-auto">
      <div className="flex-1 px-3 py-5">
        <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-2 text-content-muted">
          অধ্যায়সমূহ
        </p>
        <nav className="flex flex-col">
          {topics.map((topic, i) => {
            const isActive = topic.slug === activeTopic;
            return (
              <button
                key={topic.slug}
                onClick={() => onTopicClick(topic.slug)}
                className={`w-full flex items-start gap-2.5 px-2 py-2.5 text-sm text-left transition-all border-l-2 ${
                  isActive
                    ? "bg-accent/10 text-accent font-semibold border-accent"
                    : "bg-transparent text-content-secondary font-normal border-transparent hover:bg-surface-2 hover:text-content-primary"
                }`}
              >
                <span
                  className={`shrink-0 w-5 h-5 flex items-center justify-center text-[10px] font-bold mt-0.5 rounded ${
                    isActive ? "bg-accent text-white" : "bg-surface-2 text-content-muted"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="leading-snug">{topic.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────
   Right sidebar — Section & Sub-section TOC
───────────────────────────────────────── */
function RightTOC({ sections, activeId, onItemClick }) {
  return (
    <aside className="w-60 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] hidden xl:flex flex-col border-l border-border bg-surface overflow-y-auto">
      <div className="px-3 pt-5 pb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-3 text-content-muted">
          এই অধ্যায়ে
        </p>
        <nav className="flex flex-col">
          {sections.map((section, sIdx) => {
            const sIsActive = activeId === section.id;
            const hasSubsections = section.subsections?.length > 0;

            return (
              <div key={section.id}>
                {/* Main section button */}
                <button
                  onClick={() => onItemClick(section.id)}
                  className={`w-full flex items-start gap-2 px-2 py-1.5 text-left transition-all text-[13px] border-l-2 ${
                    sIsActive && !hasSubsections
                      ? "bg-accent/10 text-accent font-semibold border-accent"
                      : sIsActive
                      ? "bg-transparent text-accent font-semibold border-accent"
                      : "bg-transparent text-content-secondary font-normal border-transparent hover:bg-surface-2 hover:text-content-primary"
                  }`}
                >
                  <span className={`shrink-0 text-[11px] font-semibold mt-0.5 w-5 ${sIsActive ? "text-accent" : "text-content-muted"}`}>
                    {sIdx + 1}.
                  </span>
                  <span className="leading-snug">{section.title}</span>
                </button>

                {/* Sub-sections */}
                {hasSubsections && section.subsections.map((sub, subIdx) => {
                  const subIsActive = activeId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => onItemClick(sub.id)}
                      className={`w-full flex items-start gap-2 pl-7 pr-2 py-1 text-left transition-all text-[12px] border-l-2 ${
                        subIsActive
                          ? "bg-accent/10 text-accent font-semibold border-accent"
                          : "bg-transparent text-content-muted font-normal border-transparent hover:bg-surface-2 hover:text-content-primary"
                      }`}
                    >
                      <span className={`shrink-0 text-[10px] font-medium mt-0.5 ${subIsActive ? "text-accent" : "text-content-muted"}`}>
                        {sIdx + 1}.{subIdx + 1}
                      </span>
                      <span className="leading-snug ml-1">{sub.title}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────
   Mobile Chapter Dropdown
───────────────────────────────────────── */
function MobileChapterSelect({ topics, activeTopic, onTopicClick }) {
  return (
    <div className="lg:hidden sticky top-14 z-40 bg-surface border-b border-border p-3 shadow-sm">
      <div className="relative">
        <select
          value={activeTopic}
          onChange={(e) => onTopicClick(e.target.value)}
          className="w-full appearance-none bg-surface-2 border border-border text-content-primary text-sm font-semibold rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
        >
          {topics.map((topic, i) => (
            <option key={topic.slug} value={topic.slug}>
              {i + 1}. {topic.title}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted pointer-events-none" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Page Client Component
───────────────────────────────────────── */
export function ForexPageClient({ allTopics, initialTopic }) {
  const router = useRouter();

  const [activeTopic, setActiveTopic] = useState(initialTopic);
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);

  const currentTopicData = allTopics.find((t) => t.slug === activeTopic) || allTopics[0];
  const sections = currentTopicData?.sections || [];
  const endQuestions = currentTopicData?.endQuestions || [];

  const allObservableIds = sections.flatMap((s) => [
    s.id,
    ...(s.subsections?.map((sub) => sub.id) || []),
  ]);

  const handleTopicClick = useCallback((slug) => {
    setActiveTopic(slug);
    setActiveId(null);
    router.push(`/forex?topic=${slug}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  const handleItemClick = useCallback((id) => {
    const el = document.getElementById(`anchor-${id}`);
    // Adjust scroll margin for mobile sticky header (top-14 + mobile dropdown ~60px = 120px)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        const id = top.target.dataset.anchorId;
        if (id) setActiveId(id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
    );

    allObservableIds.forEach((id) => {
      const el = document.getElementById(`anchor-${id}`);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sections]);

  useEffect(() => {
    if (sections.length > 0) {
      setActiveId(sections[0].id);
    }
  }, [sections]);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <div className="flex flex-col lg:flex-row">
        {/* Mobile/Tablet Chapter Select */}
        <MobileChapterSelect 
          topics={allTopics} 
          activeTopic={activeTopic} 
          onTopicClick={handleTopicClick} 
        />

        {/* Desktop Sidebar */}
        <LeftSidebar
          topics={allTopics}
          activeTopic={activeTopic}
          onTopicClick={handleTopicClick}
        />

        <main className="flex-1 min-w-0 py-8 lg:py-10 px-5 md:px-8 xl:px-14">
          <div className="mb-8 lg:mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 text-accent">
              ফরেক্স মডিউল
            </p>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2 text-content-primary">
              {currentTopicData?.title}
            </h1>
            {currentTopicData?.description && (
              <p className="text-sm mt-1 text-content-muted">
                {currentTopicData.description}
              </p>
            )}
            <div className="mt-5 h-px bg-border" />
          </div>

          <div className="space-y-12 lg:space-y-14 max-w-2xl mx-auto lg:mx-0">
            {sections.map((section, sIdx) => (
              <div key={section.id}>
                <div
                  id={`anchor-${section.id}`}
                  data-anchor-id={section.id}
                  className="scroll-mt-32 lg:scroll-mt-24"
                />

                <div className="flex items-start gap-3 mb-5">
                  <span className="shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5 bg-accent text-white rounded">
                    {sIdx + 1}
                  </span>
                  <h2 className="text-xl font-bold leading-tight text-content-primary">
                    {section.title}
                  </h2>
                </div>

                {section.image && (
                  <figure className="mb-6 overflow-hidden relative aspect-video border border-border bg-surface-2 rounded-xl">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    {section.imageCaption && (
                      <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-2 text-xs bg-black/70 text-slate-200 backdrop-blur-sm">
                        {section.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

                <div className="text-[15px]">{renderContent(section.content)}</div>

                {/* Hint Box for Main Section */}
                {section.hint && (
                  <div className="mt-6 p-4 rounded-xl flex gap-3 text-sm leading-relaxed bg-accent/5 border border-accent/20">
                    <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-accent" />
                    <div className="text-content-secondary">
                      <strong className="block mb-1 text-content-primary">টিপস</strong>
                      {renderInline(section.hint)}
                    </div>
                  </div>
                )}

                {section.subsections?.length > 0 && (
                  <div className="mt-8 space-y-10">
                    {section.subsections.map((sub, subIdx) => (
                      <div key={sub.id}>
                        <div
                          id={`anchor-${sub.id}`}
                          data-anchor-id={sub.id}
                          className="scroll-mt-32 lg:scroll-mt-24"
                        />
                        <div className="flex items-start gap-3 mb-4 pl-2 border-l-2 border-border">
                          <span className="shrink-0 text-xs font-bold mt-1 tabular-nums text-content-muted min-w-[2rem]">
                            {sIdx + 1}.{subIdx + 1}
                          </span>
                          <h3 className="text-base font-semibold leading-snug text-content-primary">
                            {sub.title}
                          </h3>
                        </div>

                        {sub.image && (
                          <figure className="mb-5 ml-4 md:ml-8 overflow-hidden relative aspect-video border border-border bg-surface-2 rounded-xl">
                            <Image
                              src={sub.image}
                              alt={sub.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </figure>
                        )}

                        <div className="text-[14px] ml-4 md:ml-8">{renderContent(sub.content)}</div>

                        {/* Hint Box for Subsection */}
                        {sub.hint && (
                          <div className="mt-5 ml-4 md:ml-8 p-4 rounded-xl flex gap-3 text-sm leading-relaxed bg-accent/5 border border-accent/20">
                            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-accent" />
                            <div className="text-content-secondary">
                              <strong className="block mb-1 text-content-primary">টিপস</strong>
                              {renderInline(sub.hint)}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {sIdx < sections.length - 1 && (
                  <div className="mt-10 lg:mt-14 h-px bg-border" />
                )}
              </div>
            ))}
          </div>

          {/* End of Topic Questions & Quiz Start */}
          <div className="mt-16 lg:mt-20 max-w-2xl mx-auto lg:mx-0">
            {endQuestions.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-bold text-content-primary">
                    নিজে নিজে যাচাই করুন
                  </h3>
                </div>
                <div className="space-y-4">
                  {endQuestions.map((q, i) => (
                    <QuestionAccordion key={i} q={q} idx={i} />
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 md:p-8 rounded-2xl text-center flex flex-col items-center bg-surface border border-border">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4 bg-accent/15 text-accent">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-content-primary">
                অধ্যায় শেষ!
              </h3>
              <p className="text-sm mb-6 text-content-secondary">
                আপনি এই অধ্যায়ের থিওরি শিখেছেন। এবার কুইজ দিয়ে নিজের মেধা যাচাই করুন।
              </p>
              <Link
                href={`/forex/quiz?topic=${activeTopic}`}
                className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto rounded-xl text-white font-semibold text-sm transition-all shadow-lg hover:opacity-90 bg-accent shadow-accent/35"
              >
                কুইজ শুরু করুন
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="h-24" />
        </main>

        <RightTOC
          sections={sections}
          activeId={activeId}
          onItemClick={handleItemClick}
        />
      </div>
    </div>
  );
}
