import { useState, useEffect } from 'react';
import {
  Onboarding,
  ScheduleView,
  DailyHabits,
  AIInsights,
  StatsCards,
  ProgressRings,
  Settings,
} from './components';
import { AppState, ScheduleBlock, DailyHabit, UserProfile } from './types';
import { storageUtils, dateUtils } from './utils';

function App() {
  const [appState, setAppState] = useState<AppState>(() => storageUtils.initializeState());

  // Save state whenever it changes
  useEffect(() => {
    storageUtils.saveState(appState);
  }, [appState]);

  // Check if streaks should be reset (new day)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (appState.currentDate !== today) {
      // New day - update streaks and reset habits
      const updatedHabits = appState.dailyHabits.map((habit) => {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // If last completed was yesterday, increment streak; otherwise reset
        const newStreak = habit.lastCompletedDate === yesterdayStr ? habit.streak + 1 : 0;

        return {
          ...habit,
          completed: false,
          streak: newStreak,
        };
      });

      // Reset schedule blocks
      const resetBlocks = appState.scheduleBlocks.map((block) => ({
        ...block,
        completed: false,
      }));

      setAppState((prev) => ({
        ...prev,
        dailyHabits: updatedHabits,
        scheduleBlocks: resetBlocks,
        currentDate: today,
      }));
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setAppState((prev) => ({
      ...prev,
      profile,
      hasCompletedOnboarding: true,
    }));
  };

  const handleToggleBlock = (id: string) => {
    setAppState((prev) => ({
      ...prev,
      scheduleBlocks: prev.scheduleBlocks.map((block) =>
        block.id === id ? { ...block, completed: !block.completed } : block
      ),
    }));
  };

  const handleAddBlock = (block: Omit<ScheduleBlock, 'id'>) => {
    const id = Date.now().toString();
    setAppState((prev) => ({
      ...prev,
      scheduleBlocks: [...prev.scheduleBlocks, { ...block, id }],
    }));
  };

  const handleDeleteBlock = (id: string) => {
    setAppState((prev) => ({
      ...prev,
      scheduleBlocks: prev.scheduleBlocks.filter((block) => block.id !== id),
    }));
  };

  const handleToggleHabit = (id: string) => {
    setAppState((prev) => ({
      ...prev,
      dailyHabits: prev.dailyHabits.map((habit) => {
        if (habit.id === id) {
          const newCompleted = !habit.completed;
          const today = new Date().toISOString().split('T')[0];
          return {
            ...habit,
            completed: newCompleted,
            lastCompletedDate: newCompleted ? today : habit.lastCompletedDate,
            streak: newCompleted ? (habit.streak || 0) + 1 : habit.streak,
          };
        }
        return habit;
      }),
    }));
  };

  const handleAddHabit = (habit: Omit<DailyHabit, 'id' | 'completed' | 'streak' | 'lastCompletedDate'>) => {
    const id = Date.now().toString();
    setAppState((prev) => ({
      ...prev,
      dailyHabits: [
        ...prev.dailyHabits,
        {
          id,
          ...habit,
          completed: false,
          streak: 0,
          lastCompletedDate: null,
        },
      ],
    }));
  };

  const handleReset = () => {
    storageUtils.resetState();
    setAppState(storageUtils.initializeState());
  };

  // Calculate stats
  const completedBlocks = appState.scheduleBlocks.filter((b) => b.completed).length;
  const totalBlocks = appState.scheduleBlocks.length;
  const schedulePercent =
    totalBlocks > 0 ? Math.round((completedBlocks / totalBlocks) * 100) : 0;

  const completedHabits = appState.dailyHabits.filter((h) => h.completed).length;
  const habitCount = appState.dailyHabits.length;
  const habitPercent = habitCount > 0 ? Math.round((completedHabits / habitCount) * 100) : 0;

  const bestStreak = Math.max(...appState.dailyHabits.map((h) => h.streak), 0);
  const focusHours = dateUtils.calculateFocusHours(appState.scheduleBlocks);

  if (!appState.hasCompletedOnboarding || !appState.profile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-teal-600 truncate">
              🌸 Bloom AI
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              Welcome, {appState.profile.name}! Ready to level up today?
            </p>
          </div>
          <Settings onReset={handleReset} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {/* Stats Cards */}
        <StatsCards
          tasksDone={completedBlocks}
          totalTasks={totalBlocks}
          habitsDone={completedHabits}
          bestStreak={bestStreak}
          focusHours={focusHours}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left: Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 sm:p-6 rounded-lg border-2 border-gray-200">
              <ScheduleView
                blocks={appState.scheduleBlocks}
                onToggleBlock={handleToggleBlock}
                onAddBlock={handleAddBlock}
                onDeleteBlock={handleDeleteBlock}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Progress Rings */}
            <ProgressRings schedulePercent={schedulePercent} habitPercent={habitPercent} />

            {/* Daily Habits */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border-2 border-gray-200">
              <DailyHabits
                habits={appState.dailyHabits}
                onToggleHabit={handleToggleHabit}
                onAddHabit={handleAddHabit}
              />
            </div>

            {/* AI Insights */}
            <AIInsights
              profile={appState.profile}
              blocks={appState.scheduleBlocks}
              habits={appState.dailyHabits}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
        <div className="max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">
          <p>Made with 💚 by Bloom AI • by: Mr Nathoo • Your personal productivity companion</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
