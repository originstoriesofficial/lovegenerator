"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { img, questions } from "@/lib/data";

export default function ArtistPage() {
  const router = useRouter();
  const params = useParams();
  const artistId = params.artistId as string; // Ensure it's a string
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [customAnswer, setCustomAnswer] = useState<string>("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const artistQuestions = questions[artistId] || [];

  const fetchGeneratedImage = async (answers: string[]) => {
    try {
      setLoading(true);
      const response = await fetch("/api/livepeer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      console.log({ data });
      setGeneratedImage(data?.images[0]?.url || img);
    } catch (error) {
      console.error("Error fetching generated image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string): void => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < artistQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      fetchGeneratedImage(newAnswers);
    }
  };

  const handleSubmit = (): void => {
    router.push("/");
  };

  if (!artistQuestions.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
        <p>Fetching questins!!</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
        <p>Generating image...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-8">
      <div className="max-w-3xl mx-auto">
        {!generatedImage ? (
          <div className="relative">
            <div className="absolute -top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
            <div className="bg-zinc-950 p-12 border border-zinc-800">
              <div className="mb-12">
                <h2 className="text-3xl font-medium tracking-wide mb-4">
                  {artistQuestions[currentQuestion].question}
                </h2>
                <div className="h-px w-24 bg-zinc-800"></div>
              </div>

              <div className="space-y-3">
                {artistQuestions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-6 text-left rounded-sm bg-black hover:bg-zinc-900 transition-all duration-300 border border-zinc-800 hover:border-zinc-700 group relative overflow-hidden"
                  >
                    <span className="relative z-10 text-zinc-300 group-hover:text-white transition-colors tracking-wide">
                      {option}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>

              {artistQuestions[currentQuestion].allowCustom && (
                <div className="mt-8 space-y-4">
                  <input
                    type="text"
                    value={customAnswer}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                    placeholder="Enter your custom answer..."
                    className="w-full p-6 bg-black text-white placeholder-zinc-500 border border-zinc-800 focus:border-zinc-700 outline-none rounded-sm transition-all tracking-wide"
                  />
                  <button
                    onClick={() => handleAnswer(customAnswer)}
                    className="w-full p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-sm transition-all text-zinc-300 hover:text-white tracking-wide"
                  >
                    Submit Custom Answer
                  </button>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="relative group">
              <img
                src={generatedImage}
                alt="Generated Art"
                className="w-full aspect-video object-cover rounded-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-sm transition-all text-zinc-300 hover:text-white tracking-wider group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Save & Return Home</span>
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
