import React, { useState, useRef } from "react";
import FolderIcon from "./FolderIcon";
import FileIcon from "./FileIcon";
import { FaTimes } from "react-icons/fa";

const FileExplorer = () => {
  const initialStructure = [
    {
      name: "Documents",
      type: "folder",
      contents: [
        { name: "Resume.pdf", type: "file", content: "/path/to/resume.pdf" },
        {
          name: "Project",
          type: "folder",
          contents: [
            {
              name: "Report.docx",
              type: "file",
              content: "/path/to/report.docx",
            },
            {
              name: "Pictures",
              type: "folder",
              contents: [
                {
                  name: "Vacation.png",
                  type: "file",
                  content: "/path/to/vacation.png",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Pictures",
      type: "folder",
      contents: [
        {
          name: "Vacation.png",
          type: "file",
          content: "/path/to/vacation.png",
        },
      ],
    },
    { name: "Notes.txt", type: "file", content: "/path/to/notes.txt" },
  ];

  const [currentFolder, setCurrentFolder] = useState(initialStructure);
  const [path, setPath] = useState([]);
  const [fileToDownload, setFileToDownload] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [contextMenuFolder, setContextMenuFolder] = useState(null);
  const [clipboard, setClipboard] = useState([]);
  // Store copied or cut item
  const [cutItem, setCutItem] = useState(null); // Store cut item
  const [renameItem, setRenameItem] = useState(null); // Store item to rename
  const [newName, setNewName] = useState("");
  const contextMenuRef = useRef(null);

  // Handle folder creation
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        name: newFolderName,
        type: "folder",
        contents: [],
      };
      setCurrentFolder([...currentFolder, newFolder]);
      setNewFolderName("");
      setShowCreateFolder(false);
    }
  };
  const handleContextMenuFolder = (e, item) => {
    e.preventDefault();
    setContextMenuFolder({
      top: e.clientY,
      left: e.clientX,
      item,
      type: item.type, // Add type to differentiate
    });
    setContextMenu(null)
  };
  const handleCut = (item) => {
    setCutItem(item);
    setClipboard(null);
  };
  
  const handleCopy = (item) => {
    setClipboard(item);
    setCutItem(null);
  };
  
  const deleteItem = (item) => {
    const updatedFolder = currentFolder.filter(i => i !== item);
    setCurrentFolder(updatedFolder);
  };
  
  const handleRename = () => {
    if (renameItem) {
      const updatedFolder = currentFolder.map(item =>
        item === renameItem ? { ...item, name: newName } : item
      );
      setCurrentFolder(updatedFolder);
      setRenameItem(null);
      setNewName("");
    }
  };
  
  const handleContextMenuOptionFolder = (option) => {
    setContextMenu(null)
    const { item, type } = contextMenuFolder;
  
    switch (option) {
      case folderContextMenuOptions.OPEN:
        if (type === "folder") openFolder(item);
        break;
  
      case folderContextMenuOptions.DELETE:
        if (type === "folder") deleteItem(item);
        break;
  
      case folderContextMenuOptions.CUT:
        if (type === "folder") handleCut(item);
        break;
  
      case folderContextMenuOptions.COPY:
        if (type === "folder") handleCopy(item);
        break;
  
      case folderContextMenuOptions.RENAME:
        if (type === "folder") setRenameItem(item);
        break;
  
      case fileContextMenuOptions.OPEN:
        if (type === "file") openFileHandler(item);
        break;
  
      case fileContextMenuOptions.DELETE:
        if (type === "file") deleteItem(item);
        break;
  
      case fileContextMenuOptions.CUT:
        if (type === "file") handleCut(item);
        break;
  
      case fileContextMenuOptions.COPY:
        if (type === "file") handleCopy(item);
        break;
  
      case fileContextMenuOptions.RENAME:
        if (type === "file") setRenameItem(item);
        break;
  
      default:
        break;
    }
  
    setContextMenuFolder(null);
  };
  
  
  const folderContextMenuOptions = {
    OPEN: "Open",
    DELETE: "Delete",
    CUT: "Cut",
    COPY: "Copy",
    RENAME: "Rename",
  };

  const fileContextMenuOptions = {
    OPEN: "Open",
    DELETE: "Delete",
    CUT: "Cut",
    COPY: "Copy",
    RENAME: "Rename",
  };

  const openFolder = (folder) => {
    setPath([...path, folder]);
    setCurrentFolder(folder.contents);
    setFileToDownload(null);
    setShowModal(false);
  };
  const contextMenuOptions = {
    SORT_BY: "Sort Alphabetically",
    UNDO_DELETE: "Undo Delete",
    NEW_FOLDER: "New Folder",
    GROUP_BY: "Group by Folder First, Then by File",
    PASTE: "Paste",
  };

  const goBack = () => {
    const newPath = [...path];
    newPath.pop();
    setPath(newPath);
    if (newPath.length === 0) {
      setCurrentFolder(initialStructure);
    } else {
      setCurrentFolder(newPath[newPath.length - 1].contents);
    }
    setFileToDownload(null);
    setShowModal(false);
  };

  const openFileHandler = (file) => {
    if (file.content) {
      setFileToDownload(file);
      setShowModal(true);
    }
  };

  const handleDownload = () => {
    if (fileToDownload) {
      window.location.href = fileToDownload.content;
      setFileToDownload(null);
      setShowModal(false);
    }
  };
  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({
      top: e.clientY,
      left: e.clientX,
      item,
    });
  };

  const handleContextMenuOption = (option) => {
    switch (option) {
      case contextMenuOptions.PASTE:
        // Check if there's something in the clipboard
        if (clipboard.length > 0) {
          setCurrentFolder([...currentFolder, ...clipboard]);
          setClipboard([]); // Clear the clipboard after pasting
        }
        break;

      case contextMenuOptions.SORT_BY:
        // Sort by name (alphabetical order) or type
        const sortedItems = [...currentFolder].sort((a, b) => {
          // Example: sort by name alphabetically
          return a.name.localeCompare(b.name);
        });
        setCurrentFolder(sortedItems);
        break;

      case contextMenuOptions.UNDO_DELETE:
        // Assuming you have a history of deleted items
        const lastDeletedItem = deletedItems.pop(); // Implement a stack of deleted items
        if (lastDeletedItem) {
          // Restore the deleted item to the current folder
          setCurrentFolder([...currentFolder, lastDeletedItem]);
        }
        break;

      case contextMenuOptions.NEW_FOLDER:
        setShowCreateFolder(true);
        break;

      case contextMenuOptions.GROUP_BY:
        // Group items by type (e.g., folders first, then files)
        const groupedItems = [
          ...currentFolder.filter((item) => item.type === "folder"),
          ...currentFolder.filter((item) => item.type === "file"),
        ];
        setCurrentFolder(groupedItems);
        break;

      default:
        break;
    }
    setContextMenu(null);
  };
 

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
      setContextMenu(null);
      setContextMenuFolder(null)
    }
  };
  const handleCancel = () => {
    setFileToDownload(null);
    setShowModal(false);
  };
  
 

  return (
    <div
      className="p-4"
      style={{ minHeight: "100vh" }}
      onContextMenu={handleContextMenu}
    >
      <div className="flex items-center">
        <button
          onClick={goBack}
          disabled={path.length === 0}
          className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
        >
          Back
        </button>
        <h2 className="ml-4 text-gray-100 text-xl font-bold">
          Current Folder: Root / {path.map((p) => p.name).join(" / ") || ""}
        </h2>
        <button
          onClick={() => setShowCreateFolder(true)}
          className="ml-auto px-3 py-1 bg-blue-500 text-white rounded"
        >
          Create Folder
        </button>
      </div>

      <div className="mt-4 max-w-full flex flex-wrap gap-4">
        {currentFolder.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              item.type === "folder" ? openFolder(item) : openFileHandler(item)
            }
            onContextMenu={(e) => handleContextMenuFolder(e, item)}
            className="flex flex-col items-center p-4 border rounded text-gray-100 cursor-pointer hover:bg-gray-600"
          >
            <div className="text-4xl">
              {item.type === "folder" ? <FolderIcon /> : <FileIcon size={36} />}
            </div>
            <div className="mt-2 w-20 text-gray-100 text-center truncate">
              {item.name}
            </div>
          </div>
        ))}
        {showCreateFolder && (
          <div className="flex flex-col items-center p-4 border rounded text-gray-100 cursor-pointer hover:bg-gray-600">
            <FolderIcon />
            <form>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="New Folder Name"
                className="px-3 w-20 mt-2 border rounded text-gray-900"
              />
              <button
                onClick={handleCreateFolder}
                type="submit"
                className="hidden"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateFolder(false)}
                className=" px-0 absolute -mt-14 -ml-1 py-0 bg-black text-white rounded"
              >
                <div className="text-sm cursor-pointer">
                  <FaTimes />
                </div>
              </button>
            </form>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white mx-4 max-w-xl p-6 rounded shadow-md">
            <h3 className="text-lg font-bold mb-4">Download Confirmation</h3>
            <p className="mb-4">
              Oops, couldn't preview "{fileToDownload?.name}". Would you like to
              download "{fileToDownload?.name}" instead?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="p-4" onContextMenu={(e) => e.preventDefault()}>
        {contextMenu && !contextMenuFolder && (
          <div
            ref={contextMenuRef}
            style={{ top: contextMenu.top, left: contextMenu.left }}
            className="absolute bg-white border border-gray-300 shadow-lg rounded"
          >
            <div
              onClick={() =>
                handleContextMenuOption(contextMenuOptions.SORT_BY)
              }
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {contextMenuOptions.SORT_BY}
            </div>
            <div
              onClick={() =>
                handleContextMenuOption(contextMenuOptions.UNDO_DELETE)
              }
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {contextMenuOptions.UNDO_DELETE}
            </div>
            <div
              onClick={() =>
                handleContextMenuOption(contextMenuOptions.NEW_FOLDER)
              }
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {contextMenuOptions.NEW_FOLDER}
            </div>
            <div
              onClick={() =>
                handleContextMenuOption(contextMenuOptions.GROUP_BY)
              }
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {contextMenuOptions.GROUP_BY}
            </div>
            <div
              onClick={() => handleContextMenuOption(contextMenuOptions.PASTE)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {contextMenuOptions.PASTE}
            </div>
          </div>
        )}
      </div>
      <div className="p-4" onContextMenu={(e) => e.preventDefault()}>
    {contextMenuFolder && (
      <div
        ref={contextMenuRef}
        style={{ top: contextMenuFolder.top, left: contextMenuFolder.left }}
        className="absolute bg-white border border-gray-300 shadow-lg rounded"
      >
        {contextMenuFolder.type === "folder" ? (
          <>
            <div
              onClick={() => handleContextMenuOptionFolder(folderContextMenuOptions.OPEN)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {folderContextMenuOptions.OPEN}
            </div>
            <div
              onClick={() => handleContextMenuOptionFolder(folderContextMenuOptions.DELETE)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {folderContextMenuOptions.DELETE}
            </div>
            <div
              onClick={() => handleContextMenuOptionFolder(folderContextMenuOptions.CUT)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {folderContextMenuOptions.CUT}
            </div>
            <div
              onClick={() => handleContextMenuOptionFolder(folderContextMenuOptions.COPY)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {folderContextMenuOptions.COPY}
            </div>
            <div
              onClick={() => handleContextMenuOptionFolder(folderContextMenuOptions.RENAME)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {folderContextMenuOptions.RENAME}
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => handleContextMenuOptionFolder(fileContextMenuOptions.OPEN)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {fileContextMenuOptions.OPEN}
            </div>
            <div
              onClick={() => handleContextMenuOptionFolder(fileContextMenuOptions.DELETE)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {fileContextMenuOptions.DELETE}
            </div>
            <div
              onClick={() => handleContextMenuOptionFolder(fileContextMenuOptions.CUT)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {fileContextMenuOptions.CUT}
            </div>
            <div
              onClick={() => handleContextMenuOptionFolder(fileContextMenuOptions.COPY)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {fileContextMenuOptions.COPY}
            </div>
            <div
              onClick={() => handleContextMenuOptionFolder(fileContextMenuOptions.RENAME)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {fileContextMenuOptions.RENAME}
            </div>
          </>
        )}
      </div>
    )}

    {/* Render Rename Input */}
    
  </div>
    </div>
  );
};

export default FileExplorer;
