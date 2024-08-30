import React from "react";
import ParticleAnimation from "./ParticleAnimation";
import FileExplorer from "./FileExplorerTemp";

const App = () => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full h-full" onContextMenu={handleContextMenu}>
      <ParticleAnimation />
      <div className="bg-gray-400 rounded-b-md shadow-lg border-2 border-white  w-full fixed top-0 h-16" >
        <div className="">
        📁CryptXplorer
        </div>
        <button className="px-2 mt-3 py-0 text-sm">
          New Folder
        </button>
      </div>
      <div className="fixed top-0 min-h-full w-full mt-16" >
      <FileExplorer/>
      </div>
    </div>
  );
};

export default App;
