import React from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  icon: string;
  iconBg: string;
  skills: string[];
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Product Engineer',
    company: 'Figma',
    location: 'Remote',
    salary: '$180k - $240k',
    icon: 'figma',
    iconBg: 'bg-white',
    skills: ['React', 'WebGL', 'Rust']
  },
  {
    id: '2',
    title: 'AI Researcher',
    company: 'RiseUp Labs',
    location: 'San Francisco',
    salary: '$200k+',
    icon: 'atom',
    iconBg: 'bg-black border border-zinc-700',
    skills: ['Python', 'PyTorch']
  },
  {
    id: '3',
    title: 'Frontend Architect',
    company: 'Linear',
    location: 'Remote',
    salary: '$160k - $210k',
    icon: 'linear',
    iconBg: 'bg-indigo-600',
    skills: ['TypeScript', 'Vue']
  }
];

const CuratedRoles: React.FC = () => {
  return (
    <section id="jobs" className="max-w-[1600px] mx-auto px-4 md:px-8 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-3xl text-white font-medium tracking-tight mb-2">Curated Roles</h2>
          <p className="text-zinc-500 text-sm">Selected by AI based on your skill stack.</p>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-zinc-800 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-full border border-zinc-800 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="glass-card p-6 rounded-2xl group glass-card-hover transition-colors cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M7 17L17 7M17 7H7M17 7v10" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className={`w-12 h-12 ${job.iconBg} rounded-lg flex items-center justify-center mb-6 text-${job.iconBg === 'bg-white' ? 'black' : 'white'} text-xl font-bold`}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="mb-8">
              <h3 className="text-lg text-white font-medium mb-1">{job.title}</h3>
              <p className="text-zinc-500 text-sm">
                {job.company} • {job.location} • {job.salary}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-[10px] text-zinc-400 border border-zinc-800 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CuratedRoles;
