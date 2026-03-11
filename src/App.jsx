/* eslint-disable no-unused-vars */
import './App.css'
import TextComponent from './components/textComponent';
import ButtonComponent from './components/buttonComponent';
import Sidebar from './components/sideBar';
import Layoutdashboard from './components/layoutDashboard';
import TicketStatusChart from './components/TicketStatusChart';
import { Routes,Route } from 'react-router-dom';
import { Departments,Labs,Payment,Profile,Tickets,Product,ProductSync, } from './components/layoutDashboard';
import Users from './components/Users';
import Dashboard from './components/dashBoard';
import TailwindAnimation from './components/tailwindAnimation';
import FramerMotion from './components/framerMotion';
import Sidebar2 from './components/sideBar2';
import TailwindPage from './components/tailwindPage';
import LogIn from './components/logIn';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './components/mainLayout';
import { Toaster } from './components/ui/sonner';
import PublicRoutes from './routes/PublicRoutes';
import { ModalRenderer } from './components/ui/ModalRenderer';
//import FramerMotion from './components.'
//import { motion } from 'framer-motion';
function App() {
  
 //const [count, setCount] = useAtom(countAtom)
  return (
    <>
      <Toaster position="top-right" />
<Routes>

{/* unauth routes */}
<Route path='/login' element={<PublicRoutes>
   {/* <Route path="/login" element={<LogIn />} /> */}
   <LogIn/>
</PublicRoutes>} />


   {/* auth routes */}

   {/* prodeted rout */}
 <Route element={<ProtectedRoute />}> 

{/* dashboard route  */}
  <Route path='/' element={<Layoutdashboard />}>
<Route index element={<Dashboard />} />
<Route path='/users' element={<Users />} />
<Route path='/departments' element={<Departments />} />
<Route path='/labs' element={<Labs />} />
<Route path='/payment' element={<Payment />} />
<Route path='/profile' element={<Profile />} />
<Route path='/tickets' element={<Tickets />} />
<Route path='/product' element={<Product />} />
<Route path='/sync' element={<ProductSync />} />
  </Route>
  {/* simple routes 
  <Route path='/tailwind' element={<TailwindAnimation/>}/>
  <Route path='/motion' element={<FramerMotion/>}/> */}

{/* Navbar only layout */}
    <Route element={<MainLayout />}>
      <Route path="/tailwind" element={<TailwindAnimation />} />
      <Route path="/motion" element={<FramerMotion />} />
    </Route>

 </Route> 
</Routes>

<ModalRenderer/>

    



      {/* <TailwindPage/> */}



    </>
  )
}

export default App


// <Routes>
//    <Route path="/login" element={<LogIn />} />
//    {/* prodeted rout */}
//  <Route element={<ProtectedRoute />}> 

// {/* dashboard route  */}
//   <Route path='/' element={<Layoutdashboard />}>
// <Route index element={<Dashboard />} />
// <Route path='/users' element={<Users />} />
// <Route path='/departments' element={<Departments />} />
// <Route path='/labs' element={<Labs />} />
// <Route path='/payment' element={<Payment />} />
// <Route path='/profile' element={<Profile />} />
// <Route path='/tickets' element={<Tickets />} />
// <Route path='/product' element={<Product />} />
// <Route path='/sync' element={<ProductSync />} />
//   </Route>
//   {/* simple routes 
//   <Route path='/tailwind' element={<TailwindAnimation/>}/>
//   <Route path='/motion' element={<FramerMotion/>}/> */}

// {/* Navbar only layout */}
//     <Route element={<MainLayout />}>
//       <Route path="/tailwind" element={<TailwindAnimation />} />
//       <Route path="/motion" element={<FramerMotion />} />
//     </Route>

//  </Route> 
// </Routes>

