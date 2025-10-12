import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import NavBar from "../componentes/NavBar";
import TargetCursor from "../componentes/TargetCursor";

export default function ResumeLanding() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">
      <TargetCursor />
      <NavBar
        isLoaded={splineLoaded}
        currentPage="Resume"
        onHomeClick={() => navigate("/")}
        onAboutClick={() => navigate("/about")}
        onResumeClick={() => navigate("/resume-landing")}
        onContactClick={() => navigate("/contact")}
        onSpecialClick={() => navigate("/beyond-entry")}
      />
      <main className="relative w-full h-screen overflow-hidden bg-black">
        {/* Spline Component */}
        <div className="absolute inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/CR14wstmPsHYmPZv/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
          />
        </div>

        {/* Glass Button */}
<div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none pt-80">
  <button
    onClick={() => navigate("/resume-main")}
    className="pointer-events-auto group relative overflow-hidden rounded-full px-6 py-3 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
  >
    {/* Shiny overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
    
    {/* Text */}
    <span className="relative text-white font-medium text-sm tracking-wide drop-shadow">
      SEE RESUME
    </span>

    {/* Glow hover effect */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
  </button>
</div>

      </main>

      {/* Loading Screen */}
      {!splineLoaded && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-white/70 text-sm">
              Loading Interactive Experience...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
