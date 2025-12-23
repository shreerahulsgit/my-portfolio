import React, { useState, useEffect, useRef } from "react";

// Custom hook for scroll-triggered animations
const useScrollReveal = (threshold = 0.3) => {
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

// Red Line Component
const RedLine = ({ delay = 0, horizontal = false, className = "" }) => {
  const [ref, isVisible] = useScrollReveal(0.5);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className={`bg-red-600 transition-all duration-[2000ms] ease-out ${
          horizontal ? "h-px" : "w-px"
        }`}
        style={{
          transitionDelay: `${delay}ms`,
          ...(horizontal
            ? { width: isVisible ? "100%" : "0%" }
            : { height: isVisible ? "100%" : "0%" }),
        }}
      />
    </div>
  );
};

// Fade Text Component
const FadeText = ({ children, className = "", delay = 0, align = "center" }) => {
  const [ref, isVisible] = useScrollReveal(0.4);

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1500ms] ease-out ${alignClass[align]} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Full Width Image Component
const HeroImage = ({ src, alt, caption }) => {
  const [ref, isVisible] = useScrollReveal(0.2);
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} className="relative w-full">
      {/* Image container */}
      <div
        className="relative w-full overflow-hidden transition-all duration-[2000ms] ease-out"
        style={{
          filter: isVisible && loaded ? "blur(0px)" : "blur(20px)",
          opacity: isVisible && loaded ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(1.05)",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-[85vh] object-cover"
          onLoad={() => setLoaded(true)}
        />
        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        {/* Left fade */}
        <div
          className="absolute inset-y-0 left-0 w-32 md:w-48 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute inset-y-0 right-0 w-32 md:w-48 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(0,0,0,1) 0%, transparent 100%)",
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-24 md:h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 md:h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Caption */}
      {caption && (
        <div
          className="text-center mt-8 transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible && loaded ? 1 : 0,
            transitionDelay: "800ms",
          }}
        >
          <p className="text-red-600 text-sm tracking-[0.3em] uppercase font-light">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};

// Streak Animation Component
const RedStreak = () => {
  const [ref, isVisible] = useScrollReveal(0.5);

  return (
    <div ref={ref} className="relative h-1 w-full overflow-hidden my-32">
      <div
        className="absolute h-full bg-gradient-to-r from-transparent via-red-600 to-transparent transition-all duration-[1500ms] ease-out"
        style={{
          width: "200px",
          left: isVisible ? "100%" : "-200px",
          filter: "blur(2px)",
          boxShadow: "0 0 20px rgba(220, 38, 38, 0.8)",
        }}
      />
    </div>
  );
};

// Main Sports Page
export default function BeyondSport() {
  const [showOpening, setShowOpening] = useState(false);
  const [openingLineDrawn, setOpeningLineDrawn] = useState(false);

  useEffect(() => {
    // Initial black screen, then fade in
    const timer1 = setTimeout(() => setShowOpening(true), 800);
    const timer2 = setTimeout(() => setOpeningLineDrawn(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ========== OPENING — SILENCE FIRST ========== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8">
        <p
          className="text-xl md:text-2xl font-light tracking-wide text-gray-300 text-center transition-all duration-[2000ms] ease-out"
          style={{
            opacity: showOpening ? 1 : 0,
            transform: showOpening ? "translateY(0)" : "translateY(20px)",
          }}
        >
          some stories don't start with winning.
        </p>

        {/* Opening red line */}
        <div className="mt-12 h-24 overflow-hidden">
          <div
            className="w-px bg-red-600 mx-auto transition-all duration-[2000ms] ease-out"
            style={{
              height: openingLineDrawn ? "96px" : "0px",
            }}
          />
        </div>
      </section>

      {/* ========== CHAPTER I — WAITING (CRICKET) ========== */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32">
        <FadeText align="left" className="max-w-2xl space-y-4">
          <p className="text-2xl md:text-3xl font-light text-gray-400 leading-relaxed">
            this team was always close.
          </p>
          <p className="text-2xl md:text-3xl font-light text-gray-400 leading-relaxed">
            not on the map.
          </p>
          <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
            but in spirit.
          </p>
        </FadeText>

        <FadeText align="left" className="max-w-2xl space-y-4 mt-16" delay={400}>
          <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed">
            familiar colors.
          </p>
          <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed">
            familiar language.
          </p>
          <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed">
            familiar noise.
          </p>
        </FadeText>

        <FadeText align="left" className="max-w-2xl mt-16" delay={800}>
          <p className="text-lg md:text-xl font-light text-gray-500 leading-relaxed">
            support didn't feel chosen.
          </p>
          <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed mt-2">
            it felt inherited.
          </p>
        </FadeText>
      </section>

      {/* Image 1 — Waiting Era */}
      <section className="py-16">
        <HeroImage
          src="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1766381911/244247_b9xgwi.webp"
          alt="Cricket stadium at night with crowd"
          caption="support that felt natural."
        />
      </section>

      {/* Post-image text */}
      <section className="min-h-[50vh] flex items-center justify-center px-8">
        <FadeText delay={200}>
          <p className="text-xl md:text-2xl font-light text-gray-400 tracking-wide">
            staying felt natural.
          </p>
        </FadeText>
      </section>

      {/* Transition to black */}
      <div className="h-48 bg-black" />

      {/* Pre-win text */}
      <section className="min-h-[40vh] flex flex-col items-center justify-center px-8 space-y-4">
        <FadeText delay={0}>
          <p className="text-xl md:text-2xl font-light text-gray-600">
            years of being told
          </p>
        </FadeText>
        <FadeText delay={300}>
          <p className="text-xl md:text-2xl font-light text-gray-500 italic">
            "Ee sala cup namde."
          </p>
        </FadeText>
        <FadeText delay={600}>
          <p className="text-xl md:text-2xl font-light text-gray-600 mt-4">
            year of answering
          </p>
        </FadeText>
        <FadeText delay={900}>
          <p className="text-xl md:text-2xl font-light text-gray-300 italic">
            "Ee sala cup namdu."
          </p>
        </FadeText>
      </section>

      {/* ========== CHAPTER II — RELEASE (THE NIGHT) ========== */}
      <section className="py-16">
        <HeroImage
          src="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1766378383/d58177b0-40b7-11f0-aac2-37f04d2f01bc_1_kgozeb.jpg"
          alt="Victory celebration moment"
          caption="Royal Challenges Bengaluru"
        />
      </section>

      {/* Silence after the win */}
      <div className="h-32 bg-black" />

      {/* Follow-up text */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-8 space-y-6">
        <FadeText delay={0}>
          <p className="text-2xl md:text-3xl font-light text-gray-400">
            not just a trophy.
          </p>
        </FadeText>
        <FadeText delay={400}>
          <p className="text-2xl md:text-3xl font-light text-white">
            validation.
          </p>
        </FadeText>
      </section>

      {/* Hard cut to black */}
      <div className="h-32 bg-black" />

      {/* Bridge line */}
      <section className="min-h-[40vh] flex items-center justify-center px-8">
        <FadeText>
          <p className="text-lg md:text-xl font-light text-gray-600 text-center leading-relaxed">
            when loyalty teaches patience,<br />
            you don't unlearn it.
          </p>
        </FadeText>
      </section>

      {/* ========== CHAPTER III — ANOTHER RED (FORMULA 1) ========== */}
      <RedStreak />

      <section className="min-h-[50vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <FadeText align="right" className="max-w-2xl ml-auto space-y-4">
          <p className="text-2xl md:text-3xl font-light text-gray-400">
            the color stayed.
          </p>
          <p className="text-2xl md:text-3xl font-light text-white">
            the expectations didn't.
          </p>
        </FadeText>
      </section>

      {/* Image 3 — Struggle before the win */}
      <section className="py-16">
        <HeroImage
          src="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1766382669/im-46100193_nr9q0n.avif"
          alt="Racing in rain - moody atmosphere"
          caption="waiting again."
        />
      </section>

      {/* Post-image text */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-8 space-y-6">
        <FadeText delay={0}>
          <p className="text-xl md:text-2xl font-light text-gray-500 tracking-wide">
            belief doesn't reset.
          </p>
        </FadeText>
        <FadeText delay={400}>
          <p className="text-xl md:text-2xl font-light text-gray-300 tracking-wide">
            it waits.
          </p>
        </FadeText>
      </section>

      {/* ========== CHAPTER IV — THE WISH ========== */}
      <section className="py-16">
        <HeroImage
          src="https://res.cloudinary.com/dqqrrgdwd/image/upload/v1766378786/6dwneccoykmd1_vqyesk.jpg"
          alt="Monaco sunlight moment"
          caption="Scuderia Ferrari."
        />
      </section>

      <section className="min-h-[60vh] flex flex-col items-center justify-center px-8 space-y-6">
        <FadeText delay={0}>
          <p className="text-xl md:text-2xl font-light text-gray-500">
            some dreams arrive late.
          </p>
        </FadeText>
        <FadeText delay={500}>
          <p className="text-xl md:text-2xl font-light text-gray-300">
            they still arrive.
          </p>
        </FadeText>
      </section>

      {/* Long pause before final */}
      <div className="h-48 bg-black" />

      {/* ========== FINAL THREAD — WHY RED ========== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8">
        <div className="space-y-16 text-center">
          <FadeText delay={0}>
            <p className="text-xl md:text-2xl font-light text-gray-600">
              some teams feel distant.
            </p>
          </FadeText>

          <FadeText delay={500}>
            <p className="text-xl md:text-2xl font-light text-gray-400">
              this one never did.
            </p>
          </FadeText>

          <FadeText delay={1000}>
            <p className="text-xl md:text-2xl font-light text-gray-500 mt-8">
              it wasn't about winning.
            </p>
          </FadeText>

          <FadeText delay={1400}>
            <p className="text-xl md:text-2xl font-light text-gray-300">
              it was about belonging.
            </p>
          </FadeText>

          {/* Final statement */}
          <FadeText delay={2000}>
            <div className="pt-16">
              <p className="text-4xl md:text-5xl lg:text-6xl font-light text-red-600 tracking-wide">
                red stays.
              </p>
            </div>
          </FadeText>

          {/* Fade out line */}
          <div className="pt-16">
            <RedLine horizontal delay={2800} className="w-24 mx-auto" />
          </div>
        </div>
      </section>

      {/* Final breath */}
      <div className="h-48 bg-black" />

      {/* Subtle ending */}
      <section className="pb-32 flex items-center justify-center">
        <FadeText>
          <p className="text-sm text-gray-700 tracking-[0.3em] uppercase">
            — end of thread —
          </p>
        </FadeText>
      </section>
    </div>
  );
}
