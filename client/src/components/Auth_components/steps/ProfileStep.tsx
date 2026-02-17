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

type TabType = 'basic' | 'education' | 'skills';

const AVAILABLE_SKILLS = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Node.js', 
  'AWS', 'Docker', 'GraphQL', 'SQL', 'MongoDB',
  'Vue.js', 'Angular', 'Next.js', 'Express', 'Django',
  'Figma', 'UI/UX', 'Product Design', 'Git', 'CI/CD'
];

const SPECIALIZATIONS = [
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Data Science',
  'Artificial Intelligence',
  'Cybersecurity',
  'Web Development',
  'Mobile Development',
  'Cloud Computing',
  'DevOps',
  'Other'
];

export default function ProfileStep({ onNext, onBack, data, updateData }: ProfileStepProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  
  // Basic Info
  const [firstName, setFirstName] = useState(data.firstName || '');
  const [lastName, setLastName] = useState(data.lastName || '');
  const [isStudent, setIsStudent] = useState(data.role === 'student');
  const [currentRole, setCurrentRole] = useState(data.currentRole || '');
  const [targetRole, setTargetRole] = useState(data.targetRole || '');
  
  // Profile Image
  const [profileImage, setProfileImage] = useState<File | null>(data.profileImage || null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Education Details
  const [collegeName, setCollegeName] = useState(data.collegeName || '');
  const [course, setCourse] = useState(data.course || '');
  const [specialization, setSpecialization] = useState(data.specialization || '');
  const [customSpecialization, setCustomSpecialization] = useState(data.customSpecialization || '');
  const [startDate, setStartDate] = useState(data.startDate || '');
  const [endDate, setEndDate] = useState(data.endDate || '');
  const [isCurrentlyStudying, setIsCurrentlyStudying] = useState(data.isCurrentlyStudying ?? true);
  
  // Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>(data.skills || []);
  const [customSkill, setCustomSkill] = useState('');
  const [showCustomSkillInput, setShowCustomSkillInput] = useState(false);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 10) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      setProfileImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim()) && selectedSkills.length < 10) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill('');
      setShowCustomSkillInput(false);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleSubmit = () => {
    updateData({
      firstName,
      lastName,
      currentRole: isStudent ? targetRole : currentRole,
      targetRole: isStudent ? targetRole : undefined,
      role: isStudent ? 'student' : 'professional',
      // Education fields
      collegeName,
      course,
      specialization,
      customSpecialization: specialization === 'Other' ? customSpecialization : '',
      startDate,
      endDate,
      isCurrentlyStudying,
      // Skills
      skills: selectedSkills,
      // Profile image
      profileImage,
    });
    onNext();
  };

  const isBasicComplete = firstName && lastName && (isStudent ? targetRole : currentRole);
  const isEducationComplete = collegeName && course && specialization;
  const isSkillsComplete = selectedSkills.length > 0;

  const canProceed = isBasicComplete && isEducationComplete && isSkillsComplete;

  return (
    <div className="p-8 animate-slide-up max-h-[600px] overflow-y-auto">
      <button
        onClick={onBack}
        className="text-zinc-500 hover:text-white text-xs flex items-center gap-1 mb-6 transition-colors"
      >
        <Icon icon="solar:arrow-left-linear" /> Back
      </button>

      <h2 className="text-xl font-medium text-white mb-2">Build your profile</h2>
      <p className="text-sm text-zinc-500 mb-6">Let companies know who you are.</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 text-sm font-medium transition-all relative ${
            activeTab === 'basic'
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Basic Info
          {activeTab === 'basic' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
          )}
          {isBasicComplete && activeTab !== 'basic' && (
            <Icon icon="solar:check-circle-bold" className="absolute -top-1 -right-1 text-emerald-500 text-xs" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`px-4 py-2 text-sm font-medium transition-all relative ${
            activeTab === 'education'
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Education
          {activeTab === 'education' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
          )}
          {isEducationComplete && activeTab !== 'education' && (
            <Icon icon="solar:check-circle-bold" className="absolute -top-1 -right-1 text-emerald-500 text-xs" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 text-sm font-medium transition-all relative ${
            activeTab === 'skills'
              ? 'text-white'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Skills
          {activeTab === 'skills' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
          )}
          {isSkillsComplete && activeTab !== 'skills' && (
            <Icon icon="solar:check-circle-bold" className="absolute -top-1 -right-1 text-emerald-500 text-xs" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-5">
        {/* BASIC INFO TAB */}
        {activeTab === 'basic' && (
          <div className="space-y-5 animate-fade-in">
            {/* Avatar Upload */}
            <div className="flex items-center gap-4">
              <label className="relative group cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
                {imagePreview ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 relative group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Icon icon="solar:camera-linear" className="text-white text-xl" />
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 transition-all group relative overflow-hidden">
                    <Icon icon="solar:camera-linear" className="text-xl relative z-10" />
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                )}
              </label>
              <div>
                <div className="text-sm font-medium text-white">Profile Photo</div>
                <div className="text-xs text-zinc-500">JPG, PNG up to 2MB</div>
                {profileImage && (
                  <button
                    onClick={removeImage}
                    className="text-xs text-red-400 hover:text-red-300 mt-1 flex items-center gap-1"
                  >
                    <Icon icon="solar:trash-bin-linear" /> Remove
                  </button>
                )}
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 ml-1 font-medium">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Alex"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 ml-1 font-medium">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Chen"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
                />
              </div>
            </div>

            {/* Student Toggle */}
            <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Icon icon="solar:square-academic-cap-linear" className="text-lg" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">I am a student</div>
                    <div className="text-xs text-zinc-500">Currently pursuing education</div>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isStudent}
                    onChange={(e) => setIsStudent(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-800 rounded-full peer-checked:bg-indigo-500 transition-all"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                </div>
              </label>
            </div>

            {/* Role/Target Role */}
            {isStudent ? (
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 ml-1 font-medium">
                  Target Role <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <Icon
                    icon="solar:target-linear"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
                  />
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Frontend Developer, Data Scientist"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 ml-1 font-medium">
                  Current Role <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <Icon
                    icon="solar:briefcase-linear"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
                  />
                  <input
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="e.g. Senior Software Engineer at Google"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* EDUCATION/EXPERIENCE TAB */}
        {activeTab === 'education' && (
          <div className="space-y-5 animate-fade-in">
            {/* Education Fields - Universal for all users */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 ml-1 font-medium">
                College/University Name <span className="text-red-400">*</span>
              </label>
              <div className="relative group">
                <Icon
                  icon="solar:buildings-2-linear"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
                />
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. Stanford University, MIT"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 ml-1 font-medium">
                  Degree/Course <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. B.Tech, M.S., B.S."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 ml-1 font-medium">
                  Specialization <span className="text-red-400">*</span>
                </label>
                <select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all"
                >
                  <option value="">Select...</option>
                  {SPECIALIZATIONS.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {specialization === 'Other' && (
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 ml-1 font-medium">
                  Specify Specialization
                </label>
                <input
                  type="text"
                  value={customSpecialization}
                  onChange={(e) => setCustomSpecialization(e.target.value)}
                  placeholder="Enter your specialization"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 ml-1 font-medium">Start Date</label>
                <input
                  type="month"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 ml-1 font-medium">
                  {isCurrentlyStudying ? 'Expected End' : 'End Date'}
                </label>
                <input
                  type="month"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={isCurrentlyStudying}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isCurrentlyStudying}
                  onChange={(e) => setIsCurrentlyStudying(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-4 h-4 border border-zinc-700 rounded bg-zinc-900 peer-checked:bg-white peer-checked:border-white transition-all"></div>
                <Icon
                  icon="solar:check-read-linear"
                  className="absolute inset-0 text-black opacity-0 peer-checked:opacity-100 text-xs flex items-center justify-center pointer-events-none"
                />
              </div>
              <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                I am currently studying here
              </span>
            </label>

            {/* Info Note */}
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-4 flex gap-3">
              <Icon icon="solar:info-circle-linear" className="text-indigo-400 text-lg flex-shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-400 leading-relaxed">
                <span className="text-indigo-300 font-medium">Pro tip:</span> Students can add internship experience later in their profile. For now, just focus on your education details.
              </div>
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-zinc-400 ml-1 font-medium">
                Top Skills <span className="text-red-400">*</span>
              </label>
              <span className="text-xs text-zinc-600">
                {selectedSkills.length}/10 selected
              </span>
            </div>

            {/* Selected Skills */}
            {selectedSkills.length > 0 && (
              <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                <div className="text-xs text-zinc-500 mb-2">Your Skills:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 group"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <Icon icon="solar:close-circle-bold" className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Skills */}
            <div>
              <div className="text-xs text-zinc-500 mb-3">Popular Skills:</div>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    disabled={!selectedSkills.includes(skill) && selectedSkills.length >= 10}
                    className={`px-3 py-1.5 rounded-full border text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      selectedSkills.includes(skill)
                        ? 'border-white bg-white/10 text-white'
                        : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Skill Input */}
            {!showCustomSkillInput ? (
              <button
                onClick={() => setShowCustomSkillInput(true)}
                disabled={selectedSkills.length >= 10}
                className="w-full px-4 py-2.5 rounded-lg border border-dashed border-zinc-800 text-zinc-600 text-sm flex items-center justify-center gap-2 hover:text-zinc-400 hover:border-zinc-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Icon icon="solar:add-circle-linear" /> Add Custom Skill
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomSkill()}
                  placeholder="Enter skill name..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
                  autoFocus
                />
                <button
                  onClick={addCustomSkill}
                  className="px-4 py-2.5 bg-white hover:bg-zinc-200 text-black rounded-lg text-sm font-medium transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowCustomSkillInput(false);
                    setCustomSkill('');
                  }}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between items-center pt-6 border-t border-zinc-800">
        <button
          onClick={() => {
            if (activeTab === 'basic') return;
            setActiveTab(activeTab === 'education' ? 'basic' : 'education');
          }}
          className={`text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1 ${
            activeTab === 'basic' ? 'invisible' : ''
          }`}
        >
          <Icon icon="solar:arrow-left-linear" /> Previous
        </button>

        {activeTab !== 'skills' ? (
          <button
            onClick={() => setActiveTab(activeTab === 'basic' ? 'education' : 'skills')}
            disabled={!isBasicComplete && activeTab === 'basic'}
            className="bg-white hover:bg-zinc-200 text-black rounded-lg py-2 px-6 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next <Icon icon="solar:arrow-right-linear" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed}
            className="bg-white hover:bg-zinc-200 text-black rounded-lg py-2 px-6 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}