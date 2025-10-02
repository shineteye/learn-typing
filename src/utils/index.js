// Utility functions for consistent styling and component behavior

/**
 * Combines class names, filtering out falsy values
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Creates responsive class combinations
 * @param {Object} responsive - Object with breakpoint keys and class values
 * @returns {string} Responsive class names
 */
export const responsive = (responsive) => {
  return Object.entries(responsive)
    .map(([breakpoint, className]) => {
      if (breakpoint === "base") return className;
      return `${breakpoint}:${className}`;
    })
    .join(" ");
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Format typing statistics for display
 * @param {number} wpm - Words per minute
 * @param {number} accuracy - Accuracy percentage
 * @returns {Object} Formatted statistics
 */
export const formatTypingStats = (wpm, accuracy) => {
  return {
    wpm: Math.round(wpm) || 0,
    accuracy: Math.round(accuracy) || 0,
    wpmDisplay: `${Math.round(wpm) || 0} WPM`,
    accuracyDisplay: `${Math.round(accuracy) || 0}%`,
  };
};

/**
 * Calculate typing accuracy
 * @param {string} original - Original text
 * @param {string} typed - Typed text
 * @returns {number} Accuracy percentage
 */
export const calculateAccuracy = (original, typed) => {
  if (!original || !typed) return 0;

  const correctChars = typed.split("").reduce((correct, char, index) => {
    return char === original[index] ? correct + 1 : correct;
  }, 0);

  return (correctChars / original.length) * 100;
};

/**
 * Calculate words per minute
 * @param {number} charactersTyped - Number of characters typed
 * @param {number} timeInMinutes - Time taken in minutes
 * @returns {number} Words per minute
 */
export const calculateWPM = (charactersTyped, timeInMinutes) => {
  if (!timeInMinutes || timeInMinutes === 0) return 0;
  return charactersTyped / 5 / timeInMinutes; // Standard: 5 characters = 1 word
};

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 * @param {number} offset - Offset from top (default: 0)
 */
export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
