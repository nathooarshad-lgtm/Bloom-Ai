import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 25,
    occupation: '',
    goals: [],
    wakeTime: '06:00',
    sleepTime: '22:00',
  });

  const occupations = ['Student', 'Developer', 'Designer', 'Manager', 'Entrepreneur', 'Other'];
  const goalsOptions = [
    'Better productivity',
    'Study effectively',
    'Build habits',
    'Work-life balance',
    'Fitness goals',
    'Mental health',
  ];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, name: e.target.value });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, age: parseInt(e.target.value, 10) || 25 });
  };

  const handleOccupationChange = (occupation: string) => {
    setProfile({ ...profile, occupation });
  };

  const handleGoalToggle = (goal: string) => {
    setProfile((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }));
  };

  const handleWakeTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, wakeTime: e.target.value });
  };

  const handleSleepTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, sleepTime: e.target.value });
  };

  const canProceed = (): boolean => {
    if (step === 1) return profile.name.trim().length > 0;
    if (step === 2) return profile.occupation.length > 0;
    if (step === 3) return profile.goals.length > 0;
    if (step === 4) return profile.wakeTime.length > 0 && profile.sleepTime.length > 0;
    return false;
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md fade-in-scale">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-2">🌸 Bloom AI</h1>
          <p className="text-sm sm:text-base text-gray-600">Let's set up your productivity journey</p>
          <div className="flex gap-1 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-teal-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Name & Age */}
        {step === 1 && (
          <div className="space-y-3 sm:space-y-4 animate-fadeIn">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">What's your name?</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={profile.name}
              onChange={handleNameChange}
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base sm:text-lg"
              autoFocus
            />
            <label className="block mt-4">
              <span className="text-gray-700 text-sm sm:text-base">Age: {profile.age}</span>
              <input
                type="number"
                min="13"
                max="120"
                value={profile.age}
                onChange={handleAgeChange}
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base sm:text-lg"
              />
            </label>
          </div>
        )}

        {/* Step 2: Occupation */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800">What's your occupation?</h2>
            <div className="grid grid-cols-2 gap-2">
              {occupations.map((occ) => (
                <button
                  key={occ}
                  onClick={() => handleOccupationChange(occ)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    profile.occupation === occ
                      ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold'
                      : 'border-gray-200 text-gray-700 hover:border-teal-300'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800">What are your goals?</h2>
            <p className="text-sm text-gray-600">Select one or more</p>
            <div className="space-y-2">
              {goalsOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    profile.goals.includes(goal)
                      ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold'
                      : 'border-gray-200 text-gray-700 hover:border-teal-300'
                  }`}
                >
                  {profile.goals.includes(goal) && '✓ '} {goal}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Daily Rhythm */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800">Your daily rhythm</h2>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Wake-up time</label>
              <input
                type="time"
                value={profile.wakeTime}
                onChange={handleWakeTimeChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Sleep time</label>
              <input
                type="time"
                value={profile.sleepTime}
                onChange={handleSleepTimeChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-base sm:text-lg font-medium active:bg-gray-100 min-h-[44px] flex items-center justify-center"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 px-4 py-2 sm:py-3 rounded-lg transition-colors font-semibold text-base sm:text-lg min-h-[44px] flex items-center justify-center ${
              canProceed()
                ? 'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {step === 4 ? 'Start! 🚀' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};
