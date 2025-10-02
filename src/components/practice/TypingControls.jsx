import React from "react";
import Button from "../ui/Button";

const TypingControls = ({
  isStarted,
  isPaused,
  isCompleted,
  canFinish,
  onStart,
  onPause,
  onResume,
  onRestart,
  onFinish,
  onNewText,
}) => {
  if (isCompleted) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Button onClick={onRestart} variant="secondary">
          Try Again
        </Button>
        <Button onClick={onNewText}>New Text</Button>
        <Button
          onClick={() => {
            console.log("View Results button clicked"); // Debug log
            onFinish();
          }}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          View Results
        </Button>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="flex justify-center">
        <Button onClick={onStart} size="lg" className="px-12">
          Start Typing
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      {isPaused ? (
        <Button onClick={onResume} className="bg-green-500 hover:bg-green-600">
          Resume
        </Button>
      ) : (
        <Button onClick={onPause} className="bg-yellow-500 hover:bg-yellow-600">
          Pause
        </Button>
      )}

      <Button onClick={onRestart} variant="secondary">
        Restart
      </Button>

      <Button onClick={onNewText} variant="outline">
        New Text
      </Button>

      <Button
        onClick={onFinish}
        disabled={!canFinish}
        className={canFinish ? "bg-green-500 hover:bg-green-600" : ""}
      >
        Finish
      </Button>
    </div>
  );
};

export default TypingControls;
