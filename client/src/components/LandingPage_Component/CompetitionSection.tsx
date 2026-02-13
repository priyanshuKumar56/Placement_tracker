import React from 'react';
import Image from 'next/image';

const CompetitionSection: React.FC = () => {
  return (
    <section className="w-full h-[60vh] relative overflow-hidden my-16 group">
      <Image 
        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80" 
        alt="Conference"
        fill
        className="object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
      
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-[1600px] mx-auto w-full px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30 mb-6 backdrop-blur-md">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="1.5"/>
              </svg>
              Nexus Competitions
            </div>
            <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-6">
              Compete on a <br /> global stage.
            </h2>
            <p className="text-zinc-300 text-lg font-light mb-8 max-w-lg">
              Join 50,000+ developers in weekend hackathons. Build, ship, and get hired by the sponsors directly.
            </p>
            <a href="#" className="inline-flex items-center gap-3 text-white border-b border-white pb-1 hover:text-indigo-400 hover:border-indigo-400 transition-all">
              View Calendar 
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionSection;
