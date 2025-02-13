"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { artists } from "@/lib/data";

export default function ArtistPage() {
  const router = useRouter();
  const params = useParams();
  const artistId = params.artistId as string;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [customAnswer, setCustomAnswer] = useState<string>("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSumbitLoading] = useState<boolean>(false);

  const artist = artists.find((a) => a.id == Number(artistId));
  const artistQuestions = artist?.questions || [];

  const generatePrompt = (answers: string[]) => {
    if (!artist) return "";

    const template = artist.ai_prompt_template;
    const filledPrompt = template
      .replace("{scene}", answers[0] || "")
      .replace("{cosmic_detail}", answers[1] || "")
      .replace("{lovers_presence}", answers[2] || "");

    return filledPrompt;
  };

  const fetchGeneratedImage = async (answers: string[]) => {
    try {
      setLoading(true);
      const prompt = generatePrompt(answers);

      const response = await fetch("/api/livepeer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setGeneratedImage(data?.images[0]?.url || null);
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

  const handleSubmit = async () => {
    try {
      setSumbitLoading(true);
      const userId = artist?.title;
      const body = {
        userId,
        imageUrl: generatedImage,
      };

      const response = await fetch("/api/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      console.log(data,"s3 url");
      router.push("/");
    } catch (error) {
      console.error("Error fetching generated image:", error);
      router.push("/");
    } finally {
      setSumbitLoading(false);
    }
 
  };

  if (!artist || !artistQuestions.length) {
    return <LoadingState message="Artist not found!" />;
  }
  
  if (loading) {
    return <LoadingState message="Generating your unique artwork..." />;
  }
  
  if (submitLoading) {
    return <LoadingState message="Saving your image..." />;
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        {!generatedImage ? (
          <div className="relative">
            <div className="absolute -top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
            <div className="bg-zinc-950 p-6 sm:p-8 md:p-12 border border-zinc-800">
              <div className="mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl font-medium tracking-wide mb-3 md:mb-4">
                  {artistQuestions[currentQuestion].question}
                </h2>
                <div className="h-px w-16 sm:w-24 bg-zinc-800"></div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {artistQuestions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 sm:p-5 md:p-6 text-left rounded-sm bg-black hover:bg-zinc-900 transition-all duration-300 border border-zinc-800 hover:border-zinc-700 group relative overflow-hidden"
                  >
                    <span className="relative z-10 text-sm sm:text-base text-zinc-300 group-hover:text-white transition-colors tracking-wide">
                      {option}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}

                {artistQuestions[currentQuestion].custom_option && (
                  <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                    <input
                      type="text"
                      value={customAnswer}
                      onChange={(e) => setCustomAnswer(e.target.value)}
                      placeholder="Write your own..."
                      className="w-full p-4 sm:p-5 md:p-6 text-sm sm:text-base bg-black text-white placeholder-zinc-500 border border-zinc-800 focus:border-zinc-700 outline-none rounded-sm transition-all tracking-wide"
                    />
                    <button
                      onClick={() => handleAnswer(customAnswer)}
                      disabled={!customAnswer.trim()}
                      className="w-full p-4 sm:p-5 md:p-6 text-sm sm:text-base bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-sm transition-all text-zinc-300 hover:text-white tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Custom Answer
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div className="relative group max-w-[280px] sm:max-w-[400px] md:max-w-[500px] mx-auto">
              <img
                src={generatedImage}
                alt="Generated Art"
                className="w-full aspect-[9/16] object-cover rounded-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full p-4 sm:p-5 md:p-6 text-sm sm:text-base bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-sm transition-all text-zinc-300 hover:text-white tracking-wider group relative overflow-hidden"
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

// Loading states components
const LoadingState = ({ message }: { message: string }) => (
  <div className="min-h-screen flex flex-col gap-3 sm:gap-4 items-center justify-center bg-black text-white">
    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
    <p className="text-sm sm:text-base">{message}</p>
  </div>
);


