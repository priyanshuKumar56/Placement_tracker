'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { OnboardingData } from '../OnboardingFlow';

interface ProfileStepProps {
  onNext: () => void;
  onBack: () => void;
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

const AVAILABLE_SKILLS = ['React', 'TypeScript', 'Design', 'Python', 'Node.js', 'AWS', 'Docker', 'GraphQL'];

export default function ProfileStep({ onNext, onBack, data, updateData }: ProfileStepProps) {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [currentRole, setCurrentRole] = useState(data.currentRole);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(data.skills);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = () => {
    updateData({
      firstName,
      lastName,
      currentRole,
      skills: selectedSkills,
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

      <h2 className="text-xl font-medium text-white mb-2">Build your profile</h2>
      <p className="text-sm text-zinc-500 mb-6">Let companies know who you are.</p>

      <div className="space-y-5">
        {/* Avatar Upload */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 cursor-pointer hover:border-zinc-500 hover:text-zinc-300 transition-all">
            <Icon icon="solar:camera-linear" className="text-xl" />
          </div>
          <div>
            <div className="text-sm font-medium text-white">Profile Photo</div>
            <div className="text-xs text-zinc-500">JPG, PNG up to 2MB</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 ml-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Alex"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 ml-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Chen"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400 ml-1">Current Role / Education</label>
          <input
            type="text"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            placeholder="e.g. Computer Science Student at Stanford"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-zinc-400 ml-1">
            Top Skills (Select up to 5) - {selectedSkills.length}/5
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SKILLS.map((skill) => (
              <label key={skill} className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                  className="sr-only"
                />
                <div
                  className={`px-3 py-1.5 rounded-full border text-xs transition-all ${
                    selectedSkills.includes(skill)
                      ? 'bg-white text-black border-white'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {skill}
                </div>
              </label>
            ))}
            <div className="px-3 py-1.5 rounded-full border border-dashed border-zinc-800 text-zinc-600 text-xs flex items-center gap-1 cursor-pointer hover:text-zinc-400 hover:border-zinc-600">
              <Icon icon="solar:add-linear" /> Add
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!firstName || !lastName}
          className="bg-white hover:bg-zinc-200 text-black rounded-lg py-2 px-6 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
