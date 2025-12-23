import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../lib/components/loading-overlay.jsx";
import SplineMasking from "../lib/components/spline-masking.jsx";
import Spline from "@splinetool/react-spline";

// Charge Up Animation Component
const ChargeUpAnimation = ({ onComplete }) => {
  const [count, setCount] = useState(100);
  const [phase, setPhase] = useState("counting"); // counting, dropping, expanding, done
  const [showChargeText, setShowChargeText] = useState(false);
  const [expandScale, setExpandScale] = useState(0);
  const [ballY, setBallY] = useState(48); // Ball sits ON the line (line is at 50%)
  const animationRef = useRef(null);

  // Line width based on count (100% at 100, 0% at 0) - shrinks from right to left
  const lineWidth = (count / 100) * 40; // 40vw max width

  // Countdown from 100 to 0, then immediately start dropping
  useEffect(() => {
    if (phase !== "counting") return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setShowChargeText(true); // Show charge text immediately
          setPhase("dropping"); // Start dropping immediately
          return 0;
        }
        return prev - 1;
      });
    }, 25); // ~2.5 seconds total

    return () => clearInterval(interval);
  }, [phase]);

  // Ball falling from line to bottom with realistic slow gravity
  useEffect(() => {
    if (phase !== "dropping") return;

    let currentY = 48; // Start from on the line
    let velocity = 0;
    const gravity = 0.08; // Very slow, realistic gravity
    const targetY = 88; // Bottom position
    const damping = 0.55; // Realistic bounce damping (loses ~45% energy each bounce)
    let bounces = 0;

    const animate = () => {
      velocity += gravity;
      currentY += velocity;

      // Hit bottom
      if (currentY >= targetY) {
        currentY = targetY;
        velocity = -velocity * damping;
        bounces++;

        // After 3 realistic bounces, start expanding
        if (bounces >= 3 || Math.abs(velocity) < 0.2) {
          setBallY(targetY);
          setPhase("expanding");
          return;
        }
      }

      setBallY(currentY);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase]);

  // Ball expansion from bottom - VERY SLOW and smooth
  useEffect(() => {
    if (phase !== "expanding") return;

    let currentScale = 24; // Start from ball size
    const maxScale = Math.max(window.innerWidth, window.innerHeight) * 3;

    const animate = () => {
      // Very slow, smooth expansion
      const speed = 0.015; // Much slower for premium feel
      currentScale += (maxScale - currentScale) * speed;
      setExpandScale(currentScale);

      if (currentScale >= maxScale * 0.85) {
        setPhase("done");
        onComplete();
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Counter - Bottom Left (hides when Charge Up shows) */}
      {!showChargeText && (
        <div
          className="absolute z-20 transition-opacity duration-300"
          style={{
            bottom: "15%",
            left: "8%",
            opacity: phase === "expanding" || phase === "dropping" ? 0 : 1,
          }}
        >
          <span
            className="text-white/80 text-7xl md:text-9xl font-light"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {count}
          </span>
        </div>
      )}

      {/* Horizontal Energy Line - Center, shrinks from right to left */}
      {phase === "counting" && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${lineWidth}vw`,
            height: "2px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            transition: "width 0.1s ease-out",
          }}
        />
      )}

      {/* Energy Ball - moves from center to bottom */}
      {phase !== "expanding" && phase !== "done" && (
        <div
          className="absolute left-1/2 rounded-full"
          style={{
            width: "24px",
            height: "24px",
            top: `${ballY}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            boxShadow: "0 0 40px rgba(255, 255, 255, 1), 0 0 80px rgba(255, 255, 255, 0.5)",
          }}
        />
      )}

      {/* Expanding Ball from Bottom */}
      {phase === "expanding" && (
        <div
          className="absolute bg-white"
          style={{
            width: `${expandScale}px`,
            height: `${expandScale}px`,
            left: "50%",
            bottom: "0",
            transform: "translateX(-50%)",
            borderRadius: "50% 50% 0 0",
          }}
        />
      )}

      {/* Charge Up Text - Bottom Left (shows briefly during drop) */}
      {showChargeText && phase === "dropping" && (
        <div
          className="absolute z-30 transition-all duration-500 ease-out"
          style={{
            bottom: "15%",
            left: "8%",
            opacity: 1,
          }}
        >
          <span
            className="text-white text-4xl md:text-6xl font-light tracking-[0.2em] uppercase"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Charge Up
          </span>
        </div>
      )}
    </div>
  );
};

// Mobile Home Page Component
const MobileHomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative"
      style={{
        background: "#a0a0a0",
        fontFamily: "Poppins, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Left - Code by text */}
      <div
        className={`absolute top-6 left-5 z-20 transform transition-all duration-700 ${
          isLoaded ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
      >
        <p className="text-white text-xs font-medium tracking-wide">
          @ Code by Shree Rahul
        </p>
      </div>

      {/* Top Right - Description text */}
      <div
        className={`absolute top-6 right-5 z-20 max-w-[180px] text-right transform transition-all duration-700 delay-100 ${
          isLoaded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
        }`}
      >
        <p className="text-white/80 text-[10px] leading-relaxed font-light">
          Passionate Creative Designer and Developer, dedicated to crafting
          innovative solutions and exceptional digital experiences through
          modern technologies
        </p>
      </div>

      {/* Center - Profile Image */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className={`relative transform transition-all duration-1000 delay-300 ${
            isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Profile Image Container */}
          <div
            className="relative w-[280px] h-[350px] overflow-hidden"
            style={{
              filter: "grayscale(100%)",
            }}
          >
            <img
              src="/img/your-photo.jpg"
              alt="Shree Rahul"
              className="w-full h-full object-cover object-top"
              style={{
                mixBlendMode: "luminosity",
              }}
            />
          </div>

          {/* Arrow Button */}
          <div
            className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-500 ${
              isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <div
              onClick={() => navigate("/about")}
              className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center cursor-pointer hover:border-white/70 hover:scale-110 transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <svg
                className="w-5 h-5 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Large Marquee Text */}
      <div
        className={`absolute bottom-24 left-0 right-0 z-10 overflow-hidden transform transition-all duration-1000 delay-600 ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="marquee-container-large">
          <div className="marquee-content-large">
            <span className="marquee-text-large">
              Yoo!!!! Welcome to Shree's digital realm... To know about shree
              hit the about section.
            </span>
            <span className="marquee-text-large">
              Yoo!!!! Welcome to Shree's digital realm... To know about shree
              hit the about section.
            </span>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');
        
        @keyframes marquee-large {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .marquee-container-large {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
        }
        
        .marquee-content-large {
          display: inline-block;
          animation: marquee-large 25s linear infinite;
        }
        
        .marquee-text-large {
          color: #ffffff;
          font-size: 85px;
          font-weight: 600;
          letter-spacing: 3px;
          padding: 0 50px;
          font-family: 'Jura', sans-serif !important;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

// Desktop Home Page Component
const DesktopHomePage = () => {
  const messages = [
    "Yo! I'm Shree Rahul :)",
    "Oh wait! this thing on the right stole my intro :(",
    "To actually know me, hit the about section.",
  ];
  const highlightWords = ["Shree Rahul :)", "stole my intro :(", "About"];
  const [displayedText, setDisplayedText] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const typingTimeout = useRef(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => setTypingStarted(true), 2000);
    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (!typingStarted) return;
    const currentMessage = messages[msgIdx];
    let typeSpeed = isDeleting ? (msgIdx === 0 ? 80 : 30) : 55;
    let holdTime = 2000;

    if (!isDeleting && displayedText.length < currentMessage.length) {
      typingTimeout.current = setTimeout(() => {
        setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
      }, typeSpeed);
    } else if (!isDeleting && displayedText.length === currentMessage.length) {
      typingTimeout.current = setTimeout(() => setIsDeleting(true), holdTime);
    } else if (isDeleting && displayedText.length > 0) {
      typingTimeout.current = setTimeout(() => {
        setDisplayedText(currentMessage.slice(0, displayedText.length - 1));
      }, typeSpeed - 10);
    } else if (isDeleting && displayedText.length === 0) {
      typingTimeout.current = setTimeout(() => {
        setIsDeleting(false);
        setMsgIdx((prev) => (prev + 1) % messages.length);
      }, 600);
    }
    return () => clearTimeout(typingTimeout.current);
  }, [displayedText, isDeleting, msgIdx, typingStarted]);

  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showOverlays, setShowOverlays] = useState(false);

  useEffect(() => {
    if (!splineLoaded) return;

    const timer = setTimeout(() => {
      setShowOverlays(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [splineLoaded]);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        fontFamily: "Aeonik Trial, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <Spline
          scene="https://prod.spline.design/ZgCNkRB0aMxXyHjI/scene.splinecode"
          className="w-full h-full"
          style={{
            pointerEvents: "auto",
            width: "100vw",
            height: "100vh",
          }}
          onLoad={() => {
            setSplineLoaded(true);
          }}
        />
      </div>

      <div className="absolute top-0 left-0 h-full flex items-center z-10 w-full md:w-1/2 px-6 md:px-16 lg:px-23">
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-semibold transition-all duration-300 ease-in-out cursor-pointer w-full"
          style={{
            fontFamily: "'Jura', sans-serif",
            letterSpacing: "1px",
            whiteSpace: "pre-line",
          }}
        >
          {(() => {
            let rendered = [];
            let text = displayedText;
            let idx = 0;
            while (text.length > 0) {
              let found = highlightWords.find((hw) => text.startsWith(hw));
              if (found) {
                rendered.push(
                  <span key={"highlight-" + idx} className="highlight-word">
                    {found}
                  </span>
                );
                text = text.slice(found.length);
                idx++;
                continue;
              }
              let nextPos = Math.min(
                ...highlightWords.map((hw) => {
                  let pos = text.indexOf(hw);
                  return pos === -1 ? text.length : pos;
                })
              );
              let chunk = text.slice(0, nextPos);
              chunk.split(/(\s+)/).forEach((w, i) => {
                if (w.trim()) {
                  rendered.push(
                    <span
                      key={"filled-" + idx + "-" + i}
                      className="filled-word"
                    >
                      {w}
                    </span>
                  );
                } else if (w) {
                  rendered.push(w);
                }
              });
              text = text.slice(nextPos);
              idx++;
            }
            return rendered;
          })()}
          <span className="inline-block w-2 h-8 md:h-10 bg-gray-800 align-bottom animate-blink ml-1"></span>
        </h1>
        <style>
          {`
                        @keyframes blink {
                            0%, 50% { opacity: 1; }
                            51%, 100% { opacity: 0; }
                        }
                        .animate-blink {
                            animation: blink 1s steps(2, start) infinite;
                        }
                        .filled-word {
                            color: #1f2937;
                            font-family: 'Jura', sans-serif !important;
                        }
                        .highlight-word {
                            color: transparent;
                            -webkit-text-stroke: 2px #1f2937;
                            font-family: 'Jura', sans-serif !important;
                        }
                    `}
        </style>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/30 pointer-events-none"></div>



      <SplineMasking splineLoaded={splineLoaded} />

      {!splineLoaded && (
        <LoadingOverlay message="Preparing your portfolio experience" />
      )}
    </div>
  );
};

// Main HomePage Component - switches between Mobile and Desktop
const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showChargeUp, setShowChargeUp] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChargeUpComplete = () => {
    setShowChargeUp(false);
    setAnimationComplete(true);
  };

  return (
    <>
      {showChargeUp && <ChargeUpAnimation onComplete={handleChargeUpComplete} />}
      {animationComplete && (
        <div
          style={{
            opacity: 1,
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          {isMobile ? <MobileHomePage /> : <DesktopHomePage />}
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default HomePage;

