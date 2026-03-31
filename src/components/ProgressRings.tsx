import React from 'react';

interface ProgressRingsProps {
  schedulePercent: number;
  habitPercent: number;
}

const ProgressRing: React.FC<{ percent: number; label: string }> = ({ percent, label }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#14b8a6"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base sm:text-lg font-bold text-teal-600">{percent}%</span>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 mt-2">{label}</p>
    </div>
  );
};

export const ProgressRings: React.FC<ProgressRingsProps> = ({ schedulePercent, habitPercent }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg border-2 border-gray-200">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 text-center">📊 Progress</h3>
      <div className="flex justify-around gap-2">
        <ProgressRing percent={schedulePercent} label="Schedule" />
        <ProgressRing percent={habitPercent} label="Habits" />
      </div>
    </div>
  );
};
