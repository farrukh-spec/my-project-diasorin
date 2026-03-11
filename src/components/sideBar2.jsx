// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Sidebar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-10  " 
    style={{float:"right"}}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Sidebar
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-6"
          >
            <h2 className="text-xl font-bold">Sidebar</h2>
            <p className="mt-4">Hello from motion 👋</p>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar2;
