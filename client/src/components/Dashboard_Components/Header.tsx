'use client';

import { Icon } from '@iconify/react';

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#030303]/80 backdrop-blur-md z-30 sticky top-0">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative group w-full max-w-md">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
          />
          <input
            type="text"
            placeholder="Search for jobs, companies, or skills..."
            className="w-full bg-zinc-900/50 border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:bg-zinc-900 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="hidden sm:inline-block border border-zinc-700 rounded px-1.5 text-[10px] text-zinc-500 font-sans">
              ⌘
            </kbd>
            <kbd className="hidden sm:inline-block border border-zinc-700 rounded px-1.5 text-[10px] text-zinc-500 font-sans">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500 px-3 py-1.5 bg-zinc-900/50 rounded-full border border-white/5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Open to work</span>
        </div>
        <div className="h-6 w-px bg-white/5"></div>
        <button className="w-9 h-9 rounded-full hover:bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors relative">
          <Icon icon="solar:bell-linear" className="text-xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#030303]"></span>
        </button>
      </div>
    </header>
  );
}
