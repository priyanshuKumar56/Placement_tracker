'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { OnboardingData } from '../OnboardingFlow';

interface ResumeStepProps {
  onNext: () => void;
  onBack: () => void;
  data: OnboardingData;
  onComplete: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
}

export default function ResumeStep({ onComplete, onNext, onBack, data, updateData }: ResumeStepProps) {
  const [portfolio, setPortfolio] = useState(data.portfolio || '');
  const [resumeFile, setResumeFile] = useState<File | null>(data.resumeFile || null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF or DOC file');
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  const handleSubmit = () => {
    updateData({
      portfolio,
      resumeFile
    });
    onComplete();
  };

  // Calculate profile strength based on filled data
  const calculateStrength = () => {
    let strength = 60; // Base strength from previous steps
    if (resumeFile) strength += 20;
    if (portfolio) strength += 20;
    return Math.min(strength, 100);
  };

  const profileStrength = calculateStrength();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

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
        Upload your resume to auto-fill your profile and stand out.
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
          <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${resumeFile
              ? 'border-emerald-500 bg-emerald-500/5'
              : 'border-zinc-800 hover:bg-zinc-900/50 hover:border-zinc-600'
            }`}>
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-3 transition-transform ${resumeFile
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-white group-hover:scale-110'
              }`}>
              <Icon
                icon={resumeFile ? 'solar:document-text-bold' : 'solar:upload-linear'}
                className="text-xl"
              />
            </div>
            {resumeFile ? (
              <>
                <p className="text-sm text-white font-medium mb-1">{resumeFile.name}</p>
                <p className="text-xs text-emerald-400 mb-2">
                  ✓ {formatFileSize(resumeFile.size)} • Uploaded successfully
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFile();
                  }}
                  className="text-xs text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <Icon icon="solar:trash-bin-linear" /> Remove file
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-white font-medium mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-zinc-500">PDF, DOC, DOCX up to 10MB</p>
              </>
            )}
          </div>
        </label>

        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400 ml-1 font-medium">Portfolio / Website (Optional)</label>
          <div className="relative group">
            <Icon
              icon="solar:link-linear"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
            />
            <input
              type="text"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="https://yourportfolio.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
            />
          </div>
        </div>

        {/* Profile Strength */}
        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-zinc-300">Profile Strength</span>
            <span className={`text-xs font-mono ${profileStrength >= 80 ? 'text-emerald-400' :
                profileStrength >= 60 ? 'text-yellow-400' :
                  'text-orange-400'
              }`}>{profileStrength}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${profileStrength >= 80 ? 'bg-emerald-500' :
                  profileStrength >= 60 ? 'bg-yellow-500' :
                    'bg-orange-500'
                }`}
              style={{ width: `${profileStrength}%` }}
            ></div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <Icon
                icon={data.profileImage ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                className={data.profileImage ? 'text-emerald-500' : 'text-zinc-600'}
              />
              <span className={data.profileImage ? 'text-zinc-400' : 'text-zinc-600'}>
                Profile photo
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Icon
                icon={resumeFile ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                className={resumeFile ? 'text-emerald-500' : 'text-zinc-600'}
              />
              <span className={resumeFile ? 'text-zinc-400' : 'text-zinc-600'}>
                Resume uploaded
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Icon
                icon={portfolio ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                className={portfolio ? 'text-emerald-500' : 'text-zinc-600'}
              />
              <span className={portfolio ? 'text-zinc-400' : 'text-zinc-600'}>
                Portfolio link
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-800 text-[10px] text-zinc-500 flex items-center gap-1">
            <Icon icon="solar:info-circle-linear" />
            Profiles with resumes get 3x more views
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