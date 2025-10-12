import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
} from "lucide-react";
import Spline from "@splinetool/react-spline";

import TargetCursor from "../componentes/TargetCursor";
import Footer from "../componentes/footer";
import { useNavigate } from "react-router-dom";
import NavBar from "../componentes/NavBar";

export default function ContactPage() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <TargetCursor />
      <NavBar
        isLoaded={splineLoaded}
        currentPage="Contact"
        onHomeClick={() => navigate("/")}
        onAboutClick={() => navigate("/about")}
        onResumeClick={() => navigate("/resume-landing")}
        onContactClick={() => navigate("/contact")}
        onSpecialClick={() => navigate("/beyond-entry")}
        onSkillsClick={() => navigate("/skills-landing")}
      />

      <main className="relative w-full h-screen overflow-hidden bg-black">
        {/* Spline Component */}
        <div className="absolute inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/IwR5rpxcV-2dAiRa/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
          />
        </div>

        {/* Glass Button */}
        <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
          <button
            onClick={() => navigate("/contact-main")}
            className="pointer-events-auto relative rounded-2xl w-48 h-20 min-w-48 min-h-20 flex-shrink-0 bg-transparent flex items-center justify-center outline-none focus:outline-none border-none focus:border-none ring-0 focus:ring-0"
          >
            <span className="relative text-white font-medium text-lg tracking-wide drop-shadow-lg"></span>
          </button>
        </div>
      </main>

      {/* Loading Screen */}
      {!splineLoaded && (
        <div className="fixed inset-0 bg-gray-900 z-[100] flex items-center justify-center">
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
