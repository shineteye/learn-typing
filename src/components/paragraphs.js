// Practice content organized by difficulty level
const practiceContent = {
  beginner: {
    name: "Beginner",
    description: "Basic letter combinations and simple words",
    content: [
      "the quick brown fox jumps over the lazy dog",
      "hello world this is a simple typing test for beginners",
      "cat dog run fast jump high fall down get up try again",
      "apple orange banana grape cherry lemon lime peach pear",
      "home work play rest read write learn grow think dream",
      "sun moon star cloud rain snow wind fire water earth",
      "red blue green yellow orange purple pink black white gray",
      "one two three four five six seven eight nine ten zero",
    ],
    averageLength: 45,
    timeLimit: 60,
    targetWPM: 20,
  },

  intermediate: {
    name: "Intermediate",
    description: "Longer sentences with punctuation and mixed case",
    content: [
      "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet.",
      "Programming is the art of telling another human what one wants the computer to do. It requires patience and practice.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts. Keep pushing forward.",
      "Technology has revolutionized the way we communicate, work, and live our daily lives in the modern world.",
      "Learning to type efficiently will save you countless hours throughout your career and personal projects.",
      "The best time to plant a tree was 20 years ago. The second best time is now. Start today, grow tomorrow.",
      "In the middle of difficulty lies opportunity. Every challenge is a chance to improve and learn something new.",
      "The only way to do great work is to love what you do. Find your passion and pursue it with dedication.",
    ],
    averageLength: 85,
    timeLimit: 90,
    targetWPM: 35,
  },

  professional: {
    name: "Professional",
    description:
      "Complex text with technical terms, numbers, and special characters",
    content: [
      "The implementation of the new API endpoint requires careful consideration of authentication protocols, rate limiting mechanisms, and proper error handling to ensure system reliability and security compliance.",
      "According to the quarterly financial report (Q3 2024), revenue increased by 15.7% year-over-year, reaching $2.3 million, while operational expenses decreased by 8.2% due to strategic cost optimization initiatives.",
      "The algorithm's time complexity is O(n log n) in the average case, but degrades to O(n²) in the worst-case scenario when the input data is already sorted in reverse order, requiring additional optimization strategies.",
      "Modern web development frameworks like React, Vue.js, and Angular have revolutionized front-end development by introducing component-based architectures, virtual DOM implementations, and reactive data binding mechanisms.",
      "The cybersecurity audit revealed several vulnerabilities: SQL injection risks in the user authentication module, cross-site scripting (XSS) potential in the comment system, and insufficient encryption protocols for sensitive data transmission.",
      "Machine learning models require extensive preprocessing of training data, including normalization, feature extraction, dimensionality reduction, and careful validation to prevent overfitting and ensure generalization capability.",
      "The database migration script must handle schema changes gracefully: adding new indexes, modifying column constraints, updating foreign key relationships, and maintaining data integrity throughout the process.",
      "Enterprise software architecture demands scalability, maintainability, and fault tolerance through microservices design patterns, load balancing strategies, and comprehensive monitoring systems.",
    ],
    averageLength: 160,
    timeLimit: 120,
    targetWPM: 50,
  },
};

// Helper function to get content by difficulty
export const getContentByDifficulty = (difficulty) => {
  const normalizedDifficulty = difficulty.toLowerCase();

  const difficultyMap = {
    beginner: "beginner",
    begin: "beginner",
    easy: "beginner",
    intermediate: "intermediate",
    inter: "intermediate",
    adv: "intermediate",
    advanced: "intermediate",
    professional: "professional",
    pro: "professional",
    expert: "professional",
    hard: "professional",
  };

  const level = difficultyMap[normalizedDifficulty] || "beginner";
  return practiceContent[level];
};

// Get random content from specific difficulty
export const getRandomContent = (difficulty) => {
  const levelContent = getContentByDifficulty(difficulty);
  const randomIndex = Math.floor(Math.random() * levelContent.content.length);
  return {
    text: levelContent.content[randomIndex],
    level: levelContent,
    index: randomIndex,
  };
};

// Validate typing difficulty progression
export const shouldAdvanceLevel = (currentLevel, wpm, accuracy) => {
  const level = getContentByDifficulty(currentLevel);
  return wpm >= level.targetWPM && accuracy >= 90;
};

export default practiceContent;
