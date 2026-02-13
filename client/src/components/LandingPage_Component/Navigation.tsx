import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto">
      <div className="glass-card px-2 p-2 rounded-full flex items-center gap-1 shadow-2xl shadow-black/50">
        <a 
          href="#" 
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="4" strokeWidth="1.5"/>
            <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeWidth="1.5"/>
          </svg>
        </a>
        
        <div className="h-6 w-px bg-white/10 mx-1"></div>
        
        <a 
          href="#features" 
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors" 
          title="Features"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M2 6h20M2 12h20M2 18h20" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
        
        <a 
          href="#explore" 
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors" 
          title="Explore"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
            <path d="M8 14l4-8 4 8-4-2-4 2z" strokeWidth="1.5"/>
          </svg>
        </a>
        
        <a 
          href="#jobs" 
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors" 
          title="Jobs"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="7" width="18" height="14" rx="2" strokeWidth="1.5"/>
            <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="1.5"/>
          </svg>
        </a>
        
        <a 
          href="#pricing" 
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors" 
          title="Pricing"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="1.5"/>
          </svg>
        </a>
        
        <div className="h-6 w-px bg-white/10 mx-1"></div>
        
        <a 
          href="#" 
          className="px-4 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white text-sm font-medium transition-colors"
        >
          Log in
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
