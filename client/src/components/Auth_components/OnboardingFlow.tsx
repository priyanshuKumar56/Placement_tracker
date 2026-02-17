'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import WelcomeStep from './steps/WelcomeStep';
import AccountStep from './steps/AccountStep';
import RoleStep from './steps/RoleStep';
import ProfileStep from './steps/ProfileStep';
import PreferencesStep from './steps/PreferencesStep';
import ResumeStep from './steps/ResumeStep';
import SuccessStep from './steps/SuccessStep';

export interface OnboardingData {
  email: string;
  password: string;
  role: 'student' | 'professional';
  firstName: string;
  lastName: string;
  currentRole: string;
  // Education fields
  collegeName: string;
  course: string;
  specialization: string;
  customSpecialization?: string;
  startDate: string;
  endDate: string;
  isCurrentlyStudying: boolean;
  // Skills and preferences
  skills: string[];
  workTypes: string[];
  location: string;
  interests: string[];
  portfolio?: string;
  // Optional target role for students
  targetRole?: string;
  // File uploads
  profileImage?: File | null;
  resumeFile?: File | null;
}

const TOTAL_STEPS = 6;

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    email: '',
    password: '',
    role: 'student',
    firstName: '',
    lastName: '',
    currentRole: '',
    // Education fields
    collegeName: '',
    course: '',
    specialization: '',
    customSpecialization: '',
    startDate: '',
    endDate: '',
    isCurrentlyStudying: true,
    // Skills and preferences
    skills: [],
    workTypes: [],
    location: '',
    interests: [],
    portfolio: '',
    targetRole: '',
    // File uploads
    profileImage: null,
    resumeFile: null,
  });

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (newData: Partial<OnboardingData>) => {
    setData({ ...data, ...newData });
  };

  const closeOnboarding = () => {
    // Logic to close onboarding and navigate to dashboard
    console.log('Onboarding complete with data:', data);
    // You would typically redirect or update app state here
  };

  const progressPercentage = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Side Decorative Image - Hidden on mobile */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[35%] opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
          alt="Team collaboration"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#030303]/50 to-[#030303]"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header - Hidden on Welcome step */}
        {currentStep > 1 && (
          <div className="absolute -top-16 left-0 w-full flex justify-between items-center px-1 animate-fade-in">
            <div className="flex items-center gap-2 text-white font-medium tracking-tight opacity-50">
              <Icon icon="solar:atom-linear" className="text-lg" />
              <span>RiseUp</span>
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              Step {currentStep - 1} of {TOTAL_STEPS - 1}
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="glass-panel rounded-2xl p-1 bg-[#050505]/80 shadow-2xl border-white/10 relative overflow-hidden backdrop-blur-xl">
          {/* Progress Bar - Hidden on Welcome and Success steps */}
          {currentStep > 1 && currentStep < TOTAL_STEPS && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-20">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-white transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          )}

          {/* Step Content */}
          <div className="relative">
            {currentStep === 1 && <WelcomeStep onNext={nextStep} />}
            {currentStep === 2 && <AccountStep onNext={nextStep} data={data} updateData={updateData} />}
            {currentStep === 3 && <RoleStep onNext={nextStep} onBack={prevStep} data={data} updateData={updateData} />}
            {currentStep === 4 && <ProfileStep onNext={nextStep} onBack={prevStep} data={data} updateData={updateData} />}
            {currentStep === 5 && <PreferencesStep onNext={nextStep} onBack={prevStep} data={data} updateData={updateData} />}
            {currentStep === 6 && <ResumeStep onComplete={closeOnboarding} onNext={nextStep} onBack={prevStep} data={data} updateData={updateData} />}
            {/* {currentStep === 7 && <SuccessStep onComplete={closeOnboarding} data={data} />} */}
          </div>
        </div>

        {/* Bottom Indicator Dots */}
        {currentStep > 1 && currentStep < TOTAL_STEPS && (
          <div className="flex justify-center gap-2 mt-6 animate-fade-in">
            {Array.from({ length: TOTAL_STEPS - 2 }).map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${index + 2 === currentStep
                    ? 'w-8 bg-white'
                    : index + 2 < currentStep
                      ? 'w-1 bg-white/50'
                      : 'w-1 bg-white/20'
                  }`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}