import React from "react";
import GetTweetData from "./GetTweetData";
import { logo } from "../assets";
import { useState, useEffect } from "react";

function GradientBall() {
  const [overallFeeling, setOverallFeeling] = useState("unknown");

  useEffect(() => {
    const data = GetTweetData();
    const overallFeeling =
      data.overall_analysis_data.overall_most_prominent_emotion;
    setOverallFeeling(overallFeeling);
  }, []);

  const gradient = {
    background: "linear-gradient(45deg, #6DC543 0%, #F37C7C 150%)",
  };

  return (
    <div id="Emotions" className="flex justify-center items-center">
      <div id="circle" className="w-[50px] h-[50px] rounded-full" style={gradient}>
        {/* Render different icons based on the overall feeling */}
        {overallFeeling === "joy" && <span role="img" aria-label="Joy">😄</span>}
        {overallFeeling === "anger" && <span role="img" aria-label="Anger">😠</span>}
        {overallFeeling === "sadness" && <span role="img" aria-label="Sadness">😢</span>}
      </div>
      <p className="ml-4 hidden md:block text-[20px]">{overallFeeling.charAt(0).toUpperCase() + overallFeeling.slice(1)}</p>
    </div>
  );
}

function Header() {
  return (
    <header className="w-full h-[60px] px-8 flex justify-between items-center text-[40px] md:text-64px relative">
      <a href="/" className="font-serif">
        Serene
      </a>
      <a href="/dashboard">
        <GradientBall />
      </a>
      <div className="relative group">
        <a href="/authorize/twitter" className="relative">
          <img
            src={logo}
            alt="logo"
            className="w-[50px] h-[50px] rounded-full border-black border-[3px]"
          />
          <span className="absolute top-full left-[-16px] transform -translate-x-1/2 mt-2 w-max bg-black text-white text-center text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Login with Twitter
          </span>
        </a>
      </div>
    </header>
  );
}

export default Header;
