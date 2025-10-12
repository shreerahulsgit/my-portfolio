import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PortfolioLanding from "./pages/about.jsx";
import ResumePage from "./pages/resume.jsx";
import ResumeLanding from "./pages/resume_landing.jsx";
import ContactPage from "./pages/contact_landing.jsx";
import ContactMain from "./pages/contact_main.jsx";
import StickersPage from "./pages/beyond/beyond_entry.jsx";
import SkillPage from "./pages/SkillPage.jsx";
import SkillLanding from "./pages/skill_landing.jsx";
import BeyondHome from "./pages/beyond/beyond_home.jsx";
import BeyondBooks from "./pages/beyond/beyond_books.jsx";
import BeyondMusic from "./pages/beyond/beyond_music.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<PortfolioLanding />} />
        <Route path="/resume-landing" element={<ResumeLanding />} />
        <Route path="/resume-main" element={<ResumePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact-main" element={<ContactMain />} />
        <Route path="/skills-landing" element={<SkillLanding />} />
        <Route path="/skills" element={<SkillPage />} />
        <Route path="/beyond-entry" element={<StickersPage />} />
        <Route path="/beyond-home" element={<BeyondHome />} />
        <Route path="/beyond/books" element={<BeyondBooks />} />
        <Route path="/beyond/music" element={<BeyondMusic />} />
      </Routes>
    </BrowserRouter>
  );
}
