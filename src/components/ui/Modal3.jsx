/* eslint-disable no-unused-vars */
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'






const Modal3 = ({ onClose, show, children, size, title, height, width, className, footer,footerSection1,footerSection2,footerSection3 }) => {
  const sizeMap = {

    // sm: "w-full md:max-w-sm",
     sm: "w-full md:max-w-screen-sm",
    //md: "w-full md:max-w-md",
     md: "w-full md:max-w-screen-md",
   // lg: "w-full md:max-w-lg",
    lg: "w-full md:max-w-screen-lg",
    xl: "w-full md:max-w-screen-xl",
    full: "w-full"

  }
  const resolveHeight = height ? height : "max-h-[90vh]";

  const resolveWidth = width
    ? width
    : `w-full ${sizeMap[size]}`

  return (
    
    <>
    
      {/* {show && ( */}
        <>

          {/* Overlay */}
          <motion.div className='fixed inset-0  bg-black/50 z-40 '
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* <motion.div className={`fixed z-50  mx-4 md:mx-1 mt-5   ${resolveWidth} ${resolveHeight} rounded-xl shadow-xl bg-white ${className}  left-1/2 top-1/2 py-4 px-8 md:p-6 overflow-y-auto`} */}
          <motion.div className={`fixed z-50  mx-4 md:mx-1    ${resolveWidth} ${resolveHeight} rounded shadow-xl bg-white ${className}   top-0  -right-4 py-4 px-8 md:px-6 md:py-1 flex flex-col`}
            // initial={{ opacity: 0.5, scale: 0.2, x: "0%", y: "-50%" }}
            // animate={{ opacity: 1, scale: 1, x: "0%", y: "0%" }}
            // exit={{ opacity: 0.5, scale: 0.2, x: "-100%", y: "-50%" }}
            initial={{ x: "100%" }}   // start off screen left
animate={{ x: "0%" }}     // slide to normal position
exit={{ x: "100%" }}
            // transition={{ type: "spring", stiffness: 260, damping: 18 ,}}
            transition={{ ease: "easeIn", stiffness: 500, damping: 5 }}
          >
            {/* header */}
            {title ? (
              <>
                <div className=' flex justify-between items-center  mb-4 border-b border-b-gray-300 py-2  ' >
                  <h1 className=' text-gray-700 text-xl'>{title}</h1>
                  <button className='text-gray-800 text-xl font-bold hover:text-red-700 hover:scale-110'
                    onClick={onClose}
                  >
                    ✕
                  </button>
                </div>
                {/* <hr className='text-gray-600 my-2 block ' /> */}
              </>
            ) : (<div className='w-full  flex justify-end mb-1.5' ><button className='text-gray-400  p-1  hover:text-gray-900 hover:scale-105  '
              onClick={onClose}
            >
              ✕
            </button>
            </div>)}

            {/* Body */}
            <div className='flex-1 overflow-y-auto px-2 py-1 sidebar-scroll ' >{children}</div>


            {/* footer */}
            {footer && (
              <div className="border-t  border-t-gray-300  py-2">
                <div className='flex  justify-between items-center '>
                  <h1 className='text-gray-600' >{footerSection1}</h1> <h1 className='text-gray-600' >{footerSection2}</h1> <h1 className='text-gray-600' >{footerSection3}</h1>
                </div>
              </div>
            )}


          </motion.div>

          {/* Modal biox */}
        </>
      {/* )} */}
    
  </>
  );
};

export default Modal3 

//<AnimatePresence>  </AnimatePresence>