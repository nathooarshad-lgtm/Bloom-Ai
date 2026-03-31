# Bloom AI

**Your personal AI-powered productivity & life management dashboard**

Bloom AI helps you structure your day, track habits, and receive intelligent insights to maximize productivity and build a better life.

## ✨ Features

### 🚀 Onboarding (4 Steps)
- **Name & Age** — Personalized greetings
- **Occupation** — Tailored suggestions  
- **Goals** — Pick whats matters to you
- **Daily Rhythm** — Set your wake-up and sleep times

### 📊 Dashboard
**Stats Cards:**
- Tasks Done (vs total)
- Habits Today
- Best Streak
- Focus Time logged

**Schedule View (left):**
- Pre-populated with sensible defaults
- Click circle to mark complete
- Current active block highlighted in teal
- Add custom blocks anytime
- Delete blocks with trash icon

**Right Sidebar:**
- **Progress Rings** — Visual completion % for schedule & habits
- **Daily Habits** — Toggle to complete, streaks auto-increment
- **AI Insights** — Context-aware tips based on progress

### 💾 Data Persistence
All data saved to `localStorage` — survives page refreshes

### 🧠 AI Insights
Rule-based insights based on:
- Completion percentage
- Age & profile
- Current habits & streaks

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build

```bash
npm run build
```

Produces optimized production build in `dist/`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Onboarding.tsx
│   ├── ScheduleView.tsx
│   ├── DailyHabits.tsx
│   ├── AIInsights.tsx
│   ├── StatsCards.tsx
│   ├── ProgressRings.tsx
│   └── Settings.tsx
├── types.ts            # TypeScript interfaces
├── utils.ts            # Storage, date, AI utilities
├── App.tsx             # Main app component
└── index.css           # Global styles (Tailwind)
```

## 🎨 Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Fast build tool
- **Tailwind CSS** — Utility-first styling

## 🔧 Configuration

### Environment Variables

Create a `.env` file if integrating OpenAI:

```env
VITE_OPENAI_API_KEY=your_api_key_here
```

## 📝 Usage

1. **First Visit** → Complete onboarding
2. **Dashboard** → View stats and today's schedule
3. **Add Blocks** → Click "+" to create custom time blocks
4. **Track Habits** → Click habit circles to check off
5. **Monitor Progress** → Watch rings fill as you complete tasks
6. **Settings** → Click ⚙️ to reset and start over

## 🚀 Future Enhancements

- [ ] Real AI integration (OpenAI API for dynamic insights)
- [ ] Docker containerization
- [ ] Cloud sync with user accounts
- [ ] Weekly/monthly progress charts
- [ ] Mobile app version
- [ ] Calendar integration
- [ ] Pomodoro timer
- [ ] Notification reminders

## 📄 License

MIT

## 👨‍💻 Contributing

Contributions welcome! Feel free to open issues or PRs.
