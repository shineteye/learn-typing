# 🎯 Learn Typing - Interactive Typing Practice App

A modern, fast, and engaging typing practice application built with React and Vite. Master your typing skills with real-time feedback, multiple difficulty levels, and comprehensive progress tracking.

![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?style=flat&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat&logo=javascript)

## ✨ Features

### 🎮 **Interactive Typing Practice**

- **Real-time character-by-character feedback** with color coding
- **Live metrics calculation** (WPM, accuracy, errors)
- **Pause/Resume functionality** for flexible practice sessions
- **Automatic completion detection** and results navigation

### 📊 **Three Difficulty Levels**

- 🟢 **Beginner** (Target: 25 WPM) - Basic letters and simple words
- 🟡 **Intermediate** (Target: 45 WPM) - Common sentences with punctuation
- 🔴 **Professional** (Target: 65 WPM) - Complex technical content

### 🏆 **Achievement System**

- **First Steps** - Complete your first practice session
- **Speed Demon** - Reach target WPM for your difficulty
- **Accuracy Master** - Achieve 95%+ accuracy
- **Perfect Practice** - Complete with 100% accuracy
- **Consistent Performer** - Complete 5+ sessions
- **Speed Racer** - Exceed 60 WPM

### 📈 **Progress Tracking**

- **Personal best tracking** for WPM and accuracy
- **Session history** with detailed statistics
- **Achievement badges** with unlock conditions
- **LocalStorage persistence** - your progress is saved automatically

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shineteye/learn-typing.git
   cd learn-typing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📝 Available Scripts

### Development

```bash
npm run dev          # Start development server with hot reload
```

### Production

```bash
npm run build        # Build optimized production bundle
npm run preview      # Preview the production build locally
```

### Code Quality

```bash
npm run lint         # Check code style and potential issues
```

## 🏗️ Project Structure

```
learn-typing/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── practice/       # Typing practice components
│   │   │   ├── TypingControls.jsx
│   │   │   ├── TypingStats.jsx
│   │   │   └── TypingText.jsx
│   │   ├── ui/            # Base UI components
│   │   │   ├── Button.jsx
│   │   │   └── Section.jsx
│   │   └── navbar/
│   │       └── Navbar.jsx
│   ├── pages/             # Application pages
│   │   ├── LandingPage.jsx
│   │   ├── MenuPage.jsx
│   │   ├── PracticePage.jsx
│   │   └── ProgressPage.jsx
│   ├── contexts/          # React Context providers
│   │   ├── ModeContext.js
│   │   └── ScoreContext.js
│   ├── constants/         # App constants and content
│   │   └── index.js
│   ├── utils/            # Helper functions
│   │   └── index.js
│   └── styles/           # Design system tokens
│       └── tokens.js
├── APPLICATION_GUIDE.md   # Detailed technical documentation
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite build configuration
└── package.json
```

## 🎨 How It Works

### Visual Feedback System

The app provides real-time visual feedback as you type:

- 🟢 **Green** - Correctly typed characters
- 🔴 **Red** - Incorrectly typed characters with error highlighting
- ⚫ **Gray** - Characters not yet typed
- 🔵 **Blue** - Current cursor position with animated indicator

### Metrics Calculation

**Words Per Minute (WPM)**

```
WPM = (Characters Typed ÷ 5) ÷ Time in Minutes
```

**Accuracy Percentage**

```
Accuracy = (Correct Characters ÷ Total Typed Characters) × 100
```

**Real-time Updates**

- Metrics update every 100ms for smooth feedback
- Precise timing with pause/resume support
- Error counting with character-by-character validation

## 🛤️ User Journey

1. **Landing Page** - Welcome and introduction to the app
2. **Menu Page** - Select your difficulty level
3. **Practice Page** - Interactive typing with real-time feedback
4. **Progress Page** - View results, achievements, and statistics

## 🔧 Technical Details

### Built With

- **React 18.3.1** - Modern UI library with hooks
- **Vite 6.0.1** - Next-generation frontend tooling
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **React Router DOM 6.30.1** - Declarative routing
- **PostCSS** - CSS processing and optimization

### Key Features

- **Component-based architecture** for maintainability
- **Context API** for global state management
- **LocalStorage integration** for data persistence
- **Responsive design** that works on all devices
- **Real-time performance monitoring** with optimized re-renders

### Performance Optimizations

- **Vite's fast HMR** for instant development feedback
- **Optimized re-renders** with useCallback and useMemo
- **Efficient state updates** with minimal component re-renders
- **Bundle optimization** with automatic code splitting

## 📖 Documentation

For detailed technical documentation including algorithms, data structures, and implementation details, see:

- **[APPLICATION_GUIDE.md](./APPLICATION_GUIDE.md)** - Comprehensive technical guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Goals & Objectives

This application was designed to:

- **Improve typing speed and accuracy** through structured practice
- **Provide engaging visual feedback** to maintain user motivation
- **Track progress over time** with detailed analytics
- **Offer multiple difficulty levels** for users of all skill levels
- **Demonstrate modern React development** with best practices

---

**Happy Typing! 🎉**

_Built with ❤️ using React, Vite, and Tailwind CSS_
