import { useState, useRef, useEffect } from "react";

const LabSelect = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const labs = ["Test Lab","azam"];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative  w-full" ref={dropdownRef}>
      {/* Label */}
      <label className="block mb-1 text-sm text-gray-700">Lab</label>

      {/* Input */}
      <div
        onClick={() => setOpen(!open)}
        className={`flex justify-between items-center border rounded-md px-4 py-3 cursor-pointer transition
        ${open ? "border-green-500" : "border-gray-300"}`}
      >
        <span className={`${selected ? "text-gray-800" : "text-gray-400  "}`}>
          {selected || "Lab"}
        </span>

        <div className="flex  items-center  gap-2">
          {selected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
              }}
              className="text-gray-500 hover:text-black"
            >
             ✕
            </button>
          )}
          <span className="h-6 bg-gray-400 w-1 rounded "/>
          <span className="text-gray-400">⌄</span>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-[#0E2A5A] text-white rounded-md shadow-lg z-50">
          {labs.map((lab, index) => (
            <div
              key={index}
              onClick={() => {
                setSelected(lab);
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-[#163A7A] cursor-pointer rounded-md"
            >
              {lab}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabSelect;
