// User Profile
export interface UserProfile {
  name: string;
  age: number;
  occupation: string;
  goals: string[];
  wakeTime: string;
  sleepTime: string;
}

// Schedule Block
export interface ScheduleBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: 'study' | 'work' | 'exercise' | 'rest' | 'personal' | 'meal';
  completed: boolean;
}

// Daily Habit
export interface DailyHabit {
  id: string;
  name: string;
  emoji: string;
  completed: boolean;
  streak: number;
  lastCompletedDate: string | null;
}

// AI Insight
export interface AIInsight {
  text: string;
  category: 'motivation' | 'suggestion' | 'warning' | 'celebration';
  timestamp: number;
}

// App State
export interface AppState {
  profile: UserProfile | null;
  scheduleBlocks: ScheduleBlock[];
  dailyHabits: DailyHabit[];
  insights: AIInsight[];
  hasCompletedOnboarding: boolean;
  currentDate: string; // YYYY-MM-DD format
}
