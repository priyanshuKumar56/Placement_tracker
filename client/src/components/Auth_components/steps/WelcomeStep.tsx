'use client';

import { Icon } from '@iconify/react';

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="p-10 text-center animate-slide-up">
      <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
        <Icon icon="solar:atom-bold" className="text-2xl" />
      </div>
      <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">
        Welcome to Nexus
      </h1>
      <p className="text-zinc-400 mb-8 max-w-xs mx-auto leading-relaxed">
        The all-in-one platform for developers to find jobs, showcase skills, and win hackathons.
      </p>

      <div className="space-y-3">
        <button
          onClick={onNext}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600 rounded-lg py-2.5 px-4 flex items-center justify-center gap-3 transition-all group"
        >
          <Icon icon="logos:google-icon" className="text-lg" />
          Continue with Google
        </button>
        <button
          onClick={onNext}
          className="w-full bg-white hover:bg-zinc-200 text-black rounded-lg py-2.5 px-4 flex items-center justify-center gap-3 transition-all font-medium"
        >
          <Icon icon="solar:letter-linear" className="text-lg" />
          Continue with Email
        </button>
      </div>
      <div className="mt-8 text-xs text-zinc-500">
        By continuing, you agree to our{' '}
        <a href="#" className="text-zinc-400 hover:text-white underline">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="text-zinc-400 hover:text-white underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
