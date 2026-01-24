"use client";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define what a "Game Recommendation" looks like
interface GameRec {
  title: string;
  genre: string;
  description: string;
  vibeScore: number;
}

export default function GameBot() {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState<GameRec[]>([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
      );

      // Specialist Fix 1: Configure the model for JSON output directly
      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const prompt = `Suggest 5 video games based on this: "${input}". 
      Return an array of objects with keys: "title", "genre", "description", "vibeScore".`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log("Raw AI Response:", text); // Check this in F12 if it fails!

      // Specialist Fix 2: Bulletproof Parsing
      if (!text || text.trim().length === 0) {
        throw new Error("AI returned an empty response.");
      }

      // If responseMimeType is set to application/json,
      // Gemini usually skips the ```json wrapper entirely.
      const data = JSON.parse(text);
      setRecommendations(data);
    } catch (error) {
      console.error("Detailed Error:", error);
      alert(
        "The Gaming Oracle is confused. Check the console (F12) for details!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-blue-400 mb-2">
            GameScout AI
          </h1>
          <p className="text-slate-400 text-lg">
            Tell me what you like, and I will find your next game!
          </p>
        </header>

        <form onSubmit={getRecommendations} className="mb-12 flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. I love Elden Ring but want something cozy..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-6 py-3 rounded-lg font-bold transition whitespace-nowrap"
          >
            {loading ? "Searching..." : "Find Games"}
          </button>
        </form>

{loading ? (
  <div className="flex flex-col items-center justify-center py-20 animate-pulse">
    {/* Large custom spinner */}
    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
    <p className="text-blue-400 font-medium tracking-wide">Searching...</p>
  </div>
) : recommendations.length === 0 ? (
  <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl">
    <p className="text-slate-500">The Scout is waiting for your preferences...</p>
  </div>
) : (
  <div className="grid gap-6">
    {/* Your recommendations.map code goes here */}
  </div>
)}
        <div className="grid gap-6">
          {recommendations.map((game, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                    {game.title}
                  </h3>
                  <span className="bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded uppercase font-bold tracking-widest">
                    {game.genre}
                  </span>
                </div>
                <p className="text-slate-400 mb-4">{game.description}</p>

                {/* Vibe Bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-1000"
                      style={{ width: `${game.vibeScore * 10}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {game.vibeScore}/10
                  </span>
                </div>
              </div>

              {/* NEW: View on Steam Button */}
              <a
                href={`https://store.steampowered.com/search/?term=${encodeURIComponent(game.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white text-center py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <span>View on Steam</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
