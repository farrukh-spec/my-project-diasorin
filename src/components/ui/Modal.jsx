// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const sizeMap = {
  sm: "w-[320px]",
  md: "w-[480px]",
  lg: "w-[640px]",
};

const Modal = ({
  show,
  onClose,
  title,
  size = "md",
  children,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal box */}
          <motion.div
            className={`fixed z-50 top-1/2 left-1/2 bg-white rounded-xl shadow-xl p-6
              ${sizeMap[size]}`}
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Header */}
            {title && (
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Body */}
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
