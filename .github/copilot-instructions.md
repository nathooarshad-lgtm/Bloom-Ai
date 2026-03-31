# Bloom AI - GitHub Copilot Instructions

## Project Overview
Bloom AI is a productivity and life management dashboard built with React + TypeScript, featuring:
- Multi-step onboarding (name, age, occupation, goals, daily rhythm)
- Schedule block management with completion tracking
- Daily habits with streak tracking
- AI-generated insights based on progress
- Full localStorage persistence

## Tech Stack
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Build:** Vite
- **State Management:** React hooks + localStorage

## Project Structure
- `src/components/` - Reusable React components
- `src/types.ts` - TypeScript interfaces for entire app
- `src/utils.ts` - Storage, date, and AI utility functions
- `src/App.tsx` - Main application component with state management
- `src/index.css` - Global Tailwind styles

## Key Features Implementation

### Onboarding Flow
- 4-step form that saves profile to localStorage
- Age-appropriate insights generation
- Occupation-based schedule suggestions
- Goal selection and daily rhythm setup

### Dashboard
- Stats cards showing tasks, habits, streaks, focus time
- Schedule view with timeline and active block highlighting
- Custom time block creation and deletion
- Daily habits list with emoji support and auto-streak increment
- Animated progress rings for visual feedback
- AI insights panel with context-aware messages

### Data Persistence
- All data stored in `localStorage` under key `bloom-ai-state`
- Automatic daily reset of habits while preserving streak data
- Settings button to reset everything and restart onboarding

### AI Insights
- Currently rule-based system in `aiUtils.generateInsight()`
- Generates context-aware messages based on:
  - Completion percentage (0%, <30%, <60%, <80%, 100%)
  - User age and name
  - Habit completion count
  - Best streak value
- Ready for OpenAI API integration via environment variables

## Development Commands
- `npm run dev` - Start Vite dev server (port 5173)
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally

## Future Enhancement Ideas
1. **Real AI Integration** - Connect to OpenAI API for dynamic insights
2. **Cloud Sync** - Backend database for multi-device sync with user accounts
3. **Analytics** - Weekly/monthly progress charts and trend analysis
4. **Notifications** - Browser/mobile notifications for schedule blocks
5. **Pomodoro Timer** - Built-in timer for focused work blocks
6. **Mobile App** - React Native or PWA version

## Code Style Notes
- Use TypeScript for type safety throughout
- Prefer functional components with hooks
- Store all UI state in App.tsx, pass via props
- Use Tailwind utility classes for styling
- Keep components focused and single-responsibility

## Testing & Deployment
- No testing framework currently configured (can add Vitest/Jest)
- Build outputs to `dist/` folder
- Can be deployed to any static hosting (Vercel, Netlify, GitHub Pages)
- Consider adding GitHub Actions CI/CD pipeline for automated builds
