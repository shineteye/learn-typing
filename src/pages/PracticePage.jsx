import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Button from "../components/ui/Button";
import Section from "../components/ui/Section";
import TypingStats from "../components/practice/TypingStats";
import TypingText from "../components/practice/TypingText";
import TypingControls from "../components/practice/TypingControls";
import { getRandomContent } from "../components/paragraphs";
import { ModeContext } from "../contexts/modeContext";
import ScoreContext from "../contexts/scoreContext";
import { calculateWPM, calculateAccuracy } from "../utils";
import { ROUTES } from "../constants";

export default function PracticePage() {
  const navigate = useNavigate();
  const { mode } = useContext(ModeContext);
  const { setAccur, setWpm } = useContext(ScoreContext);

  // Practice content state
  const [practiceData, setPracticeData] = useState(null);
  const [typedText, setTypedText] = useState("");

  // Timing state
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pausedTime, setPausedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Performance state
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [errors, setErrors] = useState(0);

  const inputRef = useRef(null);
  const intervalRef = useRef(null);

  // Load practice content based on difficulty mode
  useEffect(() => {
    loadNewContent();
  }, [mode]);

  // Update stats in real-time
  useEffect(() => {
    if (isStarted && !isPaused && !isCompleted && typedText.length > 0) {
      updateStats();
    }
  }, [typedText, currentTime, isStarted, isPaused, isCompleted]);

  // Timer effect
  useEffect(() => {
    if (isStarted && !isPaused && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now());
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isStarted, isPaused, isCompleted]);

  const loadNewContent = useCallback(() => {
    const content = getRandomContent(mode);
    setPracticeData(content);
    resetPractice();
  }, [mode]);

  const resetPractice = () => {
    setTypedText("");
    setIsStarted(false);
    setIsPaused(false);
    setIsCompleted(false);
    setStartTime(null);
    setPausedTime(0);
    setCurrentTime(0);
    setWPM(0);
    setAccuracy(0);
    setErrors(0);
    clearInterval(intervalRef.current);
  };

  const updateStats = () => {
    if (!practiceData || !startTime) return;

    const timeElapsed = (currentTime - startTime - pausedTime) / 1000 / 60; // minutes
    const currentWPM = calculateWPM(typedText.length, timeElapsed);
    const currentAccuracy = calculateAccuracy(practiceData.text, typedText);

    setWPM(currentWPM);
    setAccuracy(currentAccuracy);

    // Count errors
    let errorCount = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] !== practiceData.text[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
  };

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    inputRef.current?.focus();
  };

  const handlePause = () => {
    setIsPaused(true);
    setPausedTime((prev) => prev + (Date.now() - currentTime));
  };

  const handleResume = () => {
    setIsPaused(false);
    setCurrentTime(Date.now());
    inputRef.current?.focus();
  };

  const handleRestart = () => {
    resetPractice();
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    if (!isStarted || isPaused || isCompleted) return;

    const value = e.target.value;

    // Prevent typing beyond the text length
    if (value.length > practiceData.text.length) return;

    setTypedText(value);

    // Check if completed
    if (value.length === practiceData.text.length) {
      setIsCompleted(true);
      setIsPaused(true);
    }
  };

  const handleFinish = () => {
    console.log("handleFinish called"); // Debug log
    console.log("Current mode:", mode); // Debug log
    console.log("Typed text length:", typedText.length); // Debug log
    console.log("Practice text length:", practiceData.text.length); // Debug log

    try {
      // Calculate final results based on current state
      const finalAccuracy = calculateAccuracy(practiceData.text, typedText);
      const timeElapsed = (Date.now() - startTime - pausedTime) / 1000 / 60;
      const finalWPM = calculateWPM(typedText.length, timeElapsed);

      console.log("Final stats:", { finalAccuracy, finalWPM, errors }); // Debug log

      setAccur(finalAccuracy);
      setWpm(finalWPM);

      // Save to localStorage for progress tracking
      const results = {
        accuracy: finalAccuracy,
        wpm: finalWPM,
        errors,
        difficulty: mode,
        timestamp: new Date().toISOString(),
        textLength: practiceData.text.length,
        timeElapsed: timeElapsed * 60, // back to seconds
      };

      const storageKey = `typing_result_${mode}_${Date.now()}`;
      localStorage.setItem(storageKey, JSON.stringify(results));
      console.log("Saved to localStorage with key:", storageKey); // Debug log

      const targetUrl = `${ROUTES.progress}/${mode}`;
      console.log("Navigating to:", targetUrl); // Debug log

      // Navigate to progress page
      navigate(targetUrl);
    } catch (error) {
      console.error("Error in handleFinish:", error);
    }
  };

  const getTimeElapsed = () => {
    if (!startTime) return 0;
    return (currentTime - startTime - pausedTime) / 1000;
  };

  const canFinish = typedText.length === practiceData?.text.length;

  if (!practiceData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Section className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg text-gray-600">
              Loading practice content...
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Link to={ROUTES.menu}>
                <Button variant="outline" size="sm">
                  ← Back to Menu
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-darkBlue">
                {practiceData.level.name} Practice
              </h1>
            </div>
            <p className="text-gray-600">{practiceData.level.description}</p>
          </div>

          {/* Stats */}
          <TypingStats
            wpm={wpm}
            accuracy={accuracy}
            timeElapsed={getTimeElapsed()}
            targetWPM={practiceData.level.targetWPM}
          />

          {/* Typing Area */}
          <TypingText
            originalText={practiceData.text}
            typedText={typedText}
            isActive={isStarted && !isPaused && !isCompleted}
          />

          {/* Input Area */}
          <div className="mb-6">
            <textarea
              ref={inputRef}
              value={typedText}
              onChange={handleInputChange}
              disabled={!isStarted || isPaused || isCompleted}
              placeholder={
                isStarted ? "Type here..." : "Click 'Start Typing' to begin"
              }
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              rows={4}
            />
          </div>

          {/* Controls */}
          <TypingControls
            isStarted={isStarted}
            isPaused={isPaused}
            isCompleted={isCompleted}
            canFinish={canFinish}
            onStart={handleStart}
            onPause={handlePause}
            onResume={handleResume}
            onRestart={handleRestart}
            onFinish={handleFinish}
            onNewText={loadNewContent}
          />

          {/* Progress Info */}
          {isStarted && (
            <div className="mt-8 text-center text-gray-600">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  Characters: {typedText.length}/{practiceData.text.length}
                </div>
                <div>Errors: {errors}</div>
                <div>Time: {Math.round(getTimeElapsed())}s</div>
                <div>
                  Completion:{" "}
                  {Math.round(
                    (typedText.length / practiceData.text.length) * 100
                  )}
                  %
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
