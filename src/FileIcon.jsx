import React from "react";

const FileIcon = ({ size }) => {
  const scaledSize = size * 1.33; // Adjust this scale factor as needed for aspect ratio

  return (
    <div className="relative" style={{ width: `${size}px`, height: `${scaledSize}px` }}>
      {/* File Body */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 rounded-md shadow-md border-2 border-green-400"></div>
      {/* File Top Fold */}
      <div
        className="absolute top-0 right-0 bg-gray-900 rounded-t-md rounded-bl-md transform rotate-45 origin-top-right border-2 border-green-400"
        style={{ width: `${size * 0.42}px`, height: `${size * 0.5}px` }}
      ></div>
      {/* File Top Overlay */}
      <div
        className="absolute top-0 right-0 bg-gray-900 transform rotate-45 origin-top-right border-l-2 border-t-2 border-green-400"
        style={{ width: `${size * 0.25}px`, height: `${size * 0.25}px` }}
      ></div>
      {/* Green Glow */}
      <div className="absolute inset-0 w-full h-full rounded-md animate-pulse border border-green-400"></div>
      {/* Hacking Text */}
      <div className="absolute bottom-1 w-full text-green-400 text-xs font-mono text-center">
        <p>FILE</p>
      </div>
    </div>
  );
};

export default FileIcon;

