"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "./Navbar";
import { ArrowLeft, CheckCircle2, XCircle, RefreshCcw, ArrowRight } from "lucide-react";

export function QuizClient({ quizData }) {
  // state: answers = { [questionId]: selectedOptionIndex }
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (qId, optIdx) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    // Only submit if all questions are answered
    if (Object.keys(answers).length < quizData.questions.length) {
      alert("অনুগ্রহ করে সব প্রশ্নের উত্তর দিন।");
      return;
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetake = () => {
    setAnswers({});
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let score = 0;
  if (isSubmitted) {
    quizData.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <main className="max-w-3xl mx-auto py-8 md:py-10 px-4">
        {/* Back Link */}
        <Link
          href={`/forex?topic=${quizData.topicId}`}
          className="inline-flex items-center gap-2 mb-8 text-sm font-semibold transition-opacity hover:opacity-80 text-content-secondary hover:text-content-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          নোটস-এ ফিরে যান
        </Link>

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-2 text-accent">
            মেধা যাচাই
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-content-primary">
            {quizData.title}
          </h1>
          <p className="text-sm text-content-muted">
            {quizData.description}
          </p>
        </div>

        {/* Score Card (Shows only after submit) */}
        {isSubmitted && (
          <div className="mb-12 p-6 md:p-8 rounded-2xl text-center flex flex-col items-center bg-surface border border-border">
            <div className={`text-4xl md:text-5xl font-black mb-2 ${score === quizData.questions.length ? "text-green-500" : "text-accent"}`}>
              {score} <span className="text-2xl text-content-muted">/ {quizData.questions.length}</span>
            </div>
            <p className="text-sm font-medium mb-6 text-content-secondary">
              {score === quizData.questions.length ? "অসাধারণ! আপনি সব সঠিক উত্তর দিয়েছেন।" : "কিছু ভুল হয়েছে, নিচে ব্যাখ্যাগুলো দেখে নিন।"}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-surface-2 text-content-primary hover:bg-border"
              >
                <RefreshCcw className="w-4 h-4" />
                আবার চেষ্টা করুন
              </button>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-8">
          {quizData.questions.map((q, idx) => {
            const selectedIdx = answers[q.id];
            const isCorrect = selectedIdx === q.correctAnswer;

            return (
              <div key={q.id} className="p-5 md:p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-base md:text-lg font-bold mb-5 leading-relaxed text-content-primary">
                  <span className="text-accent">{idx + 1}. </span> {q.question}
                </h3>

                <div className="space-y-3">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedIdx === optIdx;
                    const isCorrectOption = optIdx === q.correctAnswer;

                    // Determine styling based on state
                    let buttonClasses = "bg-primary border-border text-content-secondary";
                    let icon = null;

                    if (isSubmitted) {
                      if (isCorrectOption) {
                        buttonClasses = "bg-green-500/10 border-green-500 text-content-primary";
                        icon = <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500" />;
                      } else if (isSelected && !isCorrectOption) {
                        buttonClasses = "bg-red-500/10 border-red-500 text-content-primary";
                        icon = <XCircle className="w-5 h-5 shrink-0 text-red-500" />;
                      }
                    } else {
                      if (isSelected) {
                        buttonClasses = "bg-accent/10 border-accent text-accent";
                      } else {
                        buttonClasses += " hover:border-accent/50 hover:bg-surface-2";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionSelect(q.id, optIdx)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-4 rounded-xl flex items-center justify-between gap-4 transition-all border-2 ${buttonClasses} ${isSubmitted ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <span className="font-medium text-sm leading-relaxed">{opt}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation (Shows after submit) */}
                {isSubmitted && (
                  <div className="mt-6 p-4 rounded-xl text-sm leading-relaxed bg-surface-2 border-l-4 border-accent">
                    <strong className="block mb-1 text-content-primary">ব্যাখ্যা:</strong>
                    <span className="text-content-secondary">{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="mt-12 text-center">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold transition-all shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed bg-accent shadow-accent/35 w-full sm:w-auto justify-center"
            >
              উত্তর জমা দিন
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Next Topic Button (Shows after submit) */}
        {isSubmitted && (
          <div className="mt-12 text-center border-t border-border pt-8">
            <Link
              href="/forex"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all bg-content-primary text-primary hover:opacity-90 w-full sm:w-auto justify-center"
            >
              পরবর্তী অধ্যায়ে যান
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
