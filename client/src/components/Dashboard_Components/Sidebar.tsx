'use client';

import { Icon } from '@iconify/react';

type ViewType = 'dashboard' | 'jobs' | 'hackathons' | 'applications';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as ViewType, icon: 'solar:widget-2-linear', label: 'Overview' },
    { id: 'jobs' as ViewType, icon: 'solar:briefcase-linear', label: 'Jobs & Internships' },
    { id: 'hackathons' as ViewType, icon: 'solar:cup-star-linear', label: 'Hackathons' },
    { id: 'applications' as ViewType, icon: 'solar:clipboard-check-linear', label: 'Applications', badge: 3 },
  ];

  const growthItems = [
    { icon: 'solar:user-id-linear', label: 'Profile & Resume' },
    { icon: 'solar:diploma-verified-linear', label: 'Skill Verification' },
    { icon: 'solar:chat-line-linear', label: 'Messages' },
  ];

  return (
    <aside className="w-64 flex flex-col border-r border-white/5 bg-[#050505] z-40 flex-shrink-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-2 text-white font-medium tracking-tight">
          <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center">
            <Icon icon="solar:atom-linear" className="text-sm" />
          </div>
          <span>Nexus</span>
        </div>
        <div className="ml-auto text-[10px] text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 font-mono">
          v2.4
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-1">
        <div className="px-6 pb-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
          Platform
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-2.5 transition-all text-left ${
              currentView === item.id
                ? 'bg-white/5 text-white border-r-2 border-white'
                : 'text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200'
            }`}
          >
            <Icon icon={item.icon} className="text-lg" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                {item.badge}
              </span>
            )}
          </button>
        ))}

        <div className="px-6 pt-6 pb-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
          Growth
        </div>

        {growthItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 px-6 py-2.5 text-zinc-400 transition-all text-left hover:bg-white/[0.02] hover:text-zinc-200"
          >
            <Icon icon={item.icon} className="text-lg" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5 space-y-4">
        {/* Recruiter Toggle */}
        <div className="bg-zinc-900/50 rounded-lg p-3 flex items-center justify-between border border-white/5">
          <div className="text-xs text-zinc-400">Recruiter Mode</div>
          <div className="w-8 h-4 bg-zinc-800 rounded-full relative cursor-pointer border border-zinc-700">
            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-zinc-500 rounded-full transition-all"></div>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
            alt="User"
            className="w-8 h-8 rounded-full border border-white/10"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Alex Chen</div>
            <div className="text-xs text-zinc-500 truncate">Pro Member</div>
          </div>
          <Icon icon="solar:settings-linear" className="text-zinc-500 hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}
