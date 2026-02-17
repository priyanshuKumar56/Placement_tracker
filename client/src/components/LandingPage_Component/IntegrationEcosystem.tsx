import React, { JSX } from 'react';

interface Integration {
  title: string;
  description: string;
  icon: JSX.Element;
}

const integrations: Integration[] = [
  {
    title: 'Source Control',
    description: 'Automatic PR scanning to verify technical depth and code quality metrics.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Communication',
    description: 'Integration with Slack & Discord for instant job alerts and team matching.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Deployment',
    description: 'Showcase live projects via Vercel & Netlify integration directly on profile.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="2" y="2" width="20" height="8" rx="2" strokeWidth="1.5" />
        <rect x="2" y="14" width="20" height="8" rx="2" strokeWidth="1.5" />
        <path d="M6 6h.01M6 18h.01" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
];

const IntegrationEcosystem: React.FC = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-24 border-t border-white/5">
      <div className="glass-card rounded-[2.5rem] p-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 mb-6">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Workflow Sync
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Connect your entire stack
          </h2>
          <p className="text-zinc-400 text-lg font-light max-w-xl">
            Import contributions from anywhere. RiseUp unifies your digital footprint into a single verifiable identity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {integration.icon}
              </div>
              <h3 className="text-white font-medium mb-2">{integration.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {integration.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationEcosystem;
