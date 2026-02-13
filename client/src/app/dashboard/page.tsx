'use client';

import { useState } from 'react';
import Sidebar from '@/components/Dashboard_Components/Sidebar';
import Header from '@/components/Dashboard_Components/Header';
import DashboardView from '@/components/Dashboard_Components/views/DashboardView';
import JobsView from '@/components/Dashboard_Components/views/JobsView';
import HackathonsView from '@/components/Dashboard_Components/views/HackathonsView';
import ApplicationsView from '@/components/Dashboard_Components/views/ApplicationsView';

type ViewType = 'dashboard' | 'jobs' | 'hackathons' | 'applications';

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  return (
    <div className="flex h-screen overflow-hidden text-sm antialiased selection:bg-white selection:text-black">
      <div className="noise-bg"></div>
      
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#030303]">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-8 relative scroll-smooth">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'jobs' && <JobsView />}
          {currentView === 'hackathons' && <HackathonsView />}
          {currentView === 'applications' && <ApplicationsView />}
        </div>
      </main>
    </div>
  );
}