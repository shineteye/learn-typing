import React from "react";
import { Link } from "react-router-dom";
import Keyboard from "../assets/imgs/keyboard_500px.png";
import Navbar from "../components/navbar/Navbar";
import Button from "../components/ui/Button";
import Section from "../components/ui/Section";
import { APP_CONTENT, ROUTES } from "../constants";

const HeroSection = () => (
  <Section padding="lg" className="relative">
    <div className="flex flex-col items-center gap-12 md:flex-row-reverse md:gap-16">
      {/* Hero Image */}
      <div className="flex-1 flex justify-center">
        <img
          className="w-full max-w-md md:max-w-lg lg:max-w-xl transform hover:scale-105 transition-transform duration-300"
          src={Keyboard}
          alt="Typing keyboard for practice"
        />
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-darkBlue leading-tight">
          {APP_CONTENT.landing.hero.title}
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-lg">
          {APP_CONTENT.landing.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link to={ROUTES.menu}>
            <Button size="lg" className="w-full sm:w-auto">
              {APP_CONTENT.landing.cta.primary}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              document.getElementById("mission").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {APP_CONTENT.landing.cta.secondary}
          </Button>
        </div>
      </div>
    </div>
  </Section>
);

const MissionSection = () => (
  <Section id="mission" className="bg-gray-50">
    <div className="flex flex-col items-center text-center space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold text-darkBlue">
        {APP_CONTENT.landing.hero.mission}
      </h2>

      <p className="text-xl md:text-2xl text-gray-700 max-w-3xl">
        {APP_CONTENT.landing.hero.missionText}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl">
        <FeatureCard
          title="Track Progress"
          description="Monitor your typing speed and accuracy improvement over time"
          icon="📊"
        />
        <FeatureCard
          title="Multiple Levels"
          description="Choose from beginner to professional difficulty levels"
          icon="🎯"
        />
        <FeatureCard
          title="Real-time Feedback"
          description="Get instant feedback on your typing performance"
          icon="⚡"
        />
      </div>
    </div>
  </Section>
);

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="text-4xl mb-4 text-center">{icon}</div>
    <h3 className="text-xl font-semibold text-darkBlue mb-2 text-center">
      {title}
    </h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <MissionSection />
    </div>
  );
}
