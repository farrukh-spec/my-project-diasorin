import React from 'react'
import { RefreshCcw } from 'lucide-react'
// eslint-disable-next-line no-unused-vars
import { motion,useScroll } from 'framer-motion'
import { Loading } from './dashBoard/dashBoard';
import Modal2 from './ui/Modal2';
import { useAtom } from 'jotai';
import { modalAtom } from '@/store/countAtom';
import { useModal } from '@/store/useModal';
const TailwindAnimation = () => {
  const{scrollYProgress}=useScroll();
const [bg, setBg] = React.useState("bg-red-400");

const{openModal,closeModal}=useModal();

   const [modalOpen, setmodalOpen] = useAtom(modalAtom)
const handlechnage =()=>{
  setBg(prev => 
    prev === "bg-red-400" ? "bg-white" : "bg-red-400"
  );
 //const bg:"bg-red-400"?"bg-white":"bg-red-400" const bg ="bg-red-400";
  setmodalOpen(false)

}
  return (
    <>
<Modal2
 show={modalOpen}
onClose={()=>setmodalOpen(false)}
  size="full"
                  //width="w-full md:w-[200px]"
                   // height="h-60"
                    title="change the bg color "
                    footer={true}

                     
                    // footerSection1="section 1"
                    // footerSection2="section 2"
                    // footerSection3="section 3"

footerSection1="Cancel"
  footerSection2="Download"
  footerSection3="Accept"

>
<div className='flex flex-col gap-3' >
<h1>are you sure tou want to change the color </h1>
<div className='flex items-center justify-between' >
<button className='text-white bg-gray-400 p-2 '
onClick={()=>setmodalOpen(false)}
>cancel</button> 
<button className='text-white bg-gray-400 p-2 '
onClick={()=>handlechnage() } >Yes</button>
</div>
</div>
</Modal2>
    <motion.div className='fixed top-0 left-0 right-0 h-2.5 bg-gradient-to-r  rounded animate-pulse from-pink-500 via-green-500 to-red-500 '
    style={{
      scaleX:scrollYProgress,
      originX:0
    }}
    />

   
    <div className={`flex ${bg} flex-col items-center gap-6 p-10`} >

<button className='p-2 rounded hover:-translate-y-2 cursor-pointer text-white bg-gradient-to-br from-red-400 via-green-400 to-pink-400 '
onClick={()=>setmodalOpen(true)}
>change bg-color </button>


<button className='p-2 rounded hover:-translate-y-2 cursor-pointer text-white bg-gradient-to-br from-red-400 via-green-400 to-pink-400 '
onClick={()=>openModal({title:"hello", size:"lg",content:(<div className="flex flex-col gap-4">
              <p>Are you sure?</p>
              <button onClick={closeModal}>Cancel</button>
            </div>), })}
>stack Modal </button>
{/* <button className='p-2 rounded hover:-translate-y-2 cursor-pointer text-white bg-gradient-to-br from-red-400 via-green-400 to-pink-400 '
onClick={() =>
  openModal({
    title: "First Modal",
    size: "lg",
    content: (
      <div className="flex flex-col gap-4">
        <p>This is first modal</p>

        <button
          onClick={() =>
            openModal({
              title: "Second Modal",
              size: "md",
              content: (
                <div className="flex flex-col gap-4">
                  <p>This is second modal</p>
                  <button onClick={closeModal}>Close</button>
                </div>
              ),
            })
          }
        >
          Open Second Modal
        </button>

        <button onClick={closeModal}>Close</button>
      </div>
      
    ),
  })
}
>nested Modal</button> */}

<button className='p-2 rounded hover:-translate-y-2 cursor-pointer text-white bg-gradient-to-br from-red-400 via-green-400 to-pink-400 '
onClick={() =>
  openModal({
    title: "First Modal",
    size: "md",
    height:"h-full",
    content: (
      <div className="flex flex-col gap-4">
        <p>This is first modal</p>

        <button
          onClick={() =>
            openModal({
              title: "Second Modal",
              size: "md",
              content: (
                <div className="flex flex-col gap-4">
                  <p>This is second modal</p>
                  <button onClick={closeModal}>Close</button>
                </div>
              ),
            })
          }
        >
          Open Second Modal
        </button>

        <button onClick={closeModal}>Close</button>
      </div>
      
    ),
  })
}
>nested Modal</button>

        <h1 className='text-3xl text-gray-700 mb-10 font-bold'>Tailwind Animations</h1>
        <div className='flex flex-col gap-2 items-center' >
            <h1 className='text-lg text-gray-800 mb-4'>transition-all</h1>
            <p>for the hover effect (transition-all)</p>
            <div className='transition-all duration-300 bg-blue-500 hover:scale-110 hover:rotate-12 w-24 h-24 rounded-lg' />
            <hr className=' text-gray-500' />
            <p>for the hover effect (transition-all) with ease property ease-in (slow start → fast end)</p>
            <div className='transition-all duration-300 ease-in bg-blue-500 hover:scale-110 hover:rotate-12 w-24 h-24 rounded-lg' />

             <p>for the hover effect (transition-all) with ease property ease-out (fast start → slow end)</p>
            <div className='transition-all duration-300 ease-out bg-blue-500 hover:scale-110 hover:-rotate-12 w-24 h-24 rounded-lg' />
 <p>for the hover effect (transition-all) with ease property ease-in-out (slow → fast → slow)</p>
            <div className='transition-all duration-300 ease-in-out bg-blue-500 hover:scale-110 hover:rotate-12 w-24 h-24 rounded-lg' />

        </div>
         <div className='flex flex-col gap-2 items-center' >
            <h1 className='text-lg text-gray-800 mb-4'>transition-transform</h1>
            <p>for the hover effect (transition-transform) hover:translate-x-10 </p>
            <div className='transition-transform duration-300 ease-in-out w-24 h-24 bg-red-500 hover:translate-x-10 rounded-lg' />

             <p>for the hover effect (transition-transform) hover:translate-y-10 </p>
            <div className='transition-transform duration-300 ease-in-out w-24 h-24 bg-red-500 hover:translate-y-10 rounded-lg' />

            <p>for the hover effect (transition-transform) hover:-translate-y-10 </p>
            <div className='transition-transform duration-700 ease-in-out w-24 h-24 bg-red-500 hover:-translate-y-10 rounded-lg' />
            <p>for the hover effect (transition-transform) hover:-translate-x-10 </p>
            <div className='transition-transform duration-300 ease-out w-24 h-24 bg-red-500 hover:-translate-x-10 rounded-lg' />
        </div>

        <div className='flex flex-col gap-2 items-center' >
            <h1 className='text-lg text-gray-800 mb-4'>Opecity</h1>
            <div className='transition-opacity duration-300 ease-in-out w-24 h-24 bg-green-500 opacity-0 hover:opacity-100 rounded-lg' />
            <div className='transition-opacity duration-200 opacity-0 hover:opacity-100' >tooltip text</div>
            </div>

            <div className='flex flex-col gap-2 items-center' >
            <h1 className='text-lg text-gray-800 mb-4'>colors</h1>
            <button className="transition-colors duration-200 p-2.5 rounded-lg hover:text-white hover:border-2 border-black hover:bg-blue-600">
  Click me
</button>

<button className='active:scale-95 transition-transform bg-red-500 p-2 rounded-lg ' >active button</button>
            </div>

<div className='flex flex-col gap-2 items-center' >
            <h1 className='text-lg text-gray-800 mb-4'>shadow</h1>
            <div className='transition-shadow  w-24 h-24 bg-purple-500 shadow hover:shadow-xl rounded-lg' />
            </div>

            <div className='flex flex-col gap-2 items-center' >
            <h1 className='text-lg text-gray-800 mb-4'>width</h1>
<div className="h-2 bg-gray-200">
  <div className="h-2 bg-green-500 transition-[width] duration-300 w-1/2" />
</div>

<p>height </p>

<div className="overflow-hidden transition-[height] duration-300 h-0 group-open:h-32">height </div>

<p className='text-xl text-gray-700 font-bold ' >Blur</p>
<div className='w-24 h-24 bg-white/20 border border-gray-300 rounded backdrop-blur-3xl transition-opecity' >
<p>hi</p>
</div>
            </div>


              <div className='flex flex-col gap-2 items-center' >
            <h1 className='text-lg text-gray-800 mb-4'>animate-spin  (Example (Loader)) </h1>
            <div className=' w-10 h-10 border-4 border-gray-400 border-t-blue-600 rounded-full animate-spin ' ></div>

            <RefreshCcw className="w-5 h-5 animate-spin" />

            <p>animate pulse </p>

            <div className="w-64 h-32 bg-gradient-to-br from-green-500 via-red-500 to-red-500  rounded-lg animate-pulse"></div>

<div className="h-4 w-40 bg-gray-300 rounded mb-4 animate-pulse">for skelton text and the cards</div>

<p>animatebounce </p>

<div className=' animate-bounce text-blue-600'>
 ↓ Scroll
</div>

<p className='text-xl mb-4' >underlines</p>

<h1 className="text-3xl font-bold  inline-block">
  Hello 1
  <span className="block w-full h-1  bg-blue-500 mt-0.5"></span>
</h1>

<h1 className="text-3xl font-bold text-center">
  Hello 2
  <span className="block mx-auto w-12 h-1 bg-blue-500 mt-2"></span>
</h1>



<h1 className='group text-3xl font-bold inline-block cursor-pointer'>Hello 
    <span className='block h-1 bg-blue-500 scale-x-50 group-hover:scale-x-100 animate-pulse transition-transform origin-center rounded ease-in-out duration-500'></span>
</h1>

<h1 className="text-3xl font-bold inline-block">
  Hello
  <span className="block w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 mt-2"></span>
</h1>


{/* <button className="relative group px-4 py-2 bg-blue-600 text-white rounded">
  Hover me

  <span className="
    absolute -left-10 left-1/2 -translate-x-1/2
    whitespace-nowrap
    bg-gray-900 text-white text-xs px-3 py-1 rounded
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300
    pointer-events-none
  ">
    This is a tooltip
  </span>
</button> */}
<button className='relative group p-4 bg-blue-500 text-white rounded'> hover me 
    <span className='absolute text-nowrap pointer-events-none -top-10 left-1/2 -translate-x-1/2  bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>this is the tooltip</span>
</button>

<div className="relative group w-40 h-24 bg-white shadow rounded flex items-center justify-center">
  Card

  <span className="
    absolute bottom-full mb-2
    bg-black text-white text-xs px-2 py-1 rounded
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300
    pointer-events-none
  ">
    Card info
  </span>


</div>



<div className="relative group inline-block">
  
  <button className="bg-blue-500 text-white px-3 py-2 rounded">
    Hover me
  </button>

  <h1 className="
    absolute left-1/2 -translate-x-1/2
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300
    pointer-events-none
    bg-black text-white text-sm
    py-2 px-3 rounded-lg text-nowrap
    -top-10
  ">
    View Details

    {/* Arrow */}
    <span className="
      absolute left-1/2 -translate-x-1/2
      top-full
      w-0 h-0
      border-l-4 border-r-4 border-t-4
      border-l-transparent border-r-transparent
      border-t-black
     
    "></span>

  </h1>

</div>



            </div>

               {/* <h1 className='text-3xl text-gray-700 mb-10 font-bold'>Framer-Motion Animations</h1>

                   <div className='flex flex-col gap-2 items-center' >
                    <motion.div
                    initial={{opecity:0}}
                    animate={{opecity:1}}
                    >
                      hello motion
                    </motion.div>
                   </div> */}
{/* <Loading/> */}
    </div>

    </>
  )
}

export default TailwindAnimation