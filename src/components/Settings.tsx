import React from 'react';

interface SettingsProps {
  onReset: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onReset }) => {
  const handleReset = () => {
    if (window.confirm('Are you sure? This will reset everything and restart onboarding.')) {
      onReset();
    }
  };

  return (
    <button
      onClick={handleReset}
      className="p-2 sm:p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800 active:bg-gray-200 relative group min-h-[44px] min-w-[44px] flex items-center justify-center"
      title="Settings"
    >
      ⚙️
      <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto whitespace-nowrap z-50">
        <button
          onClick={handleReset}
          className="text-xs sm:text-sm text-red-600 hover:text-red-800 font-semibold px-3 py-2 hover:bg-red-50 rounded transition-colors"
        >
          Reset Everything
        </button>
      </div>
    </button>
  );
};
