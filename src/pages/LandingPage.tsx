import React from "react";
import { ChevronRight, Trophy, Brain, Swords } from "lucide-react";
import { Link } from "react-router";

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide">
          ♟ Chess<span className="text-green-500">Arena</span>
        </h1>



        <div className="flex items-center gap-5">
            <a href="https://github.com/sahiladit" className="text-gray-300 hover:text-white transition" target="_blank" rel="noopener noreferrer">
           Docs
          </a>
          <button className="text-gray-300 hover:text-white transition">
            Login
          </button>

          <button className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl font-semibold transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-6xl font-extrabold leading-tight">
            Play Chess.
            <br />
            Improve Every Move.
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            Challenge players worldwide, analyze games instantly, solve puzzles,
            and sharpen your strategy with a beautiful real-time chess
            experience.
          </p>

          <div className="mt-10 flex gap-5">
            <Link to="/game" className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl flex items-center gap-2 font-semibold transition">
              Start Playing
              <ChevronRight size={20} />
            </Link>

            <button className="border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-xl">
              Learn More
            </button>
          </div>

          <div className="mt-12 flex gap-12">
            <div>
              <h2 className="text-3xl font-bold">69+</h2>
              <p className="text-gray-400">Games Played</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">69</h2>
              <p className="text-gray-400">Players Online</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">69%</h2>
              <p className="text-gray-400">Fair Play</p>
            </div>
          </div>
        </div>

        {/* Chess Board Preview */}
        <div className="flex justify-center">
          <div className="grid grid-cols-8 shadow-2xl rounded-xl overflow-hidden border border-gray-700">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`w-16 h-16 ${
                  (Math.floor(i / 8) + i) % 2 === 0
                    ? "bg-[#f0d9b5]"
                    : "bg-[#b58863]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Play Here?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition">
            <Swords size={42} className="text-green-500 mb-5" />

            <h3 className="text-2xl font-semibold mb-4">
              Play Online
            </h3>

            <p className="text-gray-400">
              Match with players worldwide in real-time games with low latency.
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition">
            <Brain size={42} className="text-green-500 mb-5" />

            <h3 className="text-2xl font-semibold mb-4">
              Analyze Games
            </h3>

            <p className="text-gray-400">
              Review every move and discover better continuations instantly.
            </p>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 hover:border-green-500 transition">
            <Trophy size={42} className="text-green-500 mb-5" />

            <h3 className="text-2xl font-semibold mb-4">
              Climb Rankings
            </h3>

            <p className="text-gray-400">
              Earn rating points, unlock achievements and compete globally.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between text-gray-500">
          <p>© Sahil Adit</p>

          <p>Don't play Chess</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;