import React from 'react'

// eslint-disable-next-line no-unused-vars
import { easeInOut, motion } from "framer-motion";
const FramerMotion = () => {
  return (
    <>
      <div className='flex flex-col mt-5 items-center gap-6 p-10' >
        <h1 className='text-3xl text-gray-700 mb-10 font-bold'>Framer-Motion Animations</h1>

        <div className='flex flex-col gap-14 items-center' >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: easeInOut
            }}
          >
            hello motion
          </motion.div>
          <h1 className=' mt-1.5 text-3xl text-gray-700' >while tap</h1>
          <motion.div className=' h-24 w-24 bg-blue-700 rounded '
            whileTap={{ scale: 0.5 }}
          >

          </motion.div>

          <h1 className=' mt-1.5 text-3xl text-gray-700' >while hover</h1>

          <motion.div className='h-24 w-24 bg-blue-700 rounded'
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 400 }}
          >

          </motion.div>

          <h1 className=' mt-1.5 text-3xl text-gray-700' >sidebar animation</h1>

          <motion.aside
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
            transition={{ type: "spring", damping: 20 }}
          >
            aside bar
          </motion.aside>

        </div>
      </div>
    </>
  )
}

export default FramerMotion