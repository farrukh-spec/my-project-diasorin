
import React from 'react'
import DashBoardContianer from '.'
import NavBreadCrum from '../breadCrum'
const Dashboard = () => {
  return (
   <NavBreadCrum
   title={"Dashboard"}
   breadCrum={[
    {
      title:"Diasorin",
      link:"/"
    }
   ]}
   ><DashBoardContianer/></NavBreadCrum>
  )
}

export default Dashboard
// import React from 'react'
// import { Building, FlaskConical, User, Ticket, Pause, } from 'lucide-react';
// import NavBreadCrum from '../breadCrum';
// // eslint-disable-next-line no-unused-vars
// import { motion, scale, useAnimation } from 'framer-motion';

// import { getUsers } from '../../api/userService';
// import { useEffect } from 'react';
// import { useAtom } from 'jotai';
// import { apiloadingAtom } from '../../store/countAtom';
// import { countdataAtom } from '../../store/countAtom';
// const Dashboard = () => {

//   const [countData, SetcountData] = useAtom(countdataAtom)
//   const [loading, setloading] = useAtom(apiloadingAtom)
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setloading(true)
//         const data = await getUsers();

//         SetcountData(data.payload.count)
//         setloading(false)
//       } catch (error) {
//         console.log("fetch counts error ", error);

//       }
//     }
//     fetchUsers();
//   }, [])

//   const maincards = [
//     { title: "Departments", icons: <Building className='h-6 w-6 text-gray-800 ' />, count: countData?.department_count || 0 },
//     { title: "Labs", icons: <FlaskConical className='h-6 w-6 text-gray-800 ' />, count: countData?.lab_count || 0 },
//     { title: "Tickets", icons: <Ticket className='h-6 w-6 text-gray-800 ' />, count: countData?.ticket_count || 0 },
//     { title: "Users", icons: <User className='h-6 w-6 text-gray-800 ' />, count: countData?.user_count || 0 },
//   ]


//   const cardData = [
//     { title: 'Manager Review', count: countData?.manager_review_count || 0 },
//     { title: 'Department Review', count: countData?.department_review_count || 0 },
//     { title: 'Approved', count: countData?.approved_count || 0 },
//     { title: 'Rejected', count: countData?.rejected_tickets_count || 0 },
//     { title: 'Supply request', count: countData?.supply_requested_tickets_count || 0 },
//     { title: 'Returned', count: countData?.returned_tickets_count || 0 },
//     { title: 'Cancelled', count: countData?.cancelled_tickets_count || 0 },
//     { title: 'Completed', count: countData?.completed_tickets_count || 0 },
//   ];
//   const controls = useAnimation();

//   return (
//     <>
//       {loading && (<Loading />)}

//       <div className='  h-full p-5 '>

//         <div className='w-full p-7 rounded border-2 border-gray-300'>

//           <div className=' flex flex-wrap  rounded-lg  space-x-12 space-y-6'>

//             {/* card 1 for deapartment */}
//             {maincards.map((card, index) => (



//               <div
//                 key={index}
//                 className='bg-white bg-opacity-20 h-[140px] w-[250px] flex transition-transform duration-300 hover:-translate-y-2 flex-col backdrop-blur-lg rounded-lg shadow-lg p-5 '>
//                 <div className='flex  justify-between items-center w-full '>
//                   <h1 className='text-md text-gray-800 ' >{card.title}</h1>
//                   {/* <Building className='h-6 w-6 text-gray-800 ' /> */}
//                   {card.icons}
//                 </div>
//                 <h1 className='text-7xl text-gray-800 font-bold' >{card.count}</h1>
//               </div>
//             ))}


//           </div>

//           <div className='w-full    bg-white bg-opacity-20 rounded-lg p-5 backdrop-blur-lg shadow-lg'>
//             <h1 className='text-xl font-bold mx-4 text-gray-800'>Tickets Statuses</h1>
//             <div className='flex flex-col w-full h-full md:flex-row gap-4 '>
//               <div className=' flex-1 border border-gray-300 rounded-lg'> circle</div>

//               <div className=' flex-1 border border-gray-300 rounded-lg'>
//                 {/*  cards  */}
//                 <div className='grid grid-cols-2 gap-4 p-4'>
//                   {cardData.map((card, index) => (
//                     <div key={index} className='flex flex-col gap-2 border-2 border-gray-600 rounded-lg p-4' >
//                       <h1 className='text-lg text-gray-800'>{card.title}</h1>
//                       <p className='text-3xl font-bold text-gray-800' >{card.count}</p>
//                     </div>
//                   ))}

//                 </div>
//               </div>
//             </div>
//           </div>




//         </div>

//         <div className='w-full p-7 mt-4 rounded border-2 border-gray-300' >


//           <div className="overflow-hidden w-full bg-gray-100">
//             {/* style INSIDE component */}
//             {/* <style>{`
//         @keyframes marquee {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }
//         .marquee {
//           animation: marquee 12s linear infinite;
//         }
//           .marquee:hover {
//   animation-play-state: paused;
// }
//       `}</style>
     
//       <div className="flex justify-between gap-8 marquee w-full">
//         <span>🔥 React</span>
//         <span>⚡ Tailwind</span>
//         <span>🎬 Framer</span>
//         <span>🚀 Jotai</span>

//         {/* duplicate */}
//             {/*  <span>🔥 React</span> 
//         <span>⚡ Tailwind</span>
//         <span>🎬 Framer</span>
//         <span>🚀 Jotai</span>
//       </div> */}

//             <motion.div className="flex justify-between gap-8 marquee w-full"
//               //  animate={{x:["0%","-50%"]}}
//               //  transition={{
//               //     repeat:Infinity,
//               //     duration:12,
//               //     ease:"linear"
//               //}}
//               animate={controls}
//               initial={{ x: "0%" }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 12,
//                 ease: "linear",

//               }}
//               onHoverStart={() => { controls.stop() }}
//               onHoverEnd={() =>
//                 controls.start({
//                   x: ["0%", "-50%"],
//                 })
//               }

//               whileHover={{ animationPlayState: "paused" }}
//             // whileHover={{animationPlayState:"paused"}}
//             >
//               <motion.span
//                 whileHover={{ scale: 1.25 }}
//               >🔥 React</motion.span>
//               <span>⚡ Tailwind</span>
//               <span>🎬 Framer</span>
//               <motion.span
//                 whileHover={{ scale: 1.25 }}
//               >🚀 Jotai</motion.span>

//               {/* duplicate  */}
//               <span>🔥 React</span>
//               <span>⚡ Tailwind</span>
//               <span>🎬 Framer</span>
//               <span>🚀 Jotai</span>

//             </motion.div>
//           </div>
//         </div>

//       </div>

//     </>
//   )
// }

// export default Dashboard



//loader
export const Loading = () => {
  return (
    <div className='fixed inset-0 z-40 bg-black/50 flex items-center justify-center ' >
      <div className=' w-10 h-10  md:w-24 md:h-24 rounded-full border-4 border-gray-400 border-t-blue-800 animate-spin' />
    </div>
  )
}




///responsive card 
{/* <div className="
  bg-white bg-opacity-20 
  h-auto min-h-[140px]
  w-full sm:w-[220px] md:w-[250px]
  flex flex-col
  transition-transform duration-300 hover:-translate-y-2
  backdrop-blur-lg rounded-lg shadow-lg p-5
">
  <div className="flex justify-between items-center w-full">
    <h1 className="text-sm md:text-md text-gray-800">Tickets</h1>
    <Ticket className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
  </div>

  <h1 className="text-4xl sm:text-5xl md:text-7xl text-gray-800 font-bold">
    1
  </h1>
</div> */}
