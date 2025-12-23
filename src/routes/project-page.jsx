import React, { useState, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import Footer from "../lib/components/footer.jsx";

// Custom hook for scroll animation
const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Status Badge Component with pulse animation
const StatusBadge = ({ status }) => {
  const statusConfig = {
    shipped: {
      text: "shipped",
      bg: "rgba(34, 197, 94, 0.15)",
      border: "rgba(34, 197, 94, 0.3)",
      color: "rgb(134, 239, 172)",
      glow: "rgba(34, 197, 94, 0.4)",
    },
    "in progress": {
      text: "in progress",
      bg: "rgba(59, 130, 246, 0.15)",
      border: "rgba(59, 130, 246, 0.3)",
      color: "rgb(147, 197, 253)",
      glow: "rgba(59, 130, 246, 0.4)",
    },
    paused: {
      text: "paused (thinking)",
      bg: "rgba(251, 191, 36, 0.15)",
      border: "rgba(251, 191, 36, 0.3)",
      color: "rgb(253, 224, 71)",
      glow: "rgba(251, 191, 36, 0.4)",
    },
  };

  const config = statusConfig[status] || statusConfig.shipped;

  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-medium animate-pulse-once"
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        color: config.color,
        boxShadow: status === "in progress" ? `0 0 12px ${config.glow}` : "none",
        animation: status === "in progress" ? "breathe 3s ease-in-out infinite" : "none",
      }}
    >
      {config.text}
    </span>
  );
};

// Tech Tag Chip
const TechChip = ({ tech }) => (
  <span
    className="px-2 py-0.5 rounded-md text-xs"
    style={{
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.6)",
    }}
  >
    {tech}
  </span>
);

// Reality Check Badge
const RealityBadge = ({ type }) => {
  const badges = {
    "harder than expected": "🔥",
    "worth it": "✨",
    "would rebuild again": "🔁",
  };

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <span>{badges[type] || "💭"}</span>
      <span>{type}</span>
    </span>
  );
};

// Experiment Card Component
const ExperimentCard = ({ project, index, isVisible, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{
        background: "rgba(20, 20, 20, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? "0 25px 60px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
          : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
    >
      {/* Top shine line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-2xl blur-xl transition-all duration-500 pointer-events-none"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          opacity: isHovered ? 0.5 : 0,
        }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs text-gray-500 font-mono tracking-wide">
            {project.id}
          </span>
          <StatusBadge status={project.status} />
        </div>

        {/* Project Name */}
        <h3 className="text-xl font-semibold text-white mb-3">{project.name}</h3>

        {/* Hypothesis / Result Flip */}
        <div className="mb-4 min-h-[48px]">
          <p
            className="text-sm text-gray-400 leading-relaxed transition-all duration-500"
            style={{
              opacity: isHovered ? 0 : 1,
              transform: isHovered ? "translateY(-8px)" : "translateY(0)",
              position: isHovered ? "absolute" : "relative",
            }}
          >
            <span className="text-gray-500 text-xs">hypothesis:</span> {project.hypothesis}
          </p>
          <p
            className="text-sm text-gray-300 leading-relaxed transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <span className="text-gray-500 text-xs">result:</span> {project.result}
          </p>
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techPreview.map((tech, idx) => (
            <TechChip key={idx} tech={tech} />
          ))}
        </div>

        {/* Hover CTA */}
        <div
          className="text-center transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <span className="text-xs text-gray-500 italic">click to open the dossier</span>
        </div>
      </div>
    </div>
  );
};

// Dossier Modal Component
const DossierModal = ({ project, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(12px)",
          opacity: isAnimating ? 1 : 0,
        }}
      />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl transition-all duration-500"
        style={{
          background: "rgba(20, 20, 20, 0.95)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.6)",
          opacity: isAnimating ? 1 : 0,
          transform: isAnimating ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top shine line */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none rounded-t-3xl"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full transition-all duration-300 hover:bg-white/10 z-10"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs text-gray-500 font-mono tracking-wide">{project.id}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">{project.name}</h2>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              {project.role && (
                <span className="text-xs text-gray-500">{project.role}</span>
              )}
              {project.timeSpent && (
                <span className="text-xs text-gray-500">• {project.timeSpent}</span>
              )}
            </div>
          </div>

          {/* Dossier Sections */}
          <div className="space-y-6">
            {/* The Problem */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>🧩</span> The Problem
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.problem}</p>
            </div>

            {/* The Idea */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>💡</span> The Idea
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.idea}</p>
            </div>

            {/* The Mess */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>😵</span> The Mess
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.mess}</p>
            </div>

            {/* The Fix */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>🛠</span> The Fix
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.fix}</p>
            </div>

            {/* The Outcome */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>🚀</span> The Outcome
              </h4>
              <p className="text-gray-300 leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* Tech Stack & Details */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs text-gray-500">Tech Stack:</span>
              {project.techStack.map((tech, idx) => (
                <TechChip key={idx} tech={tech} />
              ))}
            </div>

            {/* Reality Check */}
            {project.realityCheck && (
              <div className="flex flex-wrap gap-2">
                {project.realityCheck.map((check, idx) => (
                  <RealityBadge key={idx} type={check} />
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-6 flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                  }}
                >
                  View Live →
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  View Code →
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 16px rgba(59, 130, 246, 0.5); }
        }
      `}</style>
    </div>
  );
};

// Main Projects Page
export default function ProjectPage() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [projectsRef, projectsVisible] = useScrollAnimation(0.1);

  // Sample Projects Data
  const projects = [
    {
      id: "experiment_01",
      name: "Portfolio Website",
      status: "shipped",
      hypothesis: "a portfolio should feel alive, not like a resume PDF.",
      result: "built something I'm actually proud to share.",
      techPreview: ["React", "Spline", "Tailwind"],
      techStack: ["React", "Spline 3D", "Tailwind CSS", "Framer Motion"],
      role: "solo",
      timeSpent: "~3 weeks",
      problem: "traditional portfolios feel static and forgettable.",
      idea: "create an immersive, interactive experience with 3D elements and micro-animations.",
      mess: "spline performance issues, animation timing nightmares, glassmorphism inconsistencies.",
      fix: "lazy loading for 3D, refined animation curves, created a consistent design system.",
      outcome: "a portfolio that actually represents my design sensibilities. still iterating.",
      realityCheck: ["harder than expected", "worth it"],
      liveUrl: "#",
      repoUrl: "https://github.com",
    },
    {
      id: "experiment_02",
      name: "AI Study Assistant",
      status: "in progress",
      hypothesis: "AI can make studying less painful and more personalized.",
      result: "early signs of promise. needs more data.",
      techPreview: ["Python", "OpenAI", "React"],
      techStack: ["Python", "FastAPI", "OpenAI API", "React", "PostgreSQL"],
      role: "solo",
      timeSpent: "~2 weeks (ongoing)",
      problem: "generic study tools don't adapt to how individuals learn.",
      idea: "build an AI tutor that learns your weak spots and adjusts accordingly.",
      mess: "prompt engineering is an art. token limits. response consistency.",
      fix: "fine-tuned prompts, added conversation memory, built feedback loops.",
      outcome: "working prototype. needs user testing and refinement.",
      realityCheck: ["harder than expected", "would rebuild again"],
    },
    {
      id: "experiment_03",
      name: "Expense Tracker",
      status: "shipped",
      hypothesis: "tracking money shouldn't require a finance degree.",
      result: "simple beats complex. people actually use it.",
      techPreview: ["React", "Node.js", "MongoDB"],
      techStack: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
      role: "solo",
      timeSpent: "~2 weeks",
      problem: "most expense apps are bloated with features nobody asked for.",
      idea: "build the simplest possible tracker that still provides insights.",
      mess: "date handling across timezones. chart rendering performance.",
      fix: "moment.js for dates, virtualized lists, lazy chart loading.",
      outcome: "clean, fast, and actually useful. friends use it daily.",
      realityCheck: ["worth it"],
      repoUrl: "https://github.com",
    },
    {
      id: "experiment_04",
      name: "Real-time Chat App",
      status: "shipped",
      hypothesis: "websockets are overkill for simple chat apps.",
      result: "they're not. real-time is real-time.",
      techPreview: ["Socket.io", "React", "Node.js"],
      techStack: ["React", "Node.js", "Socket.io", "Redis", "MongoDB"],
      role: "solo",
      timeSpent: "~2 weeks",
      problem: "wanted to understand real-time communication at a deep level.",
      idea: "build a chat app from scratch without any abstractions.",
      mess: "connection state management. handling disconnects gracefully.",
      fix: "heartbeat mechanism, reconnection logic, optimistic UI updates.",
      outcome: "solid understanding of websockets. app works smoothly.",
      realityCheck: ["harder than expected", "worth it", "would rebuild again"],
      repoUrl: "https://github.com",
    },
    {
      id: "experiment_05",
      name: "Weather Dashboard",
      status: "paused",
      hypothesis: "weather apps can be beautiful AND useful.",
      result: "design is done. API integration pending.",
      techPreview: ["React", "D3.js", "APIs"],
      techStack: ["React", "D3.js", "OpenWeather API", "Tailwind CSS"],
      role: "solo",
      timeSpent: "~1 week",
      problem: "most weather apps prioritize data over experience.",
      idea: "visualize weather in a way that feels intuitive and beautiful.",
      mess: "API rate limits. D3 learning curve. responsive chart scaling.",
      fix: "caching strategy, simplified visualizations, mobile-first approach.",
      outcome: "paused to focus on other priorities. will revisit.",
      realityCheck: ["harder than expected"],
    },
    {
      id: "experiment_06",
      name: "URL Shortener",
      status: "shipped",
      hypothesis: "a weekend project to learn about systems design.",
      result: "learned about databases, caching, and analytics.",
      techPreview: ["Node.js", "Redis", "MongoDB"],
      techStack: ["Node.js", "Express", "Redis", "MongoDB", "Analytics"],
      role: "solo",
      timeSpent: "~3 days",
      problem: "wanted a practical project to understand URL shortening at scale.",
      idea: "build a shortener with analytics and custom slugs.",
      mess: "collision handling for short codes. analytics without slowing down redirects.",
      fix: "base62 encoding, async analytics logging, redis for hot paths.",
      outcome: "simple but taught me a lot about system design trade-offs.",
      realityCheck: ["worth it"],
      repoUrl: "https://github.com",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Spline Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {!splineError ? (
          <Spline
            scene="https://prod.spline.design/pX-RxNY-kD9Fb7ce/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
            onError={() => setSplineError(true)}
          />
        ) : (
          <div
            style={{
              background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>

      {/* Dark Overlay */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-[50vh] flex items-center justify-center px-6 md:px-12 lg:px-24 pt-28 pb-12"
        >
          <div className="text-center max-w-4xl">
            <div
              className={`inline-block mb-6 px-6 py-2 rounded-full text-sm font-medium relative overflow-hidden transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                color: "#E5E7EB",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
              <span className="relative z-10">experiments with side effects</span>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: "200ms" }}
            >
              Experiments Lab
            </h1>

            <p
              className={`text-xl md:text-2xl text-gray-400 transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
            >
              ideas that escaped my head and demanded to be built.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section ref={projectsRef} className="px-6 md:px-12 lg:px-24 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ExperimentCard
                  key={project.id}
                  project={project}
                  index={index}
                  isVisible={projectsVisible}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Ending Line */}
        <div className="text-center py-20 px-6">
          <p className="text-gray-500 text-lg">
            more experiments planned. curiosity undefeated.
          </p>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Dossier Modal */}
      {selectedProject && (
        <DossierModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Loading Screen */}
      {!splineLoaded && (
        <div
          className="fixed inset-0 backdrop-blur-md z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(34, 34, 34, 0.5)" }}
        >
          <div
            className="flex flex-col items-center p-8 rounded-3xl backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(248, 248, 248, 0.025)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "rgba(248, 248, 248, 0.2)",
            }}
          >
            <div
              className="w-16 h-16 border-2 rounded-full animate-spin mb-6"
              style={{
                borderColor: "rgba(248, 248, 248, 0.2)",
                borderTopColor: "rgba(248, 248, 248, 0.8)",
              }}
            />
            <p className="text-white/80 text-lg font-medium">Loading experiments...</p>
          </div>
        </div>
      )}
    </div>
  );
}
