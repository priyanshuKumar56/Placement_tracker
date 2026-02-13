import React from 'react';

const features = [
  'REST and GraphQL endpoints',
  'Webhooks for real-time events',
  '99.99% Uptime SLA'
];

const DeveloperAPI: React.FC = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-24 flex flex-col lg:flex-row gap-16 items-center">
      <div className="w-full lg:w-1/2">
        <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-6 leading-tight">
          Built for builders.<br />
          <span className="text-zinc-500">Accessible by API.</span>
        </h2>
        <p className="text-zinc-400 text-lg font-light mb-8 max-w-lg">
          Fetch verified talent data, post programmatic job listings, or integrate Nexus badges into your own platform.
        </p>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 text-sm text-zinc-300">
              <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-10 flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors text-sm">
            Read Docs
          </button>
          <button className="bg-transparent border border-zinc-700 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-900 transition-colors text-sm">
            Generate Key
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="glass-card rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            <div className="ml-auto text-xs text-zinc-600 font-mono">job_search.js</div>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed code-syntax">
              <code>
                <span className="text-purple-400">const</span> <span className="text-blue-400">nexus</span> = <span className="text-purple-400">require</span>(<span className="text-green-400">&apos;@nexus/sdk&apos;</span>);
                {'\n\n'}
                <span className="text-zinc-500">// Find high-velocity opportunities</span>
                {'\n'}
                <span className="text-purple-400">const</span> <span className="text-blue-400">jobs</span> = <span className="text-purple-400">await</span> nexus.jobs.<span className="text-blue-300">search</span>({'{'}
                {'\n  '}
                <span className="text-orange-300">role</span>: <span className="text-green-400">&apos;Engineer&apos;</span>,
                {'\n  '}
                <span className="text-orange-300">stack</span>: [<span className="text-green-400">&apos;Rust&apos;</span>, <span className="text-green-400">&apos;Solana&apos;</span>],
                {'\n  '}
                <span className="text-orange-300">remote</span>: <span className="text-purple-400">true</span>,
                {'\n  '}
                <span className="text-orange-300">minSalary</span>: <span className="text-yellow-300">180000</span>
                {'\n'}{'}'});
                {'\n\n'}
                <span className="text-blue-300">console</span>.<span className="text-blue-300">log</span>(<span className="text-green-400">{`\`Found \${jobs.length} matches\``}</span>);
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperAPI;
