import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <main className="min-h-screen w-full p-4 md:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 grid-rows-[auto_auto] gap-4 max-w-[1600px] mx-auto pt-8 pb-32">
      {/* Header / Logo Area */}
      <div className="col-span-1 md:col-span-12 flex justify-between items-center mb-8 px-2">
        <div className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
          Nexus Interface v2.0
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-white border border-white/10 px-3 py-1 rounded-full bg-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Operational
        </div>
      </div>

      {/* Hero Main Block */}
      <div className="col-span-1 md:col-span-8 lg:col-span-8 row-span-2 glass-card rounded-[2rem] p-8 md:p-16 flex flex-col justify-between relative overflow-hidden group">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-[0.08]">
          <Image
            src="https://images.indianexpress.com/2025/07/Big-Tech-Layoff-AI.jpg?w=1200"
            alt="Tech Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-white leading-[0.9] mb-8 text-glow">
            Career <br />
            <span className="text-zinc-600 group-hover:text-white transition-colors duration-700">
              Velocity
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-md font-light leading-relaxed">
            The non-linear path to technical excellence. Connect with elite opportunities, global hackathons, and high-velocity teams.
          </p>
        </div>

        <div className="relative z-10 mt-12 flex items-center gap-6">
          <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2">
            Start Engine
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M7 17L17 7M17 7H7M17 7v10" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex -space-x-4">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="User"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-black object-cover grayscale hover:grayscale-0 transition-all"
            />
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
              alt="User"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-black object-cover grayscale hover:grayscale-0 transition-all"
            />
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
              alt="User"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-black object-cover grayscale hover:grayscale-0 transition-all"
            />
            <div className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-white text-xs font-medium">
              +2k
            </div>
          </div>
        </div>
      </div>

      {/* Hero Visual Block */}
      <div className="col-span-1 md:col-span-4 lg:col-span-4 h-[400px] md:h-auto glass-card rounded-[2rem] overflow-hidden relative group">
        <img
          src="https://s3-alpha.figma.com/hub/file/6185520417/71c73053-ed50-4620-b71f-0460a303278a-cover.png"
          alt="Server room abstract"
          width={800}
          height={400}
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-8 left-8">
          <div className="flex items-center gap-2 text-white mb-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path d="M8 12h8M12 8v8" strokeWidth="1.5" />
            </svg>
            <span className="font-medium tracking-tight">Live Hackathon</span>
          </div>
          <p className="text-sm text-zinc-400">Global AI Summit 2024</p>
          <div className="mt-4 flex gap-2">
            <span className="px-2 py-1 bg-white/10 border border-white/10 rounded text-[10px] text-white uppercase tracking-wider">
              Processing
            </span>
            <span className="px-2 py-1 bg-white/10 border border-white/10 rounded text-[10px] text-white uppercase tracking-wider">
              Remote
            </span>
          </div>
        </div>
      </div>

      {/* Stats Block */}
      <div className="col-span-1 md:col-span-4 glass-card rounded-[2rem] p-8 flex flex-col justify-center">
        <div className="text-5xl font-light text-white mb-2 tracking-tight">1.5M+</div>
        <div className="text-sm text-zinc-500 uppercase tracking-widest">Opportunities Matched</div>
        <div className="mt-6 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-white w-2/3"></div>
        </div>
      </div>

      {/* Video/Visual Block */}
      <div className="col-span-1 md:col-span-4 glass-card rounded-[2rem] overflow-hidden relative group min-h-[200px]">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
          alt="Team collaboration"
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
            <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-4 left-6 text-xs text-white uppercase tracking-widest">
          Team Dynamics
        </div>
      </div>

      {/* Feature List Block */}
      <div className="col-span-1 md:col-span-4 glass-card rounded-[2rem] p-8 flex flex-col justify-between bg-zinc-900/50">
        <div className="flex justify-between items-start mb-6">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="w-5 h-5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 17L17 7M17 7H7M17 7v10" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl text-white font-medium mb-2">Instant Apply</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            One-click applications to 500+ YC startups and Fortune 500 tech giants.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Hero;
