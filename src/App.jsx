import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ModeContext } from "./contexts/modeContext";
import ScoreContext from "./contexts/scoreContext";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import PracticePage from "./pages/PracticePage";
import ProgressPage from "./pages/ProgressPage";

function App() {
  const [mode, setMode] = useState("beginner");
  const [accur, setAccur] = useState(0);
  const [wpm, setWPM] = useState(0);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <ScoreContext.Provider value={{ accur, wpm, setAccur, setWPM }}>
        <div className="mx-10 my-2">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/menu" element={<MenuPage />} />
            <Route exact path="/practice" element={<PracticePage />} />
            <Route exact path="/progress" element={<ProgressPage />} />
            <Route exact path="/progress/:mode" element={<ProgressPage />} />
          </Routes>
        </div>
      </ScoreContext.Provider>
    </ModeContext.Provider>
  );
}

export default App;
