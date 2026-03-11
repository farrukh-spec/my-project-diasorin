import axios from "axios";
import { toast, } from "sonner";

const api = axios.create({
  baseURL: "https://diasorin-dev-api.astutesoftwares00.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// REQUEST INTERCEPTOR

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
if (token) {
   config.headers.Authorization = `Bearer ${token}`;

}
    return config
},
(error)=>{Promise.reject(error)}

)

// RESPONSE INTERCEPTOR
let isRedirecting = false;

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
//         if (error.response) {
            
//         if (error.response.status===401) {
//              toast.error("Session expired. Please login again.")
 
//             localStorage.removeItem("token")
//             localStorage.removeItem("user")

//         //    Toaster.error("Session expired. Please login again.")
//             setTimeout(()=>{
//  window.location.href="/login"
//             },1200)
//            // window.location.href="/login"
//         }
//     }


if (
      error.response &&
      error.response.status === 401 &&
      !isRedirecting
    ) {
      isRedirecting = true;

      toast.error("Session expired. Please login again.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    }

   return Promise.reject(error);

}
    )

    export default api;












//     Professional Improvement (Optional But Smart)

// Right now logout happens when 401 happens.

// But what if multiple requests fire at same time?

// It may redirect multiple times.

// Professional solution:




// let isRedirecting = false;

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !isRedirecting
//     ) {
//       isRedirecting = true;

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );
