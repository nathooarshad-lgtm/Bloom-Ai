import React from 'react';

interface StatsCardsProps {
  tasksDone: number;
  totalTasks: number;
  habitsDone: number;
  bestStreak: number;
  focusHours: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  tasksDone,
  totalTasks,
  habitsDone,
  bestStreak,
  focusHours,
}) => {
  const taskPercent = totalTasks > 0 ? Math.round((tasksDone / totalTasks) * 100) : 0;

  const cards = [
    {
      label: 'Tasks Done',
      value: `${tasksDone}/${totalTasks}`,
      percent: taskPercent,
      icon: '✓',
      color: 'from-blue-100 to-blue-50 border-blue-300',
      textColor: 'text-blue-600',
    },
    {
      label: 'Habits Today',
      value: habitsDone.toString(),
      percent: 0,
      icon: '🎯',
      color: 'from-green-100 to-green-50 border-green-300',
      textColor: 'text-green-600',
    },
    {
      label: 'Best Streak',
      value: `${bestStreak}d`,
      percent: 0,
      icon: '🔥',
      color: 'from-orange-100 to-orange-50 border-orange-300',
      textColor: 'text-orange-600',
    },
    {
      label: 'Focus Time',
      value: focusHours.toFixed(1) + 'h',
      percent: 0,
      icon: '⏱️',
      color: 'from-purple-100 to-purple-50 border-purple-300',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${card.color} border-2 rounded-lg p-3 sm:p-4 transition-transform hover:scale-105 active:scale-95`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl sm:text-2xl">{card.icon}</span>
            {card.percent > 0 && (
              <span className={`text-xs font-bold ${card.textColor}`}>{card.percent}%</span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">{card.label}</p>
          <p className={`text-lg sm:text-2xl font-bold ${card.textColor}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};
