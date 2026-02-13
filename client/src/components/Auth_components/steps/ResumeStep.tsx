'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { OnboardingData } from '../OnboardingFlow';

interface ResumeStepProps {
  onNext: () => void;
  onBack: () => void;
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export default function ResumeStep({ onNext, onBack, data, updateData }: ResumeStepProps) {
  const [portfolio, setPortfolio] = useState(data.portfolio || '');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    updateData({ portfolio });
    onNext();
  };

  // Calculate profile strength based on filled data
  const calculateStrength = () => {
    let strength = 60; // Base strength from previous steps
    if (uploadedFile) strength += 20;
    if (portfolio) strength += 20;
    return Math.min(strength, 100);
  };

  const profileStrength = calculateStrength();

  return (
    <div className="p-8 animate-slide-up">
      <button
        onClick={onBack}
        className="text-zinc-500 hover:text-white text-xs flex items-center gap-1 mb-6 transition-colors"
      >
        <Icon icon="solar:arrow-left-linear" /> Back
      </button>

      <h2 className="text-xl font-medium text-white mb-2">Final Touches</h2>
      <p className="text-sm text-zinc-500 mb-6">
        Upload your resume to auto-fill your profile.
      </p>

      <div className="space-y-6">
        {/* Resume Dropzone */}
        <label className="block">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="sr-only"
          />
          <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-900/50 hover:border-zinc-600 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Icon
                icon={uploadedFile ? 'solar:document-text-bold' : 'solar:upload-linear'}
                className={`text-xl ${
                  uploadedFile ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-white'
                }`}
              />
            </div>
            {uploadedFile ? (
              <>
                <p className="text-sm text-white font-medium mb-1">{uploadedFile.name}</p>
                <p className="text-xs text-emerald-400">
                  ✓ Uploaded successfully
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-white font-medium mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-zinc-500">PDF, DOCX up to 10MB</p>
              </>
            )}
          </div>
        </label>

        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400 ml-1">Portfolio / Website (Optional)</label>
          <div className="relative group">
            <Icon
              icon="solar:link-linear"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
            />
            <input
              type="text"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="https://"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all"
            />
          </div>
        </div>

        {/* Profile Strength */}
        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-zinc-300">Profile Strength</span>
            <span className="text-xs font-mono text-emerald-400">{profileStrength}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${profileStrength}%` }}
            ></div>
          </div>
          <div className="mt-2 text-[10px] text-zinc-500 flex items-center gap-1">
            <Icon icon="solar:info-circle-linear" />
            Uploading a resume increases visibility by 3x
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-white hover:bg-zinc-200 text-black rounded-lg py-2 px-6 text-sm font-medium transition-colors"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
}
