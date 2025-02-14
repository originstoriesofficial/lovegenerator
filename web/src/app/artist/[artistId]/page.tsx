"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { artists } from "@/lib/data";
import { fal } from "@fal-ai/client";
import { storeEmailInS3 } from "@/lib/aws";

fal.config({
  proxyUrl: "/api/fal",
});

export default function ArtistPage() {
  const router = useRouter();
  const params = useParams();
  const artistId = params.artistId as string;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [customAnswer, setCustomAnswer] = useState<string>("");
  const [falImage, setFalImage] = useState<string | null>(null);
  const [livepeerImage, setLivepeerImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSumbitLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<{url: string, method: string} | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

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

  const generateWithFal = async (prompt: string) => {
    try {
      const result = await fal.subscribe("110602490-lora", {
        input: {
          prompt,
          model_name: "stabilityai/stable-diffusion-xl-base-1.0",
          image_size: "square_hd",
        },
        pollInterval: 5000,
        logs: true,
        onQueueUpdate: (update) => {
          console.log("Queue update:", update);
        },
      });

      return result?.data?.images?.[0]?.url;
    } catch (error) {
      console.error("Error generating with Fal:", error);
      throw error;
    }
  };

  const generateWithLivepeer = async (prompt: string) => {
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
    return data?.images[0]?.url;
  };

  const generateBothImages = async () => {
    try {
      setLoading(true);
      const prompt = generatePrompt(answers);

      // Generate both images in parallel
      const [falUrl, livepeerUrl] = await Promise.all([
        generateWithFal(prompt),
        generateWithLivepeer(prompt)
      ]);

      setFalImage(falUrl);
      setLivepeerImage(livepeerUrl);
    } catch (error) {
      console.error("Error generating images:", error);
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
      generateBothImages();
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }
    if (!userEmail.trim()) {
      alert("Please enter your email address");
      return;
    }

    try {
      setSumbitLoading(true);
      const userId = artist?.title;
      const body = {
        userId,
        imageUrl: selectedImage.url,
        email: userEmail,
        generationMethod: selectedImage.method,
      };

      const response = await fetch("/api/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save image");
      }

      const data = await response.json();
      console.log(data, "s3 url");
      await storeEmailInS3(userEmail)
      router.push("/");
    } catch (error) {
      console.error("Error saving image:", error);
      router.push("/");
    } finally {
      setSumbitLoading(false);
    }
  };

  if (!artist || !artistQuestions.length) {
    return <LoadingState message="Artist not found!" />;
  }
  
  if (loading) {
    return <LoadingState message="Generating your unique artworks..." />;
  }
  
  if (submitLoading) {
    return <LoadingState message="Saving your image..." />;
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        {!falImage && !livepeerImage ? (
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
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-wide mb-3 md:mb-4">
              Choose Your Preferred Image
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fal.ai Image */}
              <div 
                className={`relative group cursor-pointer ${
                  selectedImage?.method === 'fal' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImage({ url: falImage!, method: 'fal' })}
              >
                <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded-full text-sm">
                  Fal.ai
                </div>
                <img
                  src={falImage!}
                  alt="Fal.ai Generated Art"
                  className="w-full aspect-square object-cover rounded-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              </div>

              {/* Livepeer Image */}
              <div 
                className={`relative group cursor-pointer ${
                  selectedImage?.method === 'livepeer' ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImage({ url: livepeerImage!, method: 'livepeer' })}
              >
                <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded-full text-sm">
                  Livepeer
                </div>
                <img
                  src={livepeerImage!}
                  alt="Livepeer Generated Art"
                  className="w-full aspect-square object-cover rounded-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              </div>
            </div>

            {selectedImage && (
              <div className="space-y-4">
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-4 sm:p-5 md:p-6 text-sm sm:text-base bg-black text-white placeholder-zinc-500 border border-zinc-800 focus:border-zinc-700 outline-none rounded-sm transition-all tracking-wide"
                  required
                />
                <button
                  onClick={handleSubmit}
                  className="w-full p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-sm transition-all text-zinc-300 hover:text-white tracking-wider group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Save Selected Image & Return Home</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const LoadingState = ({ message }: { message: string }) => (
  <div className="min-h-screen flex flex-col gap-3 sm:gap-4 items-center justify-center bg-black text-white">
    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
    <p className="text-sm sm:text-base">{message}</p>
  </div>
);