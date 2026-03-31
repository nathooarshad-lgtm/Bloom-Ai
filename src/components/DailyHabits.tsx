import React, { useState } from 'react';
import { DailyHabit } from '../types';

interface DailyHabitsProps {
  habits: DailyHabit[];
  onToggleHabit: (id: string) => void;
  onAddHabit: (habit: Omit<DailyHabit, 'id' | 'completed' | 'streak' | 'lastCompletedDate'>) => void;
}

const EMOJI_SUGGESTIONS = ['🧘', '📚', '💧', '💪', '📝', '😴', '🎵', '🚴', '📱', '🧠', '🤗', '⛹️'];

export const DailyHabits: React.FC<DailyHabitsProps> = ({ habits, onToggleHabit, onAddHabit }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    emoji: '🌟',
  });

  const handleAddHabit = () => {
    if (newHabit.name.trim()) {
      onAddHabit(newHabit);
      setNewHabit({ name: '', emoji: '🌟' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">🎯 Daily Habits</h2>

      <div className="space-y-2">
        {habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => onToggleHabit(habit.id)}
            className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all text-left active:scale-95 ${
              habit.completed
                ? 'bg-teal-50 border-teal-300 opacity-70'
                : 'bg-white border-gray-200 hover:border-teal-300'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    habit.completed
                      ? 'bg-teal-500 border-teal-500 text-white'
                      : 'border-gray-400'
                  }`}
                >
                  {habit.completed && '✓'}
                </div>
                <div className="min-w-0">
                  <h3 className={`font-semibold text-sm sm:text-base text-gray-800 truncate ${habit.completed ? 'line-through' : ''}`}>
                    {habit.emoji} {habit.name}
                  </h3>
                  {habit.streak > 0 && (
                    <p className="text-xs text-orange-600 font-semibold">🔥 {habit.streak} day streak</p>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {showAddForm && (
        <div className="border-t pt-3 sm:pt-4 space-y-2 sm:space-y-3 bg-gray-50 p-3 sm:p-4 rounded-lg slide-in">
          <input
            type="text"
            placeholder="Habit name (e.g., 'Morning jog')"
            value={newHabit.name}
            onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm focus:border-transparent"
            autoFocus
          />
          <div>
            <p className="text-xs text-gray-700 font-semibold mb-2">Choose emoji:</p>
            <div className="grid grid-cols-6 gap-1 sm:gap-2 mb-3">
              {EMOJI_SUGGESTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setNewHabit({ ...newHabit, emoji })}
                  className={`p-2 rounded-lg border-2 text-lg sm:text-xl transition-all active:scale-95 ${
                    newHabit.emoji === emoji
                      ? 'bg-teal-100 border-teal-500'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddHabit}
              className="flex-1 px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-semibold active:bg-teal-700 min-h-[44px] flex items-center justify-center"
            >
              Add Habit
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm active:bg-gray-200 min-h-[44px] flex items-center justify-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full px-4 py-2 sm:py-3 border-2 border-dashed border-teal-300 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-semibold text-sm active:bg-teal-100 min-h-[44px] flex items-center justify-center"
        >
          + Add Habit
        </button>
      )}
    </div>
  );
};
