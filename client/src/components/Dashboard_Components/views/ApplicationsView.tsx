'use client';

import { Icon } from '@iconify/react';

export default function ApplicationsView() {
  return (
    <div className="view-section space-y-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-white tracking-tight">Application Tracker</h1>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white text-black text-xs font-medium rounded shadow">
            Board
          </button>
          <button className="px-3 py-1.5 text-zinc-500 hover:text-white text-xs font-medium rounded hover:bg-white/5 transition-colors">
            List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        <ApplicationColumn
          title="Applied"
          color="bg-zinc-500"
          count={3}
          applications={[
            {
              icon: 'solar:figma-file-linear',
              iconBg: 'bg-white',
              iconColor: 'text-black',
              title: 'Product Engineer',
              company: 'Figma',
              date: 'Applied 2d ago',
            },
            {
              icon: 'solar:plain-bold',
              iconBg: 'bg-blue-600',
              iconColor: 'text-white',
              title: 'Frontend Dev',
              company: 'Coinbase',
              date: 'Applied 5d ago',
            },
          ]}
        />

        <ApplicationColumn
          title="In Review"
          color="bg-blue-500"
          count={1}
          applications={[
            {
              icon: 'solar:apple-bold',
              iconBg: 'bg-black border border-zinc-700',
              iconColor: 'text-white',
              title: 'iOS Engineer',
              company: 'Apple',
              badge: 'Screening',
              badgeColor: 'text-blue-400 bg-blue-500/10',
            },
          ]}
        />

        <ApplicationColumn
          title="Interview"
          color="bg-amber-500"
          count={1}
          applications={[
            {
              icon: 'solar:code-circle-bold',
              iconBg: 'bg-black border border-zinc-700',
              iconColor: 'text-white',
              title: 'Full Stack Eng',
              company: 'Vercel',
              badge: 'Technical Round',
              badgeColor: 'text-amber-400 bg-amber-500/10',
              interview: 'Tomorrow, 10:00 AM',
              highlighted: true,
            },
          ]}
        />

        <ApplicationColumn title="Offer" color="bg-emerald-500" count={0} isEmpty />
      </div>
    </div>
  );
}

interface Application {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  company: string;
  date?: string;
  badge?: string;
  badgeColor?: string;
  interview?: string;
  highlighted?: boolean;
}

interface ApplicationColumnProps {
  title: string;
  color: string;
  count: number;
  applications?: Application[];
  isEmpty?: boolean;
}

function ApplicationColumn({ title, color, count, applications, isEmpty }: ApplicationColumnProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${color}`}></span>
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{title}</span>
        </div>
        <span className="text-xs text-zinc-600">{count}</span>
      </div>
      <div className="flex-1 bg-zinc-900/20 rounded-xl p-2 space-y-3 overflow-y-auto border border-white/5">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-zinc-700">
              <Icon icon="solar:box-minimalistic-linear" className="text-2xl mb-1" />
              <div className="text-xs">No offers yet</div>
            </div>
          </div>
        ) : (
          applications?.map((app, index) => (
            <ApplicationCard key={index} {...app} />
          ))
        )}
      </div>
    </div>
  );
}

function ApplicationCard({
  icon,
  iconBg,
  iconColor,
  title,
  company,
  date,
  badge,
  badgeColor,
  interview,
  highlighted,
}: Application) {
  return (
    <div
      className={`bg-zinc-900 border border-white/5 p-4 rounded-lg cursor-grab active:cursor-grabbing hover:border-zinc-600 transition-colors ${
        highlighted ? 'shadow-[0_0_15px_rgba(245,158,11,0.1)]' : ''
      }`}
    >
      <div className="flex justify-between mb-2">
        <div className={`w-8 h-8 ${iconBg} rounded flex items-center justify-center ${iconColor}`}>
          <Icon icon={icon} />
        </div>
        <Icon icon="solar:menu-dots-bold" className="text-zinc-600" />
      </div>
      <div className="text-sm text-white font-medium">{title}</div>
      <div className="text-xs text-zinc-500 mb-2">{company}</div>
      {badge && (
        <div className={`text-[10px] ${badgeColor} px-2 py-0.5 rounded inline-block`}>{badge}</div>
      )}
      {date && <div className="text-[10px] text-zinc-600 mt-2">{date}</div>}
      {interview && (
        <div className="mt-2 text-[10px] text-zinc-500 border-t border-white/5 pt-2">{interview}</div>
      )}
    </div>
  );
}
