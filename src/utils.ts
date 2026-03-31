import { UserProfile, ScheduleBlock, DailyHabit, AppState } from './types';

const STORAGE_KEY = 'bloom-ai-state';
const DEFAULT_SCHEDULE_BLOCKS: ScheduleBlock[] = [
  {
    id: '1',
    title: 'Morning Routine',
    startTime: '06:00',
    endTime: '07:00',
    category: 'personal',
    completed: false,
  },
  {
    id: '2',
    title: 'Deep Work',
    startTime: '09:00',
    endTime: '12:00',
    category: 'work',
    completed: false,
  },
  {
    id: '3',
    title: 'Lunch',
    startTime: '12:00',
    endTime: '13:00',
    category: 'meal',
    completed: false,
  },
  {
    id: '4',
    title: 'Focused Study',
    startTime: '14:00',
    endTime: '16:00',
    category: 'study',
    completed: false,
  },
  {
    id: '5',
    title: 'Exercise',
    startTime: '17:00',
    endTime: '18:00',
    category: 'exercise',
    completed: false,
  },
  {
    id: '6',
    title: 'Dinner',
    startTime: '18:30',
    endTime: '19:30',
    category: 'meal',
    completed: false,
  },
];

const DEFAULT_HABITS: DailyHabit[] = [
  { id: '1', name: 'Meditation', emoji: '🧘', completed: false, streak: 0, lastCompletedDate: null },
  { id: '2', name: 'Read 30 min', emoji: '📚', completed: false, streak: 0, lastCompletedDate: null },
  { id: '3', name: 'Drink water', emoji: '💧', completed: false, streak: 0, lastCompletedDate: null },
  { id: '4', name: 'Exercise', emoji: '💪', completed: false, streak: 0, lastCompletedDate: null },
  { id: '5', name: 'Journal', emoji: '📝', completed: false, streak: 0, lastCompletedDate: null },
];

export const storageUtils = {
  // Initialize state
  initializeState(): AppState {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      profile: null,
      scheduleBlocks: DEFAULT_SCHEDULE_BLOCKS,
      dailyHabits: DEFAULT_HABITS,
      insights: [],
      hasCompletedOnboarding: false,
      currentDate: new Date().toISOString().split('T')[0],
    };
  },

  // Save state
  saveState(state: AppState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  // Reset everything
  resetState(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Get current state
  getState(): AppState {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return this.initializeState();
    return JSON.parse(stored);
  },
};

export const dateUtils = {
  getCurrentTime(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  },

  isTimeInRange(current: string, start: string, end: string): boolean {
    return current >= start && current < end;
  },

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  },

  calculateDurationMinutes(startTime: string, endTime: string): number {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const startTotalMinutes = startH * 60 + startM;
    const endTotalMinutes = endH * 60 + endM;
    return Math.max(0, endTotalMinutes - startTotalMinutes);
  },

  calculateFocusHours(blocks: ScheduleBlock[]): number {
    return blocks
      .filter((b) => (b.category === 'work' || b.category === 'study') && b.completed)
      .reduce((total, block) => {
        const minutes = this.calculateDurationMinutes(block.startTime, block.endTime);
        return total + minutes / 60;
      }, 0);
  },
};

export const aiUtils = {
  // Call OpenAI API for insights (requires API key)
  async generateInsight(
    profile: UserProfile | null,
    completionPercent: number,
    habitCount: number,
    bestStreak: number
  ): Promise<string> {
    try {
      // Rule-based insights if API not configured
      if (completionPercent === 0) {
        return "You haven't started yet — try focusing on your next task. You've got this! 🎯";
      }
      if (completionPercent < 30) {
        return `Good start, ${profile?.name || 'friend'}! Complete 30% more tasks to hit 50%. Keep the momentum! 🚀`;
      }
      if (completionPercent < 60) {
        return `Not bad! You're halfway there. ${habitCount} habits done. Keep pushing! 💪`;
      }
      if (completionPercent < 80) {
        return `Outstanding! 70%+ completion. Your best streak: ${bestStreak} days. You're on fire! 🔥`;
      }
      return `Amazing! You've crushed it today! 🌟 Current streak: ${bestStreak} days`;
    } catch (error) {
      console.error('Error generating insight:', error);
      return 'Keep going — small steps lead to big wins!';
    }
  },
};
