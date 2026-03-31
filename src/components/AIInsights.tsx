import React, { useEffect, useState } from 'react';
import { ScheduleBlock, DailyHabit, UserProfile } from '../types';
import { aiUtils } from '../utils';

interface AIInsightsProps {
  profile: UserProfile | null;
  blocks: ScheduleBlock[];
  habits: DailyHabit[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ profile, blocks, habits }) => {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateInsight = async () => {
      setLoading(true);
      const completedBlocks = blocks.filter((b) => b.completed).length;
      const totalBlocks = blocks.length;
      const completionPercent = totalBlocks > 0 ? Math.round((completedBlocks / totalBlocks) * 100) : 0;
      const completedHabits = habits.filter((h) => h.completed).length;
      const bestStreak = Math.max(...habits.map((h) => h.streak), 0);

      const text = await aiUtils.generateInsight(
        profile,
        completionPercent,
        completedHabits,
        bestStreak
      );
      setInsight(text);
      setLoading(false);
    };

    generateInsight();
  }, [blocks, habits, profile]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-lg border-2 border-purple-200">
      <div className="flex items-start gap-2 sm:gap-3">
        <span className="text-2xl sm:text-3xl flex-shrink-0">🧠</span>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-2">AI Insights</h3>
          <p className={`text-xs sm:text-sm text-gray-700 leading-relaxed ${loading ? 'animate-pulse' : ''}`}>
            {insight}
          </p>
        </div>
      </div>
    </div>
  );
};
