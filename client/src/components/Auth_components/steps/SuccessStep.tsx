'use client';

import { Icon } from '@iconify/react';

interface SuccessStepProps {
  onComplete: () => void;
  data:any
}

export default function SuccessStep({ onComplete ,data }: SuccessStepProps) {
  return (
    <div className="p-10 text-center animate-slide-up">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
        <Icon icon="solar:check-circle-bold" className="text-3xl" />
      </div>
      <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
        You&apos;re all set!
      </h1>
      <p className="text-zinc-400 mb-8 leading-relaxed">
        Your profile has been created. We&apos;ve personalized your dashboard based on your
        preferences.
      </p>

      <button
        onClick={onComplete}
        className="w-full bg-white hover:bg-zinc-200 text-black rounded-lg py-3 px-4 font-medium transition-colors shadow-lg shadow-white/5"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
