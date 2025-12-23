import React, { useState, useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";
import Footer from "../../lib/components/footer.jsx";

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
    thinking: "rgba(139, 92, 246, 0.3)",
    building: "rgba(59, 130, 246, 0.3)",
    life: "rgba(34, 197, 94, 0.3)",
  };

  return (
    <span
      className="px-2 py-0.5 rounded-md text-xs"
      style={{
        background: colors[type] || "rgba(255, 255, 255, 0.1)",
        color: "rgba(255, 255, 255, 0.7)",
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
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">re-read urge:</span>
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i <= count ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.15)",
              boxShadow: i <= count ? "0 0 6px rgba(255, 255, 255, 0.3)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Book Spine Component
const BookSpine = ({ book, index, isVisible, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

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
      {/* Book Spine */}
      <div
        className="relative h-72 md:h-80 rounded-sm transition-all duration-500"
        style={{
          width: `${spineWidth}px`,
          background: spineColor,
          boxShadow: isHovered
            ? "4px 4px 20px rgba(0, 0, 0, 0.5), inset 1px 0 0 rgba(255, 255, 255, 0.08)"
            : "2px 2px 10px rgba(0, 0, 0, 0.3), inset 1px 0 0 rgba(255, 255, 255, 0.05)",
          transform: isHovered ? "translateY(-12px) rotateY(-3deg)" : "translateY(0)",
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
          className="absolute top-0 inset-x-0 h-1 rounded-t-sm"
          style={{ background: book.accentColor || "rgba(255, 255, 255, 0.1)" }}
        />
      </div>

      {/* Handwritten Note - appears on hover */}
      <div
        className="absolute -top-20 left-1/2 transform transition-all duration-500 pointer-events-none z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered
            ? "translateX(-50%) translateY(0) rotate(-2deg) scale(1)"
            : "translateX(-50%) translateY(10px) rotate(0deg) scale(0.95)",
        }}
      >
        <div
          className="px-4 py-3 rounded-lg shadow-2xl min-w-[160px] max-w-[200px]"
          style={{
            background: "rgba(255, 248, 220, 0.95)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 4px 4px 0 rgba(0, 0, 0, 0.1)",
            transform: "rotate(-2deg)",
          }}
        >
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

// Margin Notes Modal
const MarginNotesModal = ({ book, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    document.body.style.overflow = "hidden";
    return () => {
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
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(12px)",
          opacity: isAnimating ? 1 : 0,
        }}
      />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl transition-all duration-500"
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{book.title}</h2>
            <p className="text-gray-400">{book.author}</p>
          </div>

          {/* Margin Notes */}
          <div className="space-y-6">
            {/* Favorite Idea */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>⭐</span> Favorite idea
              </h4>
              <p className="text-gray-300 leading-relaxed">{book.favoriteIdea}</p>
            </div>

            {/* One Disagreement */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>⚖️</span> One disagreement
              </h4>
              <p className="text-gray-300 leading-relaxed">{book.disagreement}</p>
            </div>

            {/* Question Left */}
            <div className="p-5 rounded-xl" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <span>❓</span> Question it left me with
              </h4>
              <p className="text-gray-300 leading-relaxed">{book.question}</p>
            </div>
          </div>

          {/* Extra Details */}
          <div className="mt-8 pt-6 flex flex-wrap items-center gap-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
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

// Main Books Page
export default function BeyondBooks() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [shelfRef, shelfVisible] = useScrollAnimation(0.1);

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
        <section ref={shelfRef} className="px-6 md:px-12 lg:px-24 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Shelf */}
            <div
              className="relative p-8 rounded-2xl"
              style={{
                background: "rgba(20, 20, 20, 0.5)",
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
            <p className="text-white/80 text-lg font-medium">Loading shelf...</p>
          </div>
        </div>
      )}
    </div>
  );
}
