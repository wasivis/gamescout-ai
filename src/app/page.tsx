"use client";
import { useState } from "react";
import Groq from "groq-sdk";

interface GameRec {
  title: string;
  genre: string;
  description: string;
  vibeScore: number;
  whyForYou: string;
}

export default function GameBot() {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState<GameRec[]>([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations([]);

    try {
      // We fetch from our internal API route instead of Groq directly
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }), // Pass the user input to the server
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await response.json();

      // The server already parsed the JSON for us
      const gamesArray = data.games || data;
      setRecommendations(gamesArray);
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("The backup Scout is also resting. Check your connection!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center animate-in fade-in duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-3">
            GameScout AI
          </h1>
          <p className="text-slate-400 text-lg italic">
            &quot;Just tell me what you&apos;re looking for!&quot;
          </p>
        </header>

        {/* Search Bar */}
        <form
          onSubmit={getRecommendations}
          className="mb-12 flex flex-col md:flex-row gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. I love Elden Ring but want something cozy..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition shadow-inner"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 cursor-pointer"
          >
            {loading ? "Analyzing..." : "Find Games"}
          </button>
        </form>

        {/* Content Area */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-6" />
              <p className="text-blue-400 font-medium animate-pulse">
                Consulting the digital archives...
              </p>
            </div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl animate-in fade-in zoom-in duration-500">
              <p className="text-slate-500 text-lg">
                No games found. Start by entering a preference above!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {recommendations.map((game, index) => (
                <div
                  key={index}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                  className="animate-card bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 transition-all group flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-blue-400 text-sm font-medium uppercase tracking-wider">
                        {game.genre}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-slate-700 group-hover:text-blue-500/20 transition-colors select-none">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-6">
                    {game.description}
                  </p>

                  {/* Vibe Meter */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-tighter">
                      <span>Match Vibe</span>
                      <span>{game.vibeScore * 10}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-[1500ms] delay-500"
                        style={{ width: `${game.vibeScore * 10}%` }}
                      />
                    </div>
                  </div>

                  {/* Specialist Reasoning */}
                  <div className="mb-6 p-4 bg-blue-500/5 border-l-4 border-blue-500 rounded-r-xl">
                    <p className="text-xs font-black text-blue-400 uppercase mb-1">
                      Scout&apos;s Note
                    </p>
                    <p className="text-sm text-slate-300 italic leading-snug">
                      {game.whyForYou}
                    </p>
                  </div>

                  <a
                    href={`https://store.steampowered.com/search/?term=${encodeURIComponent(game.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-slate-700 hover:bg-blue-600 text-white rounded-xl font-bold transition-all group/btn active:scale-[0.98]"
                  >
                    View on Steam
                    <svg
                      className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center gap-4 pb-10 border-t border-slate-800 pt-10">
        <p className="text-slate-500 text-sm font-medium">
          Found a great game? Consider supporting the scout!
        </p>
        <a
          href="https://ko-fi.com/wasivis"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-105 transition-transform duration-200"
        >
          <img
            height="36"
            style={{ border: "0px", height: "36px" }}
            src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </main>
  );
}
