import React from 'react';
import Image from 'next/image';

interface Feature {
  id: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: '001',
    title: 'Dynamic Portfolio',
    description: 'Automatically syncs with GitHub to showcase your real contributions.'
  },
  {
    id: '002',
    title: 'Skill Verification',
    description: 'Earn badges through proctored micro-challenges.'
  },
  {
    id: '003',
    title: 'Talent Graphs',
    description: 'Visualise your growth against the global engineer index.'
  }
];

const DigitalSignature: React.FC = () => {
  return (
    <section id="explore" className="max-w-[1600px] mx-auto px-4 md:px-8 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div className="relative">
          <div className="absolute -left-12 -top-12 text-[12rem] font-bold text-zinc-900 leading-none select-none z-0">
            01
          </div>
          <h2 className="text-5xl md:text-6xl font-medium text-white tracking-tight leading-[1.1] relative z-10 mb-8">
            Define your <br />
            <span className="text-zinc-500">digital signature.</span>
          </h2>
          <div className="space-y-8 relative z-10 pl-2 border-l border-zinc-800">
            {features.map((feature) => (
              <div key={feature.id} className="group cursor-pointer">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-zinc-500 font-mono text-xs">{feature.id}</span>
                  <h3 className="text-xl text-white group-hover:translate-x-2 transition-transform">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-500 max-w-sm ml-10">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Complex Image Composition */}
        <div className="relative h-[600px] w-full">
          {/* Back Image */}
          <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80" 
              alt="Code editor"
              fill
              className="object-cover opacity-60"
            />
          </div>
          
          {/* Front Glass Overlay */}
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 glass-card rounded-[2rem] border-t border-l border-white/20 p-8 z-10 flex flex-col justify-between backdrop-blur-xl">
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="1.5"/>
                  <circle cx="12" cy="7" r="4" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-full border border-green-500/20 uppercase tracking-wide">
                Available
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-2 w-12 bg-white/20 rounded-full"></div>
              <div className="h-8 w-full bg-white/5 rounded flex items-center px-3 gap-3">
                <div className="w-4 h-4 rounded-full bg-zinc-600"></div>
                <div className="h-1 w-16 bg-zinc-700 rounded-full"></div>
              </div>
              <div className="h-8 w-full bg-white/5 rounded flex items-center px-3 gap-3">
                <div className="w-4 h-4 rounded-full bg-zinc-600"></div>
                <div className="h-1 w-24 bg-zinc-700 rounded-full"></div>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-zinc-400">Profile Strength</span>
                <span className="text-xs text-white font-mono">98%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DigitalSignature;
