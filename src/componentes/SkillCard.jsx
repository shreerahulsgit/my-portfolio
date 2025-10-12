import React from "react";

export const SkillsCard = ({ title, description, icons, children }) => (
  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
    <div className="flex flex-wrap gap-3 mb-4">
      {icons && icons.map((icon, index) => (
        <img
          key={index}
          src={icon.src}
          alt={icon.alt}
          className="w-8 h-8 rounded"
        />
      ))}
    </div>
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    {children}
  </div>
);

export const SkillTag = ({ children, className = "" }) => (
  <span
    className={`inline-block bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm ${className}`}
  >
    {children}
  </span>
);
