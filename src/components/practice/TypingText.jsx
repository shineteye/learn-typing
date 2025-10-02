import React from "react";

const TypingText = ({ originalText, typedText, isActive }) => {
  const renderCharacter = (char, index) => {
    const typedChar = typedText[index];
    let className = "text-xl ";

    if (index < typedText.length) {
      // Character has been typed
      if (typedChar === char) {
        className += "bg-green-200 text-green-800"; // Correct
      } else {
        className += "bg-red-200 text-red-800"; // Incorrect
      }
    } else if (index === typedText.length && isActive) {
      // Current character to type
      className += "bg-blue-200 text-blue-800 animate-pulse";
    } else {
      // Not yet typed
      className += "text-gray-600";
    }

    // Handle spaces
    if (char === " ") {
      return (
        <span key={index} className={className}>
          {index < typedText.length && typedChar !== " " ? "·" : "\u00A0"}
        </span>
      );
    }

    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
  };

  if (!originalText) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <div className="text-gray-500">Loading text...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-gray-200 focus-within:border-blue-300 transition-colors">
      <div className="text-sm text-gray-600 mb-3 font-medium">
        Type the following text:
      </div>
      <div className="leading-relaxed font-mono text-lg">
        {originalText
          .split("")
          .map((char, index) => renderCharacter(char, index))}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Progress: {typedText.length} / {originalText.length} characters (
        {Math.round((typedText.length / originalText.length) * 100)}%)
      </div>
    </div>
  );
};

export default TypingText;
