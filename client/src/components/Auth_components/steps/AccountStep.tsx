'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { OnboardingData } from '../OnboardingFlow';

interface AccountStepProps {
  onNext: () => void;
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export default function AccountStep({ onNext, data, updateData }: AccountStepProps) {
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [agreed, setAgreed] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/[0-9]/)) strength++;
    if (pwd.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    calculatePasswordStrength(pwd);
  };

  const handleSubmit = () => {
    updateData({ email, password });
    onNext();
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return 'Too weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Good strength';
    if (passwordStrength === 3) return 'Strong';
    return 'Very strong';
  };

  return (
    <div className="p-8 animate-slide-up">
      <h2 className="text-xl font-medium text-white mb-2">Create your account</h2>
      <p className="text-sm text-zinc-500 mb-6">Start your journey with a secure identity.</p>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400 ml-1">Email Address</label>
          <div className="relative group">
            <Icon
              icon="solar:letter-linear"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 focus:bg-zinc-800/50 transition-all placeholder:text-zinc-700"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400 ml-1">Password</label>
          <div className="relative group">
            <Icon
              icon="solar:lock-password-linear"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 focus:bg-zinc-800/50 transition-all placeholder:text-zinc-700"
            />
          </div>
          {/* Strength Indicator */}
          <div className="flex gap-1 h-1 mt-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`flex-1 rounded-full transition-all ${
                  index < passwordStrength
                    ? passwordStrength <= 1
                      ? 'bg-red-500'
                      : passwordStrength === 2
                      ? 'bg-yellow-500'
                      : 'bg-emerald-500'
                    : 'bg-zinc-800'
                }`}
              ></div>
            ))}
          </div>
          {password && (
            <div className="text-[10px] text-zinc-500 text-right">{getStrengthText()}</div>
          )}
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-4 h-4 border border-zinc-700 rounded bg-zinc-900 peer-checked:bg-white peer-checked:border-white transition-all"></div>
              <Icon
                icon="solar:check-read-linear"
                className="absolute inset-0 text-black opacity-0 peer-checked:opacity-100 text-xs flex items-center justify-center pointer-events-none"
              />
            </div>
            <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!email || !password || !agreed}
          className="bg-white hover:bg-zinc-200 text-black rounded-lg py-2 px-6 text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account <Icon icon="solar:arrow-right-linear" />
        </button>
      </div>
    </div>
  );
}
