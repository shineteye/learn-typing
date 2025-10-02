import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { ROUTES } from "../../constants";

export default function MenuCard({ img, text, level, onLevelSelect }) {
  const handleLevelSelect = () => {
    if (onLevelSelect) {
      onLevelSelect(level);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 m-4 flex flex-col">
      <div className="overflow-hidden rounded-lg mb-4">
        <img
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          src={img}
          alt={`${text} difficulty level`}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-darkBlue text-center mb-4">
          {text}
        </h3>

        <Link to={ROUTES.practice}>
          <Button className="w-full" onClick={handleLevelSelect}>
            Start {text}
          </Button>
        </Link>
      </div>
    </div>
  );
}
