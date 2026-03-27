import React from 'react'
import { useAtom } from 'jotai'
import { stateAtom } from '@/store/countAtom'
import { profileAtom } from '@/store/countAtom'
import { Link } from 'react-router-dom'
import { RiMenu5Fill } from 'react-icons/ri'
const NavBreadCrum = ({ title, breadCrum = [], children }) => {
console.log("bread curm", breadCrum);

    const [isOpen, setIsOpen] = useAtom(stateAtom);
    const [profile, setprofile] = useAtom(profileAtom)
    console.log("profile", profile);

    return (
        <div className='  transition-all flex flex-col min-h-ful'>
            <nav className='w-full h-[90px] bg-white border border-gray-300 border-l-0 border-b-2 text-gray-800 flex items-center justify-between '>
                <div className='h-full w-full flex items-center px-6 justify-between'>
                    <div className='flex items-center h-full  space-x-4'> {!isOpen && (
                        <button onClick={() => setIsOpen(true)} className='p-2 hover:bg-[#DFE5F4] rounded-full  '>
                            {/* <Menu className='h-6 w-6 text-gray-800 cursor-pointer' />  */}
                            {/* lucide react icon */}
                            <RiMenu5Fill className='h-6 w-6 text-gray-800 cursor-pointer' />
                        </button>
                    )}
                        <div className='flex flex-col h-full  items-start justify-center gap-0.5'>
                            {/* <h1 className='text-2xl font-bold'>Dashbord</h1> */}
                            <h1 className='text-2xl text-[#0B2C5F] font-bold'>{title}</h1>
                            {/* <p className='text-xs px-3 py-1 rounded-2xl bg-green-200'>Diasorin</p> */}
                            <div className='flex items-center'>
                                {breadCrum.map((item, index) => (
                                    index === breadCrum.length - 1 ?
                                        (<p key={index} className='text-xs font-bold text-primary py-1 px-2 rounded-full bg-[#DFE5F4]' >{item.title}</p>)
                                        :
                                       ( <div className='flex items-center' key={index} >
                                            <Link key={index} to={item.link} className='text-xs  text-gray-400 hover:text-[#0B2C5F] hover:bg-[#DFE5F4] py-1 px-2 rounded-full'>
                                                {item.title}
                                            </Link>
                                            <p className='text-xs mx-2 text-gray-300'>
                                                |
                                            </p>
                                        </div>)
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col hidden sm:block  sm:flex'>
                        <h1 className='text-sm font-medium text-gray-800'>{profile.email || "superadmin@yopmail.com"}</h1>
                        <span className='text-xs italic text-gray-500'>  {profile?.firstname && profile?.lastname
                            ? `${profile.firstname} ${profile.lastname}`
                            : "Super Admin"}</span>
                    </div>
                </div>
            </nav>

            <div className='flex-grow ' >
                {children}
            </div>
        </div>
    )
}

export default NavBreadCrum