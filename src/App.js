import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import PracticePage from "./pages/PracticePage";
import ProgressPage from "./pages/ProgressPage";

function App() {
  return (
    <div className='flex mx-auto px-10 py-2'>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="menu" element={<MenuPage />} />
        <Route exact path="practice" element={<PracticePage />} />
        <Route exact path="progress" element={<ProgressPage />} />
      </Routes>
    </div>
  );
}

export default App
