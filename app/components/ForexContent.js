import Image from "next/image";
import { Pagination } from "./Pagination";

function parseContent(content) {
  const lines = content.split("\n");
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 mb-4 space-y-1.5 text-slate-700 dark:text-slate-300">
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, idx) => {
    if (!line.trim()) {
      flushList();
      elements.push(<br key={`br-${idx}`} />);
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(renderInline(line.substring(2)));
      return;
    }

    flushList();

    elements.push(
      <p key={`p-${idx}`} className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
        {renderInline(line)}
      </p>
    );
  });

  flushList();
  return elements;
}

function renderInline(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-slate-900 dark:text-slate-100">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export function ForexContent({ topicData, currentIndex, prevTopic, nextTopic }) {
  return (
    <article className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 md:p-10 shadow-sm">
      <header className="mb-8">
        <div className="text-sm font-semibold text-blue-500 dark:text-blue-400 mb-2 tracking-wide">
          অধ্যায় {currentIndex + 1}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
          {topicData.title}
        </h1>
      </header>

      {topicData.image && (
        <figure className="mb-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative aspect-video bg-slate-100 dark:bg-slate-700">
          <Image
            src={topicData.image}
            alt={topicData.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
          {topicData.imageCaption && (
            <figcaption className="absolute bottom-0 left-0 right-0 bg-slate-900/70 backdrop-blur-sm text-white/90 text-sm px-4 py-3">
              {topicData.imageCaption}
            </figcaption>
          )}
        </figure>
      )}

      <div className="text-base leading-8">{parseContent(topicData.content)}</div>

      <Pagination prevTopic={prevTopic} nextTopic={nextTopic} moduleSlug="forex" />
    </article>
  );
}
