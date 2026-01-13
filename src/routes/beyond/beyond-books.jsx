import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Footer from "../../lib/components/footer.jsx";

// ============================================
// TYPEWRITER TEXT COMPONENT
// ============================================
const TypewriterText = ({ text, delay = 0, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [displayedText, text, speed, started]);

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

// ============================================
// STARFIELD BACKGROUND
// ============================================
const Starfield = () => {
  const stars = useMemo(() => Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    twinkleDelay: Math.random() * 5,
  })), []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Pure black background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000000",
        }}
      />
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "white",
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity})`,
            animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ============================================
// COFFEE STAIN COMPONENT
// ============================================
const CoffeeStains = () => {
  const stains = [
    { left: '5%', top: '60%', size: 80, opacity: 0.04, rotation: 15 },
    { right: '10%', top: '40%', size: 60, opacity: 0.03, rotation: -20 },
    { left: '70%', bottom: '20%', size: 100, opacity: 0.035, rotation: 45 },
  ];

  return (
    <>
      {stains.map((stain, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: stain.left,
            right: stain.right,
            top: stain.top,
            bottom: stain.bottom,
            width: `${stain.size}px`,
            height: `${stain.size}px`,
            borderRadius: '50%',
            border: `2px solid rgba(139, 90, 43, ${stain.opacity})`,
            opacity: stain.opacity * 10,
            transform: `rotate(${stain.rotation}deg)`,
            boxShadow: `inset 0 0 10px rgba(139, 90, 43, ${stain.opacity * 0.5})`,
          }}
        />
      ))}
    </>
  );
};

// ============================================
// INK SPLATTER COMPONENT
// ============================================
const InkSplatters = () => {
  const splatters = [
    { left: '15%', top: '25%', size: 6, opacity: 0.15 },
    { left: '16%', top: '26%', size: 3, opacity: 0.1 },
    { right: '20%', top: '55%', size: 4, opacity: 0.12 },
    { left: '80%', top: '35%', size: 5, opacity: 0.1 },
  ];

  return (
    <>
      {splatters.map((splatter, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: splatter.left,
            right: splatter.right,
            top: splatter.top,
            width: `${splatter.size}px`,
            height: `${splatter.size}px`,
            background: `rgba(30, 30, 50, ${splatter.opacity})`,
          }}
        />
      ))}
    </>
  );
};

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

// Influence Tag Component
const InfluenceTag = ({ type }) => {
  const colors = {
    thinking: { bg: "rgba(139, 92, 246, 0.8)", text: "#ffffff" },
    building: { bg: "rgba(59, 130, 246, 0.8)", text: "#ffffff" },
    life: { bg: "rgba(34, 197, 94, 0.8)", text: "#ffffff" },
  };

  return (
    <span
      className="px-3 py-1 rounded-md text-xs font-semibold"
      style={{
        background: colors[type]?.bg || "rgba(100, 100, 100, 0.8)",
        color: colors[type]?.text || "#ffffff",
      }}
    >
      {type}
    </span>
  );
};

// Re-read Urge Indicator
const RereadUrge = ({ level }) => {
  const levels = { low: 1, medium: 2, high: 3 };
  const count = levels[level] || 1;

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-md" style={{ background: 'rgba(0,0,0,0.08)' }}>
      <span className="text-xs font-semibold text-gray-700">re-read urge:</span>
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              background: i <= count ? "#f59e0b" : "rgba(0, 0, 0, 0.15)",
              boxShadow: i <= count ? "0 0 6px rgba(245, 158, 11, 0.5)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// BOOK SPINE WITH PULL ANIMATION & BOOKMARK
// ============================================
const BookSpine = ({ book, index, isVisible, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulled, setIsPulled] = useState(false);

  // Vary spine width slightly for realism
  const widthVariants = [52, 48, 56, 50, 54, 46];
  const spineWidth = widthVariants[index % widthVariants.length];

  // Subtle color variations
  const colorVariants = [
    "linear-gradient(180deg, rgba(40, 40, 45, 0.9), rgba(30, 30, 35, 0.95))",
    "linear-gradient(180deg, rgba(35, 35, 40, 0.9), rgba(25, 25, 30, 0.95))",
    "linear-gradient(180deg, rgba(45, 40, 45, 0.9), rgba(35, 30, 35, 0.95))",
    "linear-gradient(180deg, rgba(38, 42, 48, 0.9), rgba(28, 32, 38, 0.95))",
    "linear-gradient(180deg, rgba(42, 38, 45, 0.9), rgba(32, 28, 35, 0.95))",
  ];
  const spineColor = colorVariants[index % colorVariants.length];

  // Bookmark ribbon color based on first influence type
  const ribbonColors = {
    thinking: "#8b5cf6",
    building: "#3b82f6",
    life: "#22c55e",
  };
  const ribbonColor = ribbonColors[book.influence?.[0]] || "#666";
  const showBookmark = true; // Show ribbon on all books

  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => setIsPulled(true), 150);
      return () => clearTimeout(timer);
    } else {
      setIsPulled(false);
    }
  }, [isHovered]);

  return (
    <div
      className={`relative cursor-pointer transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: `${index * 80}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
    >
      {/* Bookmark Ribbon */}
      {showBookmark && (
        <div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-300"
          style={{
            width: '12px',
            height: isHovered ? '28px' : '20px',
            background: ribbonColor,
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        />
      )}

      {/* Book Spine */}
      <div
        className="relative h-72 md:h-80 rounded-sm transition-all duration-500"
        style={{
          width: `${spineWidth}px`,
          background: spineColor,
          boxShadow: isHovered
            ? `4px 4px 20px rgba(0, 0, 0, 0.5), inset 1px 0 0 rgba(255, 255, 255, 0.08), 0 0 30px ${book.accentColor}`
            : "2px 2px 10px rgba(0, 0, 0, 0.3), inset 1px 0 0 rgba(255, 255, 255, 0.05)",
          transform: isPulled 
            ? "translateY(-20px) translateZ(30px) rotateY(-8deg)" 
            : isHovered 
              ? "translateY(-5px)" 
              : "translateY(0)",
          transformOrigin: "bottom center",
        }}
      >
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Spine edge highlight */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: "rgba(255, 255, 255, 0.1)" }}
        />

        {/* Title - vertical */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-1">
          <span
            className="text-white text-xs font-medium tracking-wide text-center leading-tight"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              maxHeight: "70%",
              overflow: "hidden",
            }}
          >
            {book.title}
          </span>
        </div>

        {/* Author - bottom */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center">
          <span
            className="text-gray-500 text-[8px] tracking-wide text-center"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {book.author.split(" ").pop()}
          </span>
        </div>

        {/* Top accent */}
        <div
          className="absolute top-0 inset-x-0 h-1 rounded-t-sm transition-all duration-300"
          style={{ 
            background: book.accentColor || "rgba(255, 255, 255, 0.1)",
            boxShadow: isHovered ? `0 0 15px ${book.accentColor}` : 'none',
          }}
        />
      </div>

      {/* Handwritten Note - appears after pull */}
      <div
        className="absolute -top-24 left-1/2 transform transition-all duration-500 pointer-events-none z-20"
        style={{
          opacity: isPulled ? 1 : 0,
          transform: isPulled
            ? "translateX(-50%) translateY(0) rotate(-2deg) scale(1)"
            : "translateX(-50%) translateY(15px) rotate(0deg) scale(0.9)",
        }}
      >
        <div
          className="px-4 py-3 rounded-lg shadow-2xl min-w-[160px] max-w-[200px] relative"
          style={{
            background: "rgba(255, 248, 220, 0.95)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 4px 4px 0 rgba(0, 0, 0, 0.1)",
            transform: "rotate(-2deg)",
          }}
        >
          {/* Ink splatter on note */}
          <div 
            className="absolute top-2 right-3 w-2 h-2 rounded-full"
            style={{ background: 'rgba(30, 30, 80, 0.15)' }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{
              color: "#2d2d2d",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
            }}
          >
            "{book.note}"
          </p>
        </div>
        {/* Note corner fold */}
        <div
          className="absolute -bottom-1 right-0 w-4 h-4"
          style={{
            background: "linear-gradient(135deg, rgba(255, 248, 220, 0.95) 50%, transparent 50%)",
          }}
        />
      </div>
    </div>
  );
};

// ============================================
// PAGE FLIP MODAL
// ============================================
const MarginNotesModal = ({ book, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [pageFlipped, setPageFlipped] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const flipTimer = setTimeout(() => setPageFlipped(true), 300);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(flipTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(12px)",
          opacity: isAnimating ? 1 : 0,
        }}
      />

      {/* Book/Page Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto transition-all duration-700"
        style={{
          background: "linear-gradient(135deg, #f5f0e6 0%, #ebe6dc 50%, #e8e3d9 100%)",
          borderRadius: '4px',
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.6), -5px 0 20px rgba(0,0,0,0.2) inset",
          opacity: isAnimating ? 1 : 0,
          transform: isAnimating 
            ? `perspective(1000px) rotateY(${pageFlipped ? '0deg' : '-90deg'})` 
            : "perspective(1000px) rotateY(-90deg)",
          transformOrigin: 'left center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Page texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Page edge shadow */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.1), transparent)',
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full transition-all duration-300 hover:bg-black/10 z-10"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-8 border-b-2 border-gray-300 pb-4">
            <h2 
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: '#2d2d2d', fontFamily: "'Georgia', serif" }}
            >
              {book.title}
            </h2>
            <p className="text-gray-600 italic">{book.author}</p>
          </div>

          {/* Margin Notes with Typewriter */}
          <div className="space-y-6">
            {/* Favorite Idea */}
            <div className="p-5 rounded-lg border-l-4" style={{ borderColor: '#22c55e', background: 'rgba(255,255,255,0.5)' }}>
              <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                <span>⭐</span> Favorite idea
              </h4>
              <p className="text-gray-800 leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
                {pageFlipped && <TypewriterText text={book.favoriteIdea} delay={400} speed={25} />}
              </p>
            </div>

            {/* One Disagreement */}
            <div className="p-5 rounded-lg border-l-4" style={{ borderColor: '#f59e0b', background: 'rgba(255,255,255,0.5)' }}>
              <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                <span>⚖️</span> One disagreement
              </h4>
              <p className="text-gray-800 leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
                {pageFlipped && <TypewriterText text={book.disagreement} delay={1500} speed={25} />}
              </p>
            </div>

            {/* Question Left */}
            <div className="p-5 rounded-lg border-l-4" style={{ borderColor: '#8b5cf6', background: 'rgba(255,255,255,0.5)' }}>
              <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                <span>❓</span> Question it left me with
              </h4>
              <p className="text-gray-800 leading-relaxed" style={{ fontFamily: "'Georgia', serif" }}>
                {pageFlipped && <TypewriterText text={book.question} delay={2600} speed={25} />}
              </p>
            </div>
          </div>

          {/* Extra Details */}
          <div className="mt-8 pt-6 flex flex-wrap items-center gap-4" style={{ borderTop: "2px solid rgba(0, 0, 0, 0.1)" }}>
            {book.rereadUrge && <RereadUrge level={book.rereadUrge} />}
            
            {book.influence && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">influenced:</span>
                {book.influence.map((tag, idx) => (
                  <InfluenceTag key={idx} type={tag} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN BOOKS PAGE
// ============================================
export default function BeyondBooks() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const containerRef = useRef(null);

  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [shelfRef, shelfVisible] = useScrollAnimation(0.1);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // Books Data
  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      accentColor: "rgba(59, 130, 246, 0.5)",
      note: "the 1% rule changed how I think about progress.",
      favoriteIdea: "you don't rise to the level of your goals, you fall to the level of your systems.",
      disagreement: "not every habit needs to be optimized. some chaos is good.",
      question: "at what point does habit-tracking become another form of procrastination?",
      rereadUrge: "high",
      influence: ["thinking", "life"],
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      accentColor: "rgba(139, 92, 246, 0.5)",
      note: "made me rethink my relationship with notifications.",
      favoriteIdea: "attention is the new currency. protect it like one.",
      disagreement: "not everyone has the privilege to 'go dark' for hours.",
      question: "is shallow work always bad, or can it serve a purpose?",
      rereadUrge: "medium",
      influence: ["building", "life"],
    },
    {
      title: "The Design of Everyday Things",
      author: "Don Norman",
      accentColor: "rgba(34, 197, 94, 0.5)",
      note: "now I see bad design everywhere. thanks, I guess.",
      favoriteIdea: "when something goes wrong, blame the design not the user.",
      disagreement: "sometimes users are just... not paying attention.",
      question: "how do you design for distracted humans without dumbing things down?",
      rereadUrge: "high",
      influence: ["building", "thinking"],
    },
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      accentColor: "rgba(251, 191, 36, 0.5)",
      note: "my brain lies to me. now I know how.",
      favoriteIdea: "system 1 is fast but dumb. system 2 is smart but lazy.",
      disagreement: "some biases might actually be useful shortcuts.",
      question: "can you ever truly override your cognitive biases?",
      rereadUrge: "medium",
      influence: ["thinking"],
    },
    {
      title: "Show Your Work!",
      author: "Austin Kleon",
      accentColor: "rgba(236, 72, 153, 0.5)",
      note: "made building in public feel less scary.",
      favoriteIdea: "share your process, not just your finished work.",
      disagreement: "sometimes you need to cook in private before serving.",
      question: "where's the line between sharing and performing?",
      rereadUrge: "low",
      influence: ["building", "life"],
    },
    {
      title: "The Pragmatic Programmer",
      author: "Hunt & Thomas",
      accentColor: "rgba(99, 102, 241, 0.5)",
      note: "DRY and tracer bullets. simple but powerful.",
      favoriteIdea: "don't leave broken windows. fix them or board them up.",
      disagreement: "sometimes you need to break things to learn.",
      question: "how pragmatic is too pragmatic?",
      rereadUrge: "high",
      influence: ["building"],
    },
    {
      title: "Sapiens",
      author: "Yuval Harari",
      accentColor: "rgba(168, 85, 247, 0.5)",
      note: "made me feel both tiny and responsible.",
      favoriteIdea: "shared myths hold societies together. money is just a story.",
      disagreement: "oversimplifies some historical nuances.",
      question: "what new myths are we creating right now?",
      rereadUrge: "medium",
      influence: ["thinking", "life"],
    },
    {
      title: "Clean Code",
      author: "Robert Martin",
      accentColor: "rgba(20, 184, 166, 0.5)",
      note: "names matter. a lot more than I thought.",
      favoriteIdea: "code should read like well-written prose.",
      disagreement: "sometimes 'clean' is just someone's opinion.",
      question: "is there a universal definition of clean code?",
      rereadUrge: "low",
      influence: ["building"],
    },
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Starfield Background */}
      <Starfield />

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
              <span className="relative z-10">not summaries. just thoughts left behind.</span>
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300 transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: "200ms" }}
            >
              Annotated Shelf
            </h1>

            <p
              className={`text-xl md:text-2xl text-gray-400 transform transition-all duration-1000 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
            >
              books that left notes in my head.
            </p>
          </div>
        </section>

        {/* Bookshelf Section */}
        <section ref={shelfRef} className="px-6 md:px-12 lg:px-24 py-16 relative">
          {/* Coffee Stains */}
          <CoffeeStains />
          
          {/* Ink Splatters */}
          <InkSplatters />

          <div className="max-w-6xl mx-auto">
            {/* Shelf */}
            <div
              className="relative p-8 rounded-2xl"
              style={{
                background: "rgba(20, 20, 20, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Shelf surface */}
              <div
                className="absolute bottom-6 inset-x-8 h-3 rounded-b-lg"
                style={{
                  background: "linear-gradient(180deg, rgba(60, 50, 40, 0.8), rgba(40, 35, 30, 0.9))",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                }}
              />

              {/* Books */}
              <div className="flex flex-wrap justify-center items-end gap-2 md:gap-3 pb-4">
                {books.map((book, index) => (
                  <BookSpine
                    key={book.title}
                    book={book}
                    index={index}
                    isVisible={shelfVisible}
                    onOpen={() => setSelectedBook(book)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ending Line */}
        <div className="text-center py-20 px-6">
          <p className="text-gray-500 text-lg">
            this shelf is unfinished. that's the point.
          </p>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Margin Notes Modal */}
      {selectedBook && (
        <MarginNotesModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
