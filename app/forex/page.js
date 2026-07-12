import fs from "fs";
import path from "path";
import { Suspense } from "react";
import { ForexPageClient } from "../components/ForexPageClient";

export const metadata = {
  title: "ফরেক্স ট্রেডিং | ট্রেডিং নোটস",
  description: "ফরেক্স ট্রেডিং সম্পর্কে বিস্তারিত শিখুন বাংলায়",
};

function loadAllTopics() {
  const indexPath = path.join(process.cwd(), "data", "forex", "index.json");
  const indexData = JSON.parse(fs.readFileSync(indexPath, "utf8"));

  return indexData.topics.map((topic) => {
    try {
      const topicPath = path.join(
        process.cwd(),
        "data",
        "forex",
        "topics",
        `${topic.slug}.json`
      );
      const data = JSON.parse(fs.readFileSync(topicPath, "utf8"));
      return { ...topic, ...data };
    } catch {
      return {
        ...topic,
        sections: [
          {
            id: "coming-soon",
            title: "শীঘ্রই আসছে",
            content: "এই অধ্যায়ের কন্টেন্ট খুব শীঘ্রই যুক্ত করা হবে।",
          },
        ],
      };
    }
  });
}

export default async function ForexPage({ searchParams }) {
  const params = await searchParams;
  const initialTopic = params?.topic || "intro";
  const allTopics = loadAllTopics();

  return (
    <Suspense>
      <ForexPageClient allTopics={allTopics} initialTopic={initialTopic} />
    </Suspense>
  );
}
