'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { OnboardingData } from '../OnboardingFlow';

interface RoleStepProps {
  onNext: () => void;
  onBack: () => void;
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export default function RoleStep({ onNext, onBack, data, updateData }: RoleStepProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'professional'>(data.role);

  const handleSubmit = () => {
    updateData({ role: selectedRole });
    onNext();
  };

  return (
    <div className="p-8 animate-slide-up">
      <button
        onClick={onBack}
        className="text-zinc-500 hover:text-white text-xs flex items-center gap-1 mb-6 transition-colors"
      >
        <Icon icon="solar:arrow-left-linear" /> Back
      </button>

      <h2 className="text-xl font-medium text-white mb-2">How do you identify?</h2>
      <p className="text-sm text-zinc-500 mb-6">This helps us tailor your experience.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="cursor-pointer group">
          <input
            type="radio"
            name="role"
            checked={selectedRole === 'student'}
            onChange={() => setSelectedRole('student')}
            className="sr-only"
          />
          <div
            className={`border rounded-xl p-5 transition-all h-full flex flex-col items-start gap-4 ${
              selectedRole === 'student'
                ? 'border-white bg-white/5'
                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl border border-indigo-500/20">
              <Icon icon="solar:square-academic-cap-linear" />
            </div>
            <div>
              <div className="font-medium text-white mb-1">Student</div>
              <div className="text-xs text-zinc-500 leading-relaxed">
                Looking for internships, hackathons, and entry-level roles.
              </div>
            </div>
          </div>
        </label>

        <label className="cursor-pointer group">
          <input
            type="radio"
            name="role"
            checked={selectedRole === 'professional'}
            onChange={() => setSelectedRole('professional')}
            className="sr-only"
          />
          <div
            className={`border rounded-xl p-5 transition-all h-full flex flex-col items-start gap-4 ${
              selectedRole === 'professional'
                ? 'border-white bg-white/5'
                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl border border-emerald-500/20">
              <Icon icon="solar:briefcase-linear" />
            </div>
            <div>
              <div className="font-medium text-white mb-1">Professional</div>
              <div className="text-xs text-zinc-500 leading-relaxed">
                Looking for full-time opportunities and networking.
              </div>
            </div>
          </div>
        </label>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-white hover:bg-zinc-200 text-black rounded-lg py-2 px-6 text-sm font-medium transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
