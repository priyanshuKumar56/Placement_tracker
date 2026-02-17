'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';

export default function HackathonsView() {
  return (
    <div className="view-section space-y-8 max-w-[1400px] mx-auto">
      {/* Featured Banner */}
      <div className="glass-panel rounded-2xl overflow-hidden relative min-h-[300px] flex items-end p-8 border border-indigo-500/30">
        <Image
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop"
          alt="Hackathon"
          fill
          className="object-cover opacity-40 mix-blend-color-dodge"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30 mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            Live Now
          </div>
          <h2 className="text-4xl font-medium text-white tracking-tight mb-2">
            RiseUp Global Summit &apos;24
          </h2>
          <p className="text-zinc-300 max-w-xl mb-6">
            Join 10,000+ developers building the future of decentralized finance. $250k in prizes.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-zinc-200 transition-colors">
              Register Now
            </button>
            <button className="bg-black/50 backdrop-blur border border-white/10 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Hackathon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HackathonCard
          image="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=500&q=80"
          title="Solana Summer Camp"
          category="Web3"
          participants={500}
          deadline="2 Days Left"
          progress={75}
        />
        <HackathonCard
          image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=80"
          title="CyberSecurity CTF"
          category="Security"
          participants={120}
          deadline="Starts in 5d"
          isUpcoming
        />
      </div>
    </div>
  );
}

interface HackathonCardProps {
  image: string;
  title: string;
  category: string;
  participants: number;
  deadline: string;
  progress?: number;
  isUpcoming?: boolean;
}

function HackathonCard({
  image,
  title,
  category,
  participants,
  deadline,
  progress,
  isUpcoming,
}: HackathonCardProps) {
  return (
    <div className="glass-panel p-6 rounded-xl hover:bg-white/[0.02] transition-all cursor-pointer">
      <div className="h-32 bg-zinc-800 rounded-lg mb-4 relative overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover opacity-60" />
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] text-white">
          {deadline}
        </div>
      </div>
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-xs text-zinc-500 mb-4">
        {category} • {participants} {isUpcoming ? 'Teams' : 'Participants'}
      </p>
      {progress !== undefined ? (
        <>
          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="mt-2 text-[10px] text-zinc-400 flex justify-between">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
        </>
      ) : (
        <button className="w-full py-2 border border-zinc-700 rounded text-xs text-white hover:bg-white/5 transition-colors">
          Register Team
        </button>
      )}
    </div>
  );
}
