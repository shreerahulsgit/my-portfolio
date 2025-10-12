import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Globe,
  MessageCircle,
} from "lucide-react";
import TargetCursor from "./TargetCursor";

const PortfolioFooter = () => {
  const [currentYear, setCurrentYear] = useState("");
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    // Set the current year dynamically
    setCurrentYear(new Date().getFullYear().toString());

    // Update the local time every second
    const timer = setInterval(() => {
      setLocalTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --- 🎨 CUSTOMIZE YOUR LINKS HERE ---
  const socialLinks = {
    email: "mailto:shreerahul3636@gmail.com",
    github: "https://github.com/shreerahulsgit",
    linkedin: "https://linkedin.com/in/shreerahuls",
    twitter: "https://twitter.com/your-handle", // You can replace this or remove it
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <TargetCursor />
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
        {/* Call to Action */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Have a project in mind?
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          I'm currently open to new opportunities. Let's connect and build
          something amazing together.
        </p>
        <a
          href={socialLinks.email}
          className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg transition-transform duration-300 hover:bg-gray-100 hover:scale-105 shadow-lg"
        >
          Get in Touch
        </a>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 md:gap-8 my-16">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-125"
          >
            <Github size={28} />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-125"
          >
            <Linkedin size={28} />
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-125"
          >
            <MessageCircle size={28} />
          </a>
          <a
            href={socialLinks.email}
            className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-125"
          >
            <Mail size={28} />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500">
          <p className="text-sm">
            © {currentYear} Shree Rahul S. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>Malayambakkam, IN &bull; {localTime}</span>
            </div>
          </div>
          <p className="text-sm">Crafted with React & Tailwind CSS</p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 bg-gray-800 p-3 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default PortfolioFooter;
