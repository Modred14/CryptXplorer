import React from "react";

const FolderIcon = () => {
  return (
    <div className="relative w-16 h-12">
      {/* Folder Top */}
      <div className="absolute top-0 left-0 w-10 h-4 bg-green-600 rounded-t-md shadow-lg border-2 border-white animate-pulse"></div>
      {/* Folder Body */}
      <div className="absolute bottom-0 left-0 w-16 h-8 bg-gray-800 rounded-b-md shadow-md border-2 border-white border-t-green-400"></div>
    </div>
  );
};

export default FolderIcon;
