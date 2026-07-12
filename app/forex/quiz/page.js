import fs from "fs";
import path from "path";
import { QuizClient } from "../../components/QuizClient";

export default function ForexQuizPage({ searchParams }) {
  const topicSlug = searchParams.topic || "intro";

  try {
    const filePath = path.join(process.cwd(), "data", "forex", "quizzes", `${topicSlug}.json`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const quizData = JSON.parse(fileContents);

    return <QuizClient quizData={quizData} />;
  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center p-4 bg-primary text-content-primary">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            কুইজটি পাওয়া যায়নি
          </h1>
          <p className="text-sm text-content-secondary">
            সম্ভবত এই অধ্যায়ের জন্য এখনও কোনো কুইজ তৈরি করা হয়নি।
          </p>
        </div>
      </div>
    );
  }
}
