'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { OnboardingData } from '../OnboardingFlow';

interface PreferencesStepProps {
  onNext: () => void;
  onBack: () => void;
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const WORK_TYPES = ['Remote', 'Hybrid', 'On-site'];

export default function PreferencesStep({ onNext, onBack, data, updateData }: PreferencesStepProps) {
  const [workTypes, setWorkTypes] = useState<string[]>(data.workTypes.length > 0 ? data.workTypes : ['Remote', 'Hybrid']);
  const [location, setLocation] = useState(data.location || 'San Francisco, CA');
  const [interests, setInterests] = useState<string[]>(data.interests.length > 0 ? data.interests : ['jobs', 'hackathons']);

  const toggleWorkType = (type: string) => {
    if (workTypes.includes(type)) {
      setWorkTypes(workTypes.filter((t) => t !== type));
    } else {
      setWorkTypes([...workTypes, type]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = () => {
    updateData({
      workTypes,
      location,
      interests,
    });
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

      <h2 className="text-xl font-medium text-white mb-2">Career Preferences</h2>
      <p className="text-sm text-zinc-500 mb-6">
        What kind of opportunities are you looking for?
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs text-zinc-400 ml-1">Work Type</label>
          <div className="flex gap-2">
            {WORK_TYPES.map((type) => (
              <label key={type} className="cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={workTypes.includes(type)}
                  onChange={() => toggleWorkType(type)}
                  className="sr-only"
                />
                <div
                  className={`text-center py-2.5 rounded-lg border text-xs transition-all ${
                    workTypes.includes(type)
                      ? 'bg-white text-black border-white'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {type}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400 ml-1">Preferred Locations</label>
          <div className="relative group">
            <Icon
              icon="solar:map-point-linear"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-400 ml-1">Interested In</label>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 cursor-pointer hover:bg-zinc-800/80 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-indigo-500/10 text-indigo-400">
                  <Icon icon="solar:briefcase-linear" />
                </div>
                <span className="text-sm text-zinc-300">Jobs & Internships</span>
              </div>
              <input
                type="checkbox"
                checked={interests.includes('jobs')}
                onChange={() => toggleInterest('jobs')}
                className="accent-white w-4 h-4 rounded border-zinc-600 bg-zinc-900"
              />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 cursor-pointer hover:bg-zinc-800/80 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded bg-amber-500/10 text-amber-400">
                  <Icon icon="solar:cup-star-linear" />
                </div>
                <span className="text-sm text-zinc-300">Hackathons</span>
              </div>
              <input
                type="checkbox"
                checked={interests.includes('hackathons')}
                onChange={() => toggleInterest('hackathons')}
                className="accent-white w-4 h-4 rounded border-zinc-600 bg-zinc-900"
              />
            </label>
          </div>
        </div>
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
