'use client';

import { Icon } from '@iconify/react';

export default function DashboardView() {
  return (
    <div className="view-section space-y-8 max-w-[1400px] mx-auto">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-medium text-white tracking-tight mb-1">
            Good morning, Alex.
          </h1>
          <p className="text-zinc-500">Here&apos;s what&apos;s happening with your applications today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-black rounded-lg text-xs font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2">
            <Icon icon="solar:file-download-linear" />
            Resume
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Icon icon="solar:plain-linear" className="text-xl" />
            </div>
            <span className="text-emerald-400 text-xs flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              <Icon icon="solar:arrow-right-up-linear" />
              +12%
            </span>
          </div>
          <div className="text-2xl font-semibold text-white mb-1">14</div>
          <div className="text-xs text-zinc-500">Active Applications</div>
        </div>

        <div className="glass-panel p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <Icon icon="solar:eye-linear" className="text-xl" />
            </div>
            <span className="text-zinc-500 text-xs">Last 7 days</span>
          </div>
          <div className="text-2xl font-semibold text-white mb-1">84</div>
          <div className="text-xs text-zinc-500">Profile Views</div>
        </div>

        <div className="glass-panel p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <Icon icon="solar:cup-star-linear" className="text-xl" />
            </div>
            <span className="text-zinc-500 text-xs">Next: 2 days</span>
          </div>
          <div className="text-2xl font-semibold text-white mb-1">3</div>
          <div className="text-xs text-zinc-500">Upcoming Hackathons</div>
        </div>

        <div className="glass-panel p-5 rounded-xl border-l-4 border-l-emerald-500 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 blur-[40px] pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Icon icon="solar:chat-round-line-linear" className="text-xl" />
            </div>
            <span className="text-emerald-400 text-xs">Action required</span>
          </div>
          <div className="text-2xl font-semibold text-white mb-1">1</div>
          <div className="text-xs text-zinc-500">Interview Request</div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Feed Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Recommended for you</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800 text-xs text-white">
                All
              </button>
              <button className="px-3 py-1.5 rounded-full border border-transparent hover:bg-zinc-800 text-xs text-zinc-500 transition-colors">
                Jobs
              </button>
              <button className="px-3 py-1.5 rounded-full border border-transparent hover:bg-zinc-800 text-xs text-zinc-500 transition-colors">
                Competitions
              </button>
            </div>
          </div>

          {/* Recommendation Cards */}
          <RecommendationCard
            icon="solar:figma-file-linear"
            iconBg="bg-white"
            iconColor="text-black"
            title="Product Engineer"
            badge="New"
            badgeColor="bg-indigo-500/20 text-indigo-300 border-indigo-500/20"
            company="Figma"
            location="San Francisco (Hybrid)"
            salary="$160k - $240k"
            tags={['React', 'WebGL', 'C++']}
            applicants={12}
            posted="2h ago"
          />

          <RecommendationCard
            icon="solar:code-circle-linear"
            iconBg="bg-black border border-zinc-700"
            iconColor="text-white"
            title="Global AI Hackathon 2024"
            badge="Featured"
            badgeColor="bg-amber-500/20 text-amber-300 border-amber-500/20"
            company="Hosted by OpenAI & Microsoft"
            location="Virtual"
            tags={['$50,000 Prize Pool', 'All Levels']}
            participants={2403}
            endsIn="4 days"
          />

          <RecommendationCard
            icon="solar:plain-linear"
            iconBg="bg-[#6366F1]"
            iconColor="text-white"
            title="Frontend Developer"
            company="Linear"
            location="Remote"
            salary="$140k - $190k"
            tags={['TypeScript', 'Vue']}
            applicants={45}
            posted="5h ago"
          />
        </div>

        {/* Right Column: Sidebar Widgets */}
        <div className="space-y-6">
          {/* Profile Strength */}
          <div className="glass-panel p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">Profile Strength</h3>
              <span className="text-emerald-400 font-mono text-sm">85%</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full mb-4 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-400 opacity-50 line-through">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs">
                  <Icon icon="solar:check-read-linear" />
                </div>
                Upload Resume
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400 opacity-50 line-through">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs">
                  <Icon icon="solar:check-read-linear" />
                </div>
                Verify GitHub
              </div>
              <div className="flex items-center gap-3 text-sm text-white group cursor-pointer">
                <div className="w-5 h-5 rounded-full border border-zinc-600 flex items-center justify-center text-zinc-400 text-xs group-hover:border-white group-hover:text-white transition-colors">
                  <Icon icon="solar:add-linear" />
                </div>
                Add Video Intro
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="font-medium text-white mb-4">Upcoming Deadlines</h3>
            <div className="space-y-4">
              <DeadlineItem date="24" month="OCT" title="Stripe Application" subtitle="Backend Engineer Role" />
              <DeadlineItem date="28" month="OCT" title="Hackathon Submission" subtitle="Global AI Summit" />
            </div>
            <button className="w-full mt-4 py-2 border border-zinc-700 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RecommendationCardProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  company: string;
  location: string;
  salary?: string;
  tags: string[];
  applicants?: number;
  participants?: number;
  posted?: string;
  endsIn?: string;
}

function RecommendationCard({
  icon,
  iconBg,
  iconColor,
  title,
  badge,
  badgeColor,
  company,
  location,
  salary,
  tags,
  applicants,
  participants,
  posted,
  endsIn,
}: RecommendationCardProps) {
  return (
    <div className="glass-panel p-6 rounded-xl group hover:bg-white/[0.02] transition-colors cursor-pointer relative">
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon icon="solar:arrow-right-up-linear" className="text-white text-xl" />
      </div>
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} text-2xl flex-shrink-0`}>
          <Icon icon={icon} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-white">{title}</h3>
            {badge && (
              <span className={`px-2 py-0.5 rounded text-[10px] border ${badgeColor}`}>{badge}</span>
            )}
          </div>
          <p className="text-sm text-zinc-400 mb-3">
            {company} • {location} {salary && `• ${salary}`}
          </p>
          <div className="flex gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="text-[10px] px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            {endsIn && (
              <span className="flex items-center gap-1 text-orange-400">
                <Icon icon="solar:fire-linear" />
                Ends in {endsIn}
              </span>
            )}
            {applicants !== undefined && (
              <span className="flex items-center gap-1">
                <Icon icon="solar:users-group-rounded-linear" />
                {applicants} applicants
              </span>
            )}
            {participants !== undefined && (
              <span className="flex items-center gap-1">
                <Icon icon="solar:users-group-rounded-linear" />
                {participants} participants
              </span>
            )}
            {posted && (
              <span className="flex items-center gap-1">
                <Icon icon="solar:clock-circle-linear" />
                Posted {posted}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DeadlineItemProps {
  date: string;
  month: string;
  title: string;
  subtitle: string;
}

function DeadlineItem({ date, month, title, subtitle }: DeadlineItemProps) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-b-0">
      <div className="w-10 h-10 rounded bg-zinc-800 flex flex-col items-center justify-center text-[10px] text-zinc-400 flex-shrink-0">
        <span className="text-white font-bold text-sm">{date}</span>
        {month}
      </div>
      <div>
        <div className="text-sm text-white font-medium mb-0.5">{title}</div>
        <div className="text-xs text-zinc-500">{subtitle}</div>
      </div>
    </div>
  );
}
