'use client';

import { Icon } from '@iconify/react';

export default function JobsView() {
  return (
    <div className="view-section space-y-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-tight mb-1">
            Explore Opportunities
          </h1>
          <p className="text-zinc-500">Based on your skills in React, TypeScript, and Design.</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0 hidden lg:block space-y-8">
          <FilterSection title="Job Type">
            <FilterCheckbox label="Full-time" defaultChecked />
            <FilterCheckbox label="Internship" />
            <FilterCheckbox label="Contract" />
          </FilterSection>

          <FilterSection title="Location">
            <FilterCheckbox label="Remote" defaultChecked />
            <FilterCheckbox label="United States" />
            <FilterCheckbox label="Europe" />
          </FilterSection>

          <div>
            <h3 className="text-sm font-medium text-white mb-3">Salary Range</h3>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <input
                type="text"
                defaultValue="$50k"
                className="w-20 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-center"
              />
              <span>-</span>
              <input
                type="text"
                defaultValue="$250k"
                className="w-20 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-center"
              />
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="flex-1 space-y-4">
          <JobCard
            icon="solar:figma-file-linear"
            iconBg="bg-white"
            iconColor="text-black"
            title="Senior Product Engineer"
            company="Figma"
            team="Design Systems Team"
            salary="$180k - $240k"
            tags={['Remote', 'React', 'TypeScript']}
            posted="2 days ago"
            applicants={150}
          />

          <JobCard
            icon="solar:shield-keyhole-linear"
            iconBg="bg-[#000000] border border-zinc-700"
            iconColor="text-white"
            title="Security Engineer"
            company="Auth0"
            team="Security Infrastructure"
            salary="$160k - $210k"
            tags={['Hybrid', 'Go', 'Cryptography']}
            posted="5 hours ago"
            applicants={45}
          />
        </div>
      </div>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-white mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

interface FilterCheckboxProps {
  label: string;
  defaultChecked?: boolean;
}

function FilterCheckbox({ label, defaultChecked }: FilterCheckboxProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="accent-indigo-500 w-4 h-4 rounded border-zinc-700 bg-zinc-900"
      />
      {label}
    </label>
  );
}

interface JobCardProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  company: string;
  team: string;
  salary: string;
  tags: string[];
  posted: string;
  applicants: number;
}

function JobCard({
  icon,
  iconBg,
  iconColor,
  title,
  company,
  team,
  salary,
  tags,
  posted,
  applicants,
}: JobCardProps) {
  return (
    <div className="glass-panel p-6 rounded-xl flex gap-6 hover:border-white/20 transition-colors group cursor-pointer">
      <div className={`w-14 h-14 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} text-3xl flex-shrink-0`}>
        <Icon icon={icon} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-zinc-400">
              {company} • {team}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white font-medium">{salary}</span>
            <button className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800">
              <Icon icon="solar:bookmark-linear" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-xs text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="text-xs text-zinc-500">
            Posted {posted} • {applicants} applicants
          </div>
          <button className="text-xs font-medium text-white hover:underline flex items-center gap-1">
            Quick Apply <Icon icon="solar:arrow-right-linear" />
          </button>
        </div>
      </div>
    </div>
  );
}
