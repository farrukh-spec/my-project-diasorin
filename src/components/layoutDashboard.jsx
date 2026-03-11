import React from 'react'
import Sidebar from './sideBar'
import { Menu } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { hover, motion } from "framer-motion";
import { stateAtom, modalAtom } from '../store/countAtom'
import Dashboard from './dashBoard';
import { Link, Outlet } from 'react-router-dom';
import { useAtom } from 'jotai';
import Modal2 from './ui/Modal2';
import { profileAtom } from '../store/countAtom';
const Layoutdashboard = () => {

    const [modalOpen, setmodalOpen] = useAtom(modalAtom)

    return (
        <div className='flex  h-screen overflow-hidden'>
            <Sidebar />
            <motion.main className="flex-1 h- flex h- flex-col overflow-y-auto">
                <Navbar />
                <Outlet />
                <Modal2
                    show={modalOpen}
                    onClose={() => setmodalOpen(false)}
                    size="lg"
                //  width="w-full md:w-[200px]"
                   // height="h-60"
                    title="Tailwind Info"
                    footer={true}
                    // footerSection1="section 1"
                    // footerSection2="section 2"
                    // footerSection3="section 3"

footerSection1="Cancel"
  footerSection2="Download"
  footerSection3="Accept"

                >
                    {/* <p className="text-gray-600 text-center">
                        This modal is fully controlled via props.
                    </p>
                    <h1>hi </h1> */}

                     <div className="space-y-4 text-sm text-center text-gray-600">
                        {Array.from({length:40}).map((_,i)=>(
                            <p key={i} >
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. 
        Integer posuere erat a ante venenatis dapibus.
                            </p>
                        ))}
                     </div>

                      {/* <form className="space-y-4">
    <div>
      <label className="block text-sm text-gray-600 mb-1">First Name</label>
      <input className="w-full border rounded-md p-2" />
    </div>

    <div>
      <label className="block text-sm text-gray-600 mb-1">Last Name</label>
      <input className="w-full border rounded-md p-2" />
    </div>

    <div>
      <label className="block text-sm text-gray-600 mb-1">Email</label>
      <input type="email" className="w-full border rounded-md p-2" />
    </div>

    <div>
      <label className="block text-sm text-gray-600 mb-1">Role</label>
      <select className="w-full border rounded-md p-2">
        <option>Admin</option>
        <option>Manager</option>
        <option>User</option>
      </select>
    </div>

    <div>
      <label className="block text-sm text-gray-600 mb-1">Notes</label>
      <textarea rows="4" className="w-full border rounded-md p-2"></textarea>
    </div>
  </form> */}
                </Modal2>

            </motion.main>

        </div>
    )
}

export default Layoutdashboard






// Navbar Component
export const Navbar = () => {

    const [isOpen, setIsOpen] = useAtom(stateAtom);
    const [modalOpen, setmodalOpen] = useAtom(modalAtom)
    const [profile, setprofile] = useAtom(profileAtom)
    console.log("profile", profile);

    return (
        <nav className='w-full h-[90px] bg-white border border-gray-300 text-gray-800 flex items-center justify-between p-4'>
            <div className='flex items-center space-x-4'> {!isOpen && (
                <button onClick={() => setIsOpen(true)} className=' hover:bg-green-100 rounded-full p-2 '>
                    <Menu className='h-6 w-6 text-gray-800 cursor-pointer' /> {/* lucide react icon */}

                </button>
            )}
                <div className='flex flex-col items-center space-y-2'>
                    <h1 className='text-2xl font-bold'>Dashbord</h1>
                    <p className='text-xs px-3 py-1 rounded-2xl bg-green-200'>Diasorin</p>
                </div>
            </div>
            {/* <div className='  hidden md:flex gap-5  items-center ' >
               

                <Link to="/tailwind" className="relative">
                    <motion.div
                        className="flex flex-col"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                    >
                        <span className="text-gray-700 text-lg">Tailwind</span>

                        <motion.span
                            className="bg-gray-700 block h-[2px] w-full mt-1"
                            variants={{
                                rest: { scaleX: 0.5 },
                                hover: { scaleX: 1 }
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ transformOrigin: "center" }}

                        />
                    </motion.div>
                </Link>
                <Link to="/motion" className="relative">
                    <motion.div
                        className="flex  flex-col"
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                    >
                        <span className="text-gray-700 text-lg">Motion</span>

                        <motion.span
                            className="bg-gray-700  block h-[2px]  mt-1"
                            variants={{
                                rest: { scaleX: 0.5 },
                                hover: { scaleX: 1 }
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ transformOrigin: "center" }}

                        />
                    </motion.div>
                </Link>

                <motion.div
                    className="flex  flex-col"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    onClick={() => setmodalOpen(!modalOpen)}
                >
                    <span className="text-gray-700 text-lg">Modal</span>

                    <motion.span
                        className="bg-gray-700  block h-[2px]  mt-1"
                        variants={{
                            rest: { scaleX: 0.5 },
                            hover: { scaleX: 1 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ transformOrigin: "center" }}

                    />
                </motion.div>

            </div> */}




            {/* <motion.div
                className="flex md:hidden flex-col"
                initial="rest"
                whileHover="hover"
                animate="rest"
                onClick={() => setmodalOpen(!modalOpen)}
            >
                <span className="text-gray-700 text-lg">Modal</span>

                <motion.span
                    className="bg-gray-700  block h-[2px]  mt-1"
                    variants={{
                        rest: { scaleX: 0.5 },
                        hover: { scaleX: 1 }
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformOrigin: "center" }}

                />
            </motion.div> */}


            <div className='flex flex-col'>
                <h1 className='text-sm text-gray-800'>{profile.email || "superadmin@yopmail.com"}</h1>
                <span className='text-xs text-gray-500'>  {profile?.firstname && profile?.lastname
                    ? `${profile.firstname} ${profile.lastname}`
                    : "Super Admin"}</span>
            </div>

        </nav>
    )
}




// Users Component 

// export const Users = () => {
//     return (
//         <div className='flex justify-center items-center h-full bg-gradient-to-br from-green-400 to-blue-500'>
//             <h1 className='text-4xl text-white ' >Users Tab Section</h1>
//         </div>
//     )
// }

// departments component
export const Departments = () => {
    return (
        <div className='flex justify-center items-center h-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500'>
            <h1 className='text-4xl text-white '>Departments Tab Section </h1>
        </div>
    )
}

//labs component
export const Labs = () => {
    return (
        <div className='flex justify-center items-center h-full bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500'>
            <h1 className='text-4xl text-white '>Labs Tab Section </h1>
        </div>
    )
}

//payment component
export const Payment = () => {
    return (
        <div className='flex justify-center items-center h-full bg-gradient-to-br from-green-400 to-blue-500'>
            <h1 className='text-4xl text-white ' >Payment Tab Section</h1>
        </div>
    )
}

//profile component
export const Profile = () => {
    return (
        <div className='flex justify-center items-center h-full bg-gradient-to-br from-green-400 via-red-500 to-blue-500'>
            <h1 className='text-4xl text-white ' >Profile Tab Section</h1>
        </div>
    )
}

//tickets component
export const Tickets = () => {
    return (
        <div className='flex justify-center items-center h-full bg-gradient-to-br from-green-400 via-yellow-500 to-blue-500'>
            <h1 className='text-4xl text-white ' >Tickets Tab Section</h1>
        </div>
    )
}

//product component

export const Product = () => {
    return (
        <div className='flex justify-center items-center h-full bg-gradient-to-br from-green-400 via-brown-500 to-blue-500'>
            <h1 className='text-4xl text-white ' >Product Tab Section</h1>
        </div>
    )
}

// product synchronisation component
export const ProductSync = () => {
    return (
        <div className='flex justify-center items-center h-full bg-gradient-to-br from-green-400 via-purple-500 to-blue-500'>
            <h1 className='text-4xl text-white ' >Product Synchronisation Tab Section</h1>
        </div>
    )
}