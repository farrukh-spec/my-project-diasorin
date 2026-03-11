//import { header } from 'framer-motion/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { loginUser } from '../api/authService';
import { toast, Toaster } from 'sonner';
//import { profileAtom } from '@/store/countAtom';
import { profileAtom } from '../store/countAtom';
import { useAtom } from 'jotai';
const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

const LogIn = () => {

  // const[email, setemail]=useState("")
  // const[password, setpassword]=useState("")
  const [error, seterror] = useState("")
  const [loading, setloading] = useState(false)
  const [profile, setprofile] = useAtom(profileAtom)
  const navigate = useNavigate()

  // const handlelogIn = async(e)=>{
  // e.preventDefault();
  const handlelogIn = async (value) => {
    // e.preventDefault();
    seterror("")
    setloading(true)
    try {


      const res = await loginUser(value)

      // axios automatically gives data
      const data = res
      //const data = await res.json();
      console.log("res", res);
      console.log("data", data);

      //  SUCCESS

      const token = data.payload.access_token

      localStorage.setItem("token", token)

      const user = data.payload.user_info
      setprofile({
        firstname: user.first_name,
        lastname: user.last_name,

        email: user.email
      })
      localStorage.setItem("user", JSON.stringify(user))

      console.log("Token saved:", token)
      console.log("User saved:", user)
      toast.success("Login success")
      console.log("Login success:", data)
      setloading(false)
      console.log("error:", error)
      navigate("/")
    } catch (err) {

      // seterror("Network error")

      if (err.response) {
        // Server responded (like 422, 401, 500)
        seterror(err.response.data.description || "Login failed");
        toast.error(err.response.data.description || "Login failed")
      } else if (err.request) {
        // Request made but no response
        seterror("Server not responding");
        toast.error("Server not responding")
      } else {
        // Something else
        seterror("Something went wrong");
        toast.error("Something went wrong")
      }

      setloading(false)
      console.log("err", err)
    }
  }
  console.log("error", error)
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={handlelogIn}
        >
          {/* {()=>( */}
          <Form
            // onSubmit={handlelogIn}
            className=' max-w-75 md:max-w-130 p-12 b-white rounded-lg border-2 border-gray-300  mx-auto'>

            <div className='flex flex-col mx-auto items-center text-center max-w-55 md:max-w-85  ' >
              <img className='max-w-45   mb-5 max-h-35' src="https://diasorin-test-dev.netlify.app/images/diasorin-logo.png" alt="" />
              <h1 className='text-3xl font-bold w-full text-gray-700 text-nowrap ' >Welcome Back </h1>
              <p className='text-sm  text-gray-400 w-full text-nowrap' >Welcome back and login below.</p>
            </div>
            <div className='w-full flex flex-col gap-4 ' >
              <div className='w-full' >
                <label className=' text-sm text-gray-800' htmlFor="email">Email</label>
                {/* <input 
                        onChange={(e)=>setemail(e.target.value)} 
                        value={email}
                        className='w-full rounded p-2.5 border  focus:outline-green-500 border-gray-200' name='email' type="text" 
                        /> */}
                <Field
                  className="w-full rounded p-2.5 border focus:outline-green-500 border-gray-200"
                  name="email"
                  type="email"
                />
                <ErrorMessage
                  name='email'
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>
              <div className='w-full' >
                <label className=' text-sm text-gray-800' htmlFor="email">Password</label>
                {/* <input 
                        className='w-full rounded p-2.5 border  border-gray-200  focus:outline-green-500 ' name='email' type="password"
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                         /> */}
                <Field
                  className="w-full rounded p-2.5 border focus:outline-green-500 border-gray-200"
                  name="password"
                  type="password"
                />
                <ErrorMessage
                  name='password'
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>
              <button className='bg-gray-700 rounded p-2.5 text-white text-lg '
                type='submit'
                disabled={loading}
              > {loading ? "Logging in..." : "Login"}</button>
              <hr className='text-gray-800 font-bold mt-2' />
              <p className=' text-[9px] md:text-sm text-gray-500 text-center  w-full text-nowrap ' >Have trouble logging in? Reset your password <span className='text-blue-600' >here</span></p>

              {error && (<p className='text-[9px] md:text-sm text-red-500 text-center mt-5  w-full text-nowrap' >{error}</p>)}

            </div>


          </Form>
          {/* )} */}
        </Formik>
      </div>
    </>
  )
}

export default LogIn