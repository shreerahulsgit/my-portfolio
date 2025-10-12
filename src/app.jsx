import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./routes/home-page.jsx";
import AboutPage from "./routes/about-page.jsx";
import BeyondEntry from "./routes/beyond/beyond-entry.jsx";
import BeyondMain from "./routes/beyond/beyond-main.jsx";;
import ResumeEntry from "./routes/resume/resume-entry.jsx";
import ResumeMain from "./routes/resume/resume-main.jsx";
import ContactEntry from "./routes/contact/contact-entry.jsx";
import ContactMain from "./routes/contact/contact-main.jsx";
import SkillsEntry from "./routes/skills/skills-entry.jsx";
import SkillsMain from "./routes/skills/skills-main.jsx";
import BeyondBooks from "./lib/components/beyond-books.jsx";
import BeyondMusic from "./lib/components/beyond-music.jsx"
import TargetCursor from "./lib/components/target-cursor.jsx";
import NavigationBar from "./lib/components/navigation-bar.jsx";

const routeMap = {
  "/": "Home",
  "/about": "About",
  "/beyond": "Special",
  "/beyond/books": "Special",
  "/beyond/music": "Special",
  "/resume": "Resume",
  "/resume/details": "Resume",
  "/contact": "Contact",
  "/contact/form": "Contact",
  "/skills": "Skills",
  "/skills/details": "Skills",
};

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = routeMap[location.pathname] || "";
  const showNavbar = !!currentPage;

  return (
    <>
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      {showNavbar && (
        <NavigationBar
          currentPage={currentPage}
          onHomeClick={() => navigate("/")}
          onAboutClick={() => navigate("/about")}
          onSpecialClick={() => navigate("/beyond")}
          onResumeClick={() => navigate("/resume")}
          onContactClick={() => navigate("/contact")}
          onSkillsClick={() => navigate("/skills")}
        />
      )}
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/*" element={<Navigate to="/about" replace />} />

          <Route path="/beyond" element={<BeyondEntry />} />
          <Route path="/beyond/overview" element={<BeyondMain />} />
          <Route path="/beyond/books" element={<BeyondBooks />} />
          <Route path="/beyond/music" element={<BeyondMusic />} />
          <Route path="/beyond/*" element={<Navigate to="/beyond/overview" replace />} />

          <Route path="/resume" element={<ResumeEntry />} />
          <Route path="/resume/details" element={<ResumeMain />} />
          <Route path="/resume/*" element={<Navigate to="/resume/details" replace />} />

          <Route path="/contact" element={<ContactEntry />} />
          <Route path="/contact/form" element={<ContactMain />} />
          <Route path="/contact/*" element={<Navigate to="/contact/form" replace />} />

          <Route path="/skills" element={<SkillsEntry />} />
          <Route path="/skills/details" element={<SkillsMain />} />
          <Route path="/skills/*" element={<Navigate to="/skills/details" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
