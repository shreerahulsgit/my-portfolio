import React, { useState, useEffect, useRef } from "react";

// Custom hook for scroll-triggered animations
const useScrollReveal = (threshold = 0.4) => {
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

// Fade Text with delay
const FadeBlock = ({ children, className = "", delay = 0, align = "center" }) => {
  const [ref, isVisible] = useScrollReveal(0.5);

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1800ms] ease-out ${alignClass[align]} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(25px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Social Link with hover
const SocialLink = ({ platform, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const urls = {
    instagram: "https://instagram.com",
    snapchat: "https://snapchat.com",
    x: "https://x.com",
  };

  return (
    <a
      href={urls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="block py-2 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="text-gray-400 transition-all duration-300"
        style={{
          textDecoration: isHovered ? "underline" : "none",
          textDecorationColor: isHovered ? "#dc2626" : "transparent",
          textUnderlineOffset: "4px",
          color: isHovered ? "#f5f5f5" : undefined,
        }}
      >
        {platform}
      </span>
      <span className="text-gray-600 ml-2">— {description}</span>
    </a>
  );
};

// Main Random Page
export default function BeyondRandom() {
  const [showOpening1, setShowOpening1] = useState(false);
  const [showOpening2, setShowOpening2] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowOpening1(true), 1000);
    const timer2 = setTimeout(() => setShowOpening2(true), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ========== OPENING ========== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8">
        <p
          className="text-lg md:text-xl font-light text-gray-500 transition-all duration-[2000ms] ease-out"
          style={{
            opacity: showOpening1 ? 1 : 0,
            transform: showOpening1 ? "translateY(0)" : "translateY(15px)",
          }}
        >
          this isn't important.
        </p>

        <p
          className="text-lg md:text-xl font-light text-gray-400 mt-12 transition-all duration-[2000ms] ease-out"
          style={{
            opacity: showOpening2 ? 1 : 0,
            transform: showOpening2 ? "translateY(0)" : "translateY(15px)",
          }}
        >
          but you're here anyway.
        </p>
      </section>

      {/* ========== BLOCK 1 — IDENTITY SNEAKS IN ========== */}
      <section className="min-h-[70vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <FadeBlock align="left" className="max-w-xl space-y-2">
          <p className="text-2xl md:text-3xl font-light text-gray-400 leading-relaxed">
            born into a land
          </p>
          <p className="text-2xl md:text-3xl font-light text-gray-400 leading-relaxed">
            that doesn't shout.
          </p>
        </FadeBlock>

        <FadeBlock align="left" className="max-w-xl mt-8" delay={600}>
          <p className="text-xl md:text-2xl font-light text-white">
            it hums.
          </p>
        </FadeBlock>
      </section>

      {/* Offset block */}
      <section className="min-h-[50vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <FadeBlock align="right" className="max-w-xl ml-auto space-y-2">
          <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed">
            some languages are picked up.
          </p>
          <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
            this one picked me.
          </p>
        </FadeBlock>

        <FadeBlock align="right" className="max-w-xl ml-auto mt-12" delay={500}>
          <p className="text-lg md:text-xl font-light text-red-600">
            proudly kannadiga.
          </p>
          <p className="text-sm text-gray-600 mt-1 italic">
            (felt, not announced.)
          </p>
        </FadeBlock>
      </section>

      {/* ========== BLOCK 2 — HUMOR ENTERS ========== */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-8">
        <FadeBlock>
          <p className="text-xl md:text-2xl font-light text-gray-400">
            i tried being neutral once.
          </p>
        </FadeBlock>

        <FadeBlock delay={500}>
          <p className="text-xl md:text-2xl font-light text-gray-300 mt-4">
            didn't last.
          </p>
        </FadeBlock>

        <FadeBlock delay={1000} className="mt-8">
          <p className="text-sm text-gray-600">
            turns out belonging is stubborn.
          </p>
        </FadeBlock>
      </section>

      {/* ========== BLOCK 3 — SELF-AWARENESS ========== */}
      <section className="min-h-[50vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <FadeBlock align="left" className="max-w-xl space-y-2">
          <p className="text-xl md:text-2xl font-light text-gray-500">
            not everything about me
          </p>
          <p className="text-xl md:text-2xl font-light text-gray-500">
            fits neatly here.
          </p>
        </FadeBlock>

        <FadeBlock align="left" className="max-w-xl mt-12" delay={800}>
          <p className="text-xl md:text-2xl font-light text-gray-300">
            honestly, that's a relief.
          </p>
        </FadeBlock>
      </section>

      {/* ========== BLOCK 4 — PAUSE THE SCROLL ========== */}
      <div className="h-48 bg-black" />

      <section className="min-h-[40vh] flex flex-col items-center justify-center px-8">
        <FadeBlock>
          <p className="text-lg md:text-xl font-light text-gray-600">
            okay, this is getting deep.
          </p>
        </FadeBlock>

        <FadeBlock delay={600}>
          <p className="text-lg md:text-xl font-light text-gray-400 mt-6">
            let's fix that.
          </p>
        </FadeBlock>
      </section>

      <div className="h-32 bg-black" />

      {/* ========== WHERE I EXIST ONLINE ========== */}
      <section className="min-h-[60vh] flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <FadeBlock align="left" className="max-w-xl space-y-2">
          <p className="text-xl md:text-2xl font-light text-gray-500">
            if this felt familiar,
          </p>
          <p className="text-xl md:text-2xl font-light text-gray-400">
            you already know where to find me.
          </p>
        </FadeBlock>

        <FadeBlock align="left" className="max-w-xl mt-12" delay={400}>
          <div className="space-y-1">
            <SocialLink platform="instagram" description="visuals pretending to be intentional" />
            <SocialLink platform="snapchat" description="nothing here is serious" />
            <SocialLink platform="x" description="thoughts that escaped supervision" />
          </div>
        </FadeBlock>
      </section>

      {/* ========== THE EXIT ========== */}
      <div className="h-32 bg-black" />

      <section className="min-h-[60vh] flex flex-col items-center justify-center px-8">
        <FadeBlock>
          <p className="text-xl md:text-2xl font-light text-gray-400">
            bye from your Kannadiga friend.
          </p>
        </FadeBlock>

        <FadeBlock delay={800}>
          <p className="text-xl md:text-2xl font-light text-gray-300 mt-6">
            now close this tab emotionally.
          </p>
        </FadeBlock>
      </section>

      {/* Final fade */}
      <div className="h-64 bg-black" />
    </div>
  );
}
