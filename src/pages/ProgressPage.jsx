import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Button from "../components/ui/Button";
import Section from "../components/ui/Section";
import { getContentByDifficulty } from "../components/paragraphs";
import { ModeContext } from "../contexts/modeContext";
import ScoreContext from "../contexts/scoreContext";
import { APP_CONTENT, ROUTES } from "../constants";

const StatCard = ({
  title,
  value,
  unit,
  color = "text-darkBlue",
  bgColor = "bg-white",
}) => (
  <div className={`${bgColor} rounded-lg shadow-md p-6 text-center`}>
    <div className={`text-3xl font-bold ${color} mb-2`}>
      {value}
      {unit && <span className="text-lg text-gray-600 ml-1">{unit}</span>}
    </div>
    <div className="text-gray-600 font-medium">{title}</div>
  </div>
);

const ProgressBar = ({ current, target, label }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">
          {current} / {target}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-darkBlue h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-right text-xs text-gray-500 mt-1">
        {Math.round(percentage)}% complete
      </div>
    </div>
  );
};

const AchievementBadge = ({ title, description, achieved, icon }) => (
  <div
    className={`p-4 rounded-lg border-2 ${
      achieved ? "border-green-400 bg-green-50" : "border-gray-300 bg-gray-50"
    }`}
  >
    <div className="text-center">
      <div
        className={`text-2xl mb-2 ${achieved ? "" : "grayscale opacity-50"}`}
      >
        {icon}
      </div>
      <h4
        className={`font-semibold ${
          achieved ? "text-green-800" : "text-gray-600"
        }`}
      >
        {title}
      </h4>
      <p className={`text-sm ${achieved ? "text-green-600" : "text-gray-500"}`}>
        {description}
      </p>
    </div>
  </div>
);

const HistoryEntry = ({ entry, index }) => {
  const date = new Date(entry.timestamp);
  const getPerformanceColor = (wpm, target) => {
    if (wpm >= target) return "text-green-600";
    if (wpm >= target * 0.8) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div className="text-sm text-gray-600">
          Session #{index + 1} • {date.toLocaleDateString()} at{" "}
          {date.toLocaleTimeString()}
        </div>
        <div className="text-xs bg-gray-100 px-2 py-1 rounded">
          {entry.difficulty}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div
            className={`text-lg font-bold ${getPerformanceColor(
              entry.wpm,
              entry.targetWPM || 20
            )}`}
          >
            {Math.round(entry.wpm)}
          </div>
          <div className="text-xs text-gray-600">WPM</div>
        </div>
        <div>
          <div
            className={`text-lg font-bold ${
              entry.accuracy >= 90
                ? "text-green-600"
                : entry.accuracy >= 80
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {Math.round(entry.accuracy)}%
          </div>
          <div className="text-xs text-gray-600">Accuracy</div>
        </div>
        <div>
          <div className="text-lg font-bold text-darkBlue">
            {Math.round(entry.timeElapsed)}s
          </div>
          <div className="text-xs text-gray-600">Time</div>
        </div>
      </div>
    </div>
  );
};

export default function ProgressPage() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { mode: contextMode } = useContext(ModeContext);
  const { accur, wpm } = useContext(ScoreContext);

  const [levelData, setLevelData] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [personalBests, setPersonalBests] = useState({
    wpm: 0,
    accuracy: 0,
    perfectRuns: 0,
  });

  useEffect(() => {
    const currentMode = mode || contextMode;
    if (currentMode) {
      const level = getContentByDifficulty(currentMode);
      setLevelData(level);
      loadProgressData(currentMode);
    }
  }, [mode, contextMode]);

  const loadProgressData = (currentMode) => {
    // Load session history from localStorage
    const allKeys = Object.keys(localStorage);
    const sessionKeys = allKeys.filter((key) =>
      key.startsWith("typing_result_")
    );
    const sessions = sessionKeys
      .map((key) => {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch {
          return null;
        }
      })
      .filter((session) => session && session.difficulty === currentMode)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setSessionHistory(sessions.slice(0, 10)); // Last 10 sessions

    // Calculate personal bests
    if (sessions.length > 0) {
      const maxWPM = Math.max(...sessions.map((s) => s.wpm));
      const maxAccuracy = Math.max(...sessions.map((s) => s.accuracy));
      const perfectRuns = sessions.filter((s) => s.accuracy === 100).length;

      setPersonalBests({
        wpm: maxWPM,
        accuracy: maxAccuracy,
        perfectRuns,
      });
    }

    // Calculate achievements
    calculateAchievements(sessions, currentMode);
  };

  const calculateAchievements = (sessions, currentMode) => {
    const level = getContentByDifficulty(currentMode);
    const achievementList = [
      {
        title: "First Steps",
        description: "Complete your first typing session",
        achieved: sessions.length > 0,
        icon: "🎯",
      },
      {
        title: "Speed Demon",
        description: `Reach ${level.targetWPM} WPM`,
        achieved: sessions.some((s) => s.wpm >= level.targetWPM),
        icon: "⚡",
      },
      {
        title: "Accuracy Master",
        description: "Achieve 95% accuracy",
        achieved: sessions.some((s) => s.accuracy >= 95),
        icon: "🎪",
      },
      {
        title: "Perfect Practice",
        description: "Complete a session with 100% accuracy",
        achieved: sessions.some((s) => s.accuracy === 100),
        icon: "💯",
      },
      {
        title: "Consistent Performer",
        description: "Complete 5 sessions",
        achieved: sessions.length >= 5,
        icon: "🏆",
      },
      {
        title: "Speed Racer",
        description: `Exceed ${level.targetWPM + 10} WPM`,
        achieved: sessions.some((s) => s.wpm >= level.targetWPM + 10),
        icon: "🚀",
      },
    ];

    setAchievements(achievementList);
  };

  const getOverallProgress = () => {
    if (!levelData || sessionHistory.length === 0)
      return { wpm: 0, accuracy: 0 };

    const recent = sessionHistory.slice(0, 5);
    const avgWPM = recent.reduce((sum, s) => sum + s.wpm, 0) / recent.length;
    const avgAccuracy =
      recent.reduce((sum, s) => sum + s.accuracy, 0) / recent.length;

    return { wpm: avgWPM, accuracy: avgAccuracy };
  };

  const progress = getOverallProgress();
  const achievedCount = achievements.filter((a) => a.achieved).length;

  if (!levelData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Section className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg text-gray-600">
              Loading progress data...
            </div>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Section>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Link to={ROUTES.practice}>
                <Button variant="outline" size="sm">
                  ← Back to Practice
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-darkBlue">
                Progress Report - {levelData.name}
              </h1>
              <Link to={ROUTES.menu}>
                <Button variant="outline" size="sm">
                  Change Level
                </Button>
              </Link>
            </div>
            <p className="text-gray-600">{levelData.description}</p>
          </div>

          {/* Current Session Stats */}
          {(wpm > 0 || accur > 0) && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-darkBlue mb-4">
                Latest Session Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  title="Words Per Minute"
                  value={Math.round(wpm)}
                  unit="WPM"
                  color={
                    wpm >= levelData.targetWPM
                      ? "text-green-600"
                      : "text-darkBlue"
                  }
                />
                <StatCard
                  title="Accuracy"
                  value={Math.round(accur)}
                  unit="%"
                  color={
                    accur >= 90
                      ? "text-green-600"
                      : accur >= 80
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                />
                <StatCard
                  title="Net WPM"
                  value={Math.round((accur * wpm) / 100)}
                  color="text-darkBlue"
                />
                <StatCard
                  title="Target WPM"
                  value={levelData.targetWPM}
                  color="text-gray-600"
                  bgColor="bg-gray-100"
                />
              </div>
            </div>
          )}

          {/* Progress Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-darkBlue mb-4">
                Progress Towards Goals
              </h3>
              <ProgressBar
                current={Math.round(progress.wpm)}
                target={levelData.targetWPM}
                label="Typing Speed (WPM)"
              />
              <ProgressBar
                current={Math.round(progress.accuracy)}
                target={95}
                label="Accuracy Target"
              />
              <ProgressBar
                current={achievedCount}
                target={achievements.length}
                label="Achievements Unlocked"
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-darkBlue mb-4">
                Personal Bests
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Highest WPM</span>
                  <span className="text-2xl font-bold text-green-600">
                    {Math.round(personalBests.wpm)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Best Accuracy</span>
                  <span className="text-2xl font-bold text-green-600">
                    {Math.round(personalBests.accuracy)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Perfect Sessions</span>
                  <span className="text-2xl font-bold text-green-600">
                    {personalBests.perfectRuns}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-darkBlue mb-4">
              Achievements ({achievedCount}/{achievements.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <AchievementBadge
                  key={index}
                  title={achievement.title}
                  description={achievement.description}
                  achieved={achievement.achieved}
                  icon={achievement.icon}
                />
              ))}
            </div>
          </div>

          {/* Session History */}
          {sessionHistory.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-darkBlue mb-4">
                Recent Sessions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sessionHistory.map((entry, index) => (
                  <HistoryEntry key={index} entry={entry} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.practice}>
                <Button size="lg">Practice Again</Button>
              </Link>
              <Link to={ROUTES.menu}>
                <Button variant="outline" size="lg">
                  Change Difficulty
                </Button>
              </Link>
              <Link to={ROUTES.home}>
                <Button variant="outline" size="lg">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
