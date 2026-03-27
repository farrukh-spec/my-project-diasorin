
import React, { useEffect } from 'react'
import { stateAtom, } from '../store/countAtom';
import { ArrowLeftFromLine, LayoutDashboard, User, Building, FlaskConical, Euro, UserRound, Ticket, Package, RefreshCw, LogOut } from 'lucide-react';
import { useAtom } from 'jotai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { IoMdArrowBack } from 'react-icons/io';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useAtom(stateAtom);
  // const [activeTab, setActiveTab] = useAtom(tabAtom);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const nevigate = useNavigate();
  // made the addition function
  const handleLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.warning("You are Loging Out")
    setIsOpen(false)
    nevigate("/login", { replace: true })


  }

  const SIDEBAR_WIDTH = 208; // w-52
  return (

    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opecity: 0 }}
            animate={{ opecity: 1 }}
            exit={{ opecity: 0 }}

            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed md:static top-0 left-0 z-50 w-52 h-screen border border-gray-300 border-t-0 bg-white 
  flex flex-col  border-r-gray-300 flex-shrink-0 text-gray-700 overflow-hidden `}
initial={{ opacity: 0 }}
        animate={{
          width: isOpen ? SIDEBAR_WIDTH : 0,
          x: isOpen ? 0 : -SIDEBAR_WIDTH,
          opacity: 1 
        }}
         exit={{ opacity: 0 }}
        transition={{ type: "spring", damping: 50,stiffness: 1000, }}
        //    transition={{ type: "tween", duration:1}}    

       // style={{ width: SIDEBAR_WIDTH }}

      >



        <div className='flex items-center justify-between h-[90px] w-full border-b  border-gray-300  p-4 '>
          {/* <h2 className='text-2xl font-bold '>Sidebar</h2> */}
          <img className='w-[110px]' src="https://diasorin-dev.netlify.app/images/diasorin-logo.png" alt="" />
          <button onClick={() => setIsOpen(false)} className='rounded-full p-2  hover:bg-[#DFE5F4] ' >

            {/* <ArrowLeftFromLine className='h-6 w-6  text-gray-700 cursor-pointer' /> */}
             {/* lucide react icon */}
             <IoMdArrowBack className='h-6 w-6  text-gray-700 cursor-pointer'/> 
          </button>
        </div>

        {/* <motion.ul className='space-y-5 flex-1 p-4 overflow-y-auto sidebar-scroll '
          initial={{
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0.5 : 1
          }}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.5
          }}
          exit={{
            opacity: isOpen ? 0 : 0,
            scale: isOpen ? 0.5 : 0
          }}
          transition={{
            duration: 1,
            //visualDuration: 0.4,
            bounce: 1
          }}
          style={{ transformOrigin: "left" }}
        > */}
 <ul className='space-y-5 flex-1 p-4 overflow-y-auto sidebar-scroll '
        //   initial={{
        //     opacity: isOpen ? 0 : 1,
        //     scale: isOpen ? 0 : 1
        //   }}
        //   animate={{
        //     opacity: isOpen ? 1 : 0,
        //     scale: isOpen ? 1 : 0
        //   }}
        //   exit={{
        //     opacity: isOpen ? 0 : 0,
        //     scale: isOpen ? 0 : 0
        //   }}
        //   transition={{
        //      //type: "spring", damping: 13,stiffness: 80, 
        //    duration: 1,
        //     //visualDuration: 0.4,
        //  bounce: 1
        //   }}
        //  style={{ transformOrigin: "top" }}
        >
          <motion.li whileTap={{ scale: 0.95 }}>
            <Link to="/" className={`flex gap-2 items-center p-2 rounded w-full ${isActive("/") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}> <LayoutDashboard className='h-5 w-5 ' /> Dashboard
            </Link>
          </motion.li>

          <motion.li whileTap={{ scale: 0.95 }}>
            <Link to="/users" className={`flex gap-2 items-center p-2 rounded w-full ${isActive("/users") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}> <User className='h-5 w-5 ' /> Users
            </Link>
          </motion.li>

          <motion.li whileTap={{ scale: 0.95 }}>
            <Link to="/departments" className={`flex gap-2 items-center p-2 rounded w-full ${isActive("/departments") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}> <Building className='h-5 w-5 ' />
              Departments
            </Link>
          </motion.li>

          <motion.li whileTap={{ scale: 0.95 }}>
            <Link to="/labs" className={`flex gap-2 items-center p-2 rounded w-full ${isActive("/labs") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}> <LayoutDashboard className="h-5 w-5" />
              Labs
            </Link>
          </motion.li>

          <motion.li whileTap={{ scale: 0.95 }}>
            <Link to="/payment" className={`flex gap-2 items-center p-2 rounded w-full ${isActive("/payment") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}>
              <Euro className='h-5 w-5 inline mr-2' /><p> Center of Payment</p>
            </Link>
          </motion.li>


          <motion.li whileTap={{ scale: 0.95 }}>
            <Link to="/profile" className={`flex gap-2 items-center p-2 rounded w-full ${isActive("/profile") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}> <UserRound className='h-5 w-5 ' /> Profile
            </Link>
          </motion.li>


          <motion.li whileTap={{ scale: 0.95 }}>
            <Link to="/tickets" className={`flex gap-2 items-center p-2 rounded w-full ${isActive("/tickets") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}> <Ticket className='h-5 w-5 ' /> Tickets
            </Link>
          </motion.li>

          <motion.li whileTap={{ scale: 0.95 }}>
            <Link to="/product" className={`flex gap-2 items-center p-2 rounded w-full ${isActive("/product") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}> <Package className='h-5 w-5 inline mr-2' /> Product
            </Link>
          </motion.li>
          {/* 
                <motion.li className={`${isActive('/sync') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'} p-2  rounded cursor-pointer flex items-center `}
                     whileTap={{scale:0.9}}
                   ><Link className=' flex gap-2  items-center ' to="/sync"><RefreshCw className='h-5 w-5 inline mr-2' /> <p>Product Synchronisation</p></Link></motion.li> */}

          <motion.li whileTap={{ scale: 0.95 }}>
            <Link to="/sync" className={`flex gap-2 items-center p-2 rounded w-full ${isActive("/sync") ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}> <RefreshCw className='h-5 w-5 inline mr-2' /> <p>Product Synchronisation</p>
            </Link>
          </motion.li>

        </ul>

        <div className='w-full p-2    border-t border-gray-300  '>
          <button className='w-full rounded-2xl cursor-pointer  text-gray-700 p-2  hover:text-white  hover:bg-gray-900 '
            onClick={handleLogOut}
          ><LogOut className='h-5 w-5 inline mr-2' /> Logout</button>
        </div>
      </motion.aside>

    </>
  )
}

export default Sidebar













{/* <aside className={ fixed md:static top-0 left-0 z-50 w-52 h-screen border border-gray-300 bg-white ${isOpen ? 'translate-x-0' : '-translate-x-full md:hidden '} 
transition-transform duration-300 ease-in-out flex flex-col transition-all border-r-gray-300 flex-shrink-0 text-gray-700 }></aside> */}