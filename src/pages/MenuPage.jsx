import React, { useContext } from "react";
import { Link } from "react-router-dom";
import beginnerImg from "../assets/imgs/beginner.jpg";
import intermediateImg from "../assets/imgs/inter.jpg";
import professionalImg from "../assets/imgs/pro.jpg";
import MenuCard from "../components/menu/MenuCard";
import Navbar from "../components/navbar/Navbar";
import Button from "../components/ui/Button";
import Section from "../components/ui/Section";
import { ModeContext } from "../contexts/modeContext";
import { APP_CONTENT, ROUTES, TYPING_MODES } from "../constants";

const levelConfig = [
  {
    img: beginnerImg,
    text: APP_CONTENT.menu.levels.beginner,
    level: TYPING_MODES.BEGINNER,
    description: "Perfect for those just starting their typing journey",
  },
  {
    img: intermediateImg,
    text: APP_CONTENT.menu.levels.intermediate,
    level: TYPING_MODES.INTERMEDIATE,
    description: "For those ready to challenge themselves further",
  },
  {
    img: professionalImg,
    text: APP_CONTENT.menu.levels.professional,
    level: TYPING_MODES.PROFESSIONAL,
    description: "Advanced practice for typing masters",
  },
];

export default function MenuPage() {
  const { setMode } = useContext(ModeContext);

  const handleLevelSelect = (level) => {
    setMode(level);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Section>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-darkBlue mb-4">
            {APP_CONTENT.menu.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your difficulty level and start improving your typing skills
            today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {levelConfig.map((config) => (
            <MenuCard
              key={config.level}
              img={config.img}
              text={config.text}
              level={config.level}
              onLevelSelect={handleLevelSelect}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link to={ROUTES.home}>
            <Button variant="outline" size="lg">
              ← {APP_CONTENT.menu.backButton}
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
