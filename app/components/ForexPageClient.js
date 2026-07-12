"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { TrendingUp, Bitcoin, BarChart2, BookOpen, Lightbulb, HelpCircle, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────
   Content renderer
───────────────────────────────────────── */
function renderInline(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 600 }}>
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
            <span className="mt-2 w-1.5 h-1.5 shrink-0" style={{ background: "var(--accent)", borderRadius: "50%" }} />
            <span style={{ color: "var(--text-secondary)" }} className="leading-7">
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
      <p key={idx} className="leading-8 my-3" style={{ color: "var(--text-secondary)" }}>
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
    <div className="mb-4 rounded-xl border overflow-hidden transition-all"
      style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
          style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}>
          <HelpCircle className="w-4 h-4" />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-sm leading-relaxed mt-1" style={{ color: "var(--text-primary)" }}>
            {q.question}
          </p>
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 pl-13 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-start gap-2 mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <Target className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
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
    <aside
      className="w-60 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col border-r overflow-y-auto"
      style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}
    >
      <div className="flex-1 px-3 py-5">
        <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-2"
          style={{ color: "var(--text-muted)" }}>
          অধ্যায়সমূহ
        </p>
        <nav className="flex flex-col">
          {topics.map((topic, i) => {
            const isActive = topic.slug === activeTopic;
            return (
              <button
                key={topic.slug}
                onClick={() => onTopicClick(topic.slug)}
                className="w-full flex items-start gap-2.5 px-2 py-2.5 text-sm text-left transition-all"
                style={{
                  background: isActive ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  fontWeight: isActive ? 600 : 400,
                  borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                }}
              >
                <span
                  className="shrink-0 w-5 h-5 flex items-center justify-center text-[10px] font-bold mt-0.5"
                  style={{
                    background: isActive ? "var(--accent)" : "var(--bg-surface-2)",
                    color: isActive ? "#fff" : "var(--text-muted)",
                  }}
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
    <aside
      className="w-56 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col border-l overflow-y-auto"
      style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}
    >
      <div className="px-3 pt-5 pb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-3"
          style={{ color: "var(--text-muted)" }}>
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
                  className="w-full flex items-start gap-2 px-2 py-1.5 text-left transition-all text-[13px]"
                  style={{
                    background: sIsActive && !hasSubsections ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
                    color: sIsActive ? "var(--accent)" : "var(--text-secondary)",
                    fontWeight: sIsActive ? 600 : 400,
                    borderLeft: sIsActive ? "2px solid var(--accent)" : "2px solid transparent",
                  }}
                >
                  <span className="shrink-0 text-[11px] font-semibold mt-0.5 w-5"
                    style={{ color: sIsActive ? "var(--accent)" : "var(--text-muted)" }}>
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
                      className="w-full flex items-start gap-2 pl-7 pr-2 py-1 text-left transition-all text-[12px]"
                      style={{
                        background: subIsActive ? "color-mix(in srgb, var(--accent) 8%, transparent)" : "transparent",
                        color: subIsActive ? "var(--accent)" : "var(--text-muted)",
                        fontWeight: subIsActive ? 600 : 400,
                        borderLeft: subIsActive ? "2px solid var(--accent)" : "2px solid transparent",
                      }}
                    >
                      <span className="shrink-0 text-[10px] font-medium mt-0.5"
                        style={{ color: subIsActive ? "var(--accent)" : "var(--text-muted)" }}>
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
      { rootMargin: "-10% 0px -65% 0px", threshold: 0 }
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
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="flex">
        <LeftSidebar
          topics={allTopics}
          activeTopic={activeTopic}
          onTopicClick={handleTopicClick}
        />

        <main className="flex-1 min-w-0 py-10 px-8 xl:px-14">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
              ফরেক্স মডিউল
            </p>
            <h1 className="text-3xl font-bold leading-tight mb-2" style={{ color: "var(--text-primary)" }}>
              {currentTopicData?.title}
            </h1>
            {currentTopicData?.description && (
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                {currentTopicData.description}
              </p>
            )}
            <div className="mt-5 h-px" style={{ background: "var(--border)" }} />
          </div>

          <div className="space-y-14 max-w-2xl">
            {sections.map((section, sIdx) => (
              <div key={section.id}>
                <div
                  id={`anchor-${section.id}`}
                  data-anchor-id={section.id}
                  className="scroll-mt-24"
                />

                <div className="flex items-start gap-3 mb-5">
                  <span
                    className="shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    {sIdx + 1}
                  </span>
                  <h2 className="text-xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                    {section.title}
                  </h2>
                </div>

                {section.image && (
                  <figure
                    className="mb-6 overflow-hidden relative aspect-video"
                    style={{ border: "1px solid var(--border)", background: "var(--bg-surface-2)" }}
                  >
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    {section.imageCaption && (
                      <figcaption
                        className="absolute bottom-0 left-0 right-0 px-4 py-2 text-xs"
                        style={{ background: "rgba(15,23,42,0.7)", color: "#e2e8f0", backdropFilter: "blur(4px)" }}
                      >
                        {section.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

                <div className="text-[15px]">{renderContent(section.content)}</div>

                {/* Hint Box for Main Section */}
                {section.hint && (
                  <div className="mt-6 p-4 rounded-xl flex gap-3 text-sm leading-relaxed"
                    style={{ background: "color-mix(in srgb, var(--accent) 5%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)" }}>
                    <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                    <div style={{ color: "var(--text-secondary)" }}>
                      <strong className="block mb-1" style={{ color: "var(--text-primary)" }}>টিপস</strong>
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
                          className="scroll-mt-24"
                        />
                        <div className="flex items-start gap-3 mb-4 pl-2"
                          style={{ borderLeft: "2px solid var(--border)" }}>
                          <span
                            className="shrink-0 text-xs font-bold mt-1 tabular-nums"
                            style={{ color: "var(--text-muted)", minWidth: "2rem" }}
                          >
                            {sIdx + 1}.{subIdx + 1}
                          </span>
                          <h3 className="text-base font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                            {sub.title}
                          </h3>
                        </div>

                        {sub.image && (
                          <figure
                            className="mb-5 ml-8 overflow-hidden relative aspect-video"
                            style={{ border: "1px solid var(--border)", background: "var(--bg-surface-2)" }}
                          >
                            <Image
                              src={sub.image}
                              alt={sub.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </figure>
                        )}

                        <div className="text-[14px] ml-8">{renderContent(sub.content)}</div>

                        {/* Hint Box for Subsection */}
                        {sub.hint && (
                          <div className="mt-5 ml-8 p-4 rounded-xl flex gap-3 text-sm leading-relaxed"
                            style={{ background: "color-mix(in srgb, var(--accent) 5%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)" }}>
                            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                            <div style={{ color: "var(--text-secondary)" }}>
                              <strong className="block mb-1" style={{ color: "var(--text-primary)" }}>টিপস</strong>
                              {renderInline(sub.hint)}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {sIdx < sections.length - 1 && (
                  <div className="mt-14 h-px" style={{ background: "var(--border)" }} />
                )}
              </div>
            ))}
          </div>

          {/* End of Topic Questions & Quiz Start */}
          <div className="mt-20 max-w-2xl">
            {endQuestions.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5" style={{ color: "var(--accent)" }} />
                  <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
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

            <div className="p-8 rounded-2xl text-center flex flex-col items-center"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4"
                style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}>
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                অধ্যায় শেষ!
              </h3>
              <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                আপনি এই অধ্যায়ের থিওরি শিখেছেন। এবার কুইজ দিয়ে নিজের মেধা যাচাই করুন।
              </p>
              <Link
                href={`/forex/quiz?topic=${activeTopic}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all shadow-lg hover:opacity-90"
                style={{ background: "var(--accent)", boxShadow: "0 4px 16px color-mix(in srgb, var(--accent) 35%, transparent)" }}
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
