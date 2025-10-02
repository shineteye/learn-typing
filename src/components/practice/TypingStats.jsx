import React from "react";

const TypingStats = ({ wpm, accuracy, timeElapsed, targetWPM }) => {
  const getAccuracyColor = (acc) => {
    if (acc >= 95) return "text-green-600";
    if (acc >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const getWPMColor = (current, target) => {
    if (current >= target) return "text-green-600";
    if (current >= target * 0.8) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-darkBlue">
            {Math.round(wpm) || 0}
          </div>
          <div className="text-sm text-gray-600">WPM</div>
          <div className={`text-xs ${getWPMColor(wpm, targetWPM)}`}>
            Target: {targetWPM}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className={`text-2xl font-bold ${getAccuracyColor(accuracy)}`}>
            {Math.round(accuracy) || 0}%
          </div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-darkBlue">
            {Math.round(timeElapsed) || 0}s
          </div>
          <div className="text-sm text-gray-600">Time</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-lg font-bold text-darkBlue">
            {Math.round((accuracy * wpm) / 100) || 0}
          </div>
          <div className="text-sm text-gray-600">Net WPM</div>
        </div>
      </div>
    </div>
  );
};

export default TypingStats;
