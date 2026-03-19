import React from 'react'
import DataTable from 'react-data-table-component'
import { Eye, Ban, Pencil } from 'lucide-react'
import { useAtom } from 'jotai'
import { getUsersTable } from '@/api/userService'
import { userData, tableLoading } from '@/store/countAtom'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useModal } from '@/store/useModal'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { userRole } from '@/store/countAtom'
import ModalContent from './modal components/modalContent'
import { useResetLabs } from './utils/resetValue'
import AddUser from './UserSection/AddUser'
import { Loading } from './dashBoard'
import FilterSelect from './Filter/FilterSelect'
import Filters from './Filter/Filters'
AddUser
const Users = () => {

  // const perPage = 30;
  const LISTING_LIMIT = 30;
  const [Data, setData] = useAtom(userData)
  const [loading, setloading] = useAtom(tableLoading)
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  //api cal
  console.log("currentPage",currentPage);
  
  const fetchUsers = async () => {
    // tableLoading(true)

    try {
      setloading(true)
      let offset = 0;

      if (count) {
        offset = currentPage * LISTING_LIMIT - LISTING_LIMIT;
      } else {
        offset = 0;
      }
      const param = {
        limit: LISTING_LIMIT,
        offset: offset,
        search: "",
        status: "",
        role: "",
        assigned_lab: "",
        assigned_department: "",
        order: "desc",
      }

      const res = await getUsersTable(param);
      console.log("user res", res);
      setCount(res.count)
      const data = res.payload;
      console.log("data", data);
      const formattedData = data.map(user => ({
        id: user.id,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        email: user.email || "-",
        role: user.role || "-",
        status: user.status || (user.is_active ? "ACTIVE" : "INACTIVE"),
        department: user.department || "-",
        labs: user.labs?.length ? user.labs.map(l => l.name).join(", ") : "-"
      }));

      console.log("formatted data", formattedData);

      // setData(data)

      setData(formattedData)

    } catch (error) {
      console.log("error acurred", error);

      toast.error(error?.message || "error acurred")
    } finally {
      setloading(false)
    }
  }

  // useEffect(() => {
  //   fetchUsers();
  // }, [])

  useEffect(() => {
  fetchUsers();
}, [currentPage])

  console.log("usertable Data", Data);
  console.log("datacount ", count);

  // const refreshListing = () => {
  //   setCurrentPage(1);
  //   getData(1)
  // }
  const columns = [
    {
      name: "User Id ",
      selector: row => row.id,
      sortable: true,
      // width:"70px"
      minWidth: "100px",
      grow: 0
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
      width: "130px"
    },
    {
      name: "Email",
      selector: row => row.email,
      wrap: true,
      minWidth: '160px',

    },
    {
      name: "Role",
      selector: row => row.role,
      sortable: true,
      wrap: true,
      minHeight: "145px"



    },
    {
      name: "Labs",
      selector: row => row.labs,
      sortable: true
    },
    {
      name: "Department",
      selector: row => row.department,
      sortable: true,
      minWidth: "130px",
      grow: 1
    },
    {
      name: "Status",
      cell: row => (
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
          {row.status}

        </span>
      ),
      sortable: true,
      center: true,
      width: "130px"
    },
    {
      name: "ACTIONS",

      // eslint-disable-next-line no-unused-vars
      cell: row => (

        <div className="flex gap-2">
          <button className="bg-blue-900 text-white p-2 text-xs relative group rounded-md"><Eye size={20} /><h1 className='absolute left-1/2 -translate-x-1/2 opacity-0
         group-hover:opacity-100 transition-opacity   duration-300 pointer-events-none ease-in bg-black py-2 px-1  rounded text-nowrap -top-10' >View Details
            <span className="
      absolute left-1/2 -translate-x-1/2
      top-full
      w-0 h-0
      border-l-4 border-r-4 border-t-4
      border-l-transparent border-r-transparent
      border-t-black
     
    "></span></h1></button>

          <button className="bg-blue-900 text-white p-2 text-xs relative group rounded-md"><Ban size={20} /><h1 className='absolute left-1/2 -translate-x-1/2 opacity-0
         group-hover:opacity-100 transition-opacity   duration-300 pointer-events-none ease-in bg-black py-2 px-1  rounded text-nowrap -top-10' >Block User
            <span className="
      absolute left-1/2 -translate-x-1/2
      top-full
      w-0 h-0
      border-l-4 border-r-4 border-t-4
      border-l-transparent border-r-transparent
      border-t-black
     
    "></span></h1></button>



          <button className="bg-blue-900 text-white p-2 text-xs relative group rounded-md"><Pencil size={20} /><h1 className='absolute left-1/2 -translate-x-1/2 opacity-0
         group-hover:opacity-100 transition-opacity   duration-300 pointer-events-none ease-in bg-black py-2 px-1  rounded text-nowrap -top-10' >Edit User
            <span className="
      absolute left-1/2 -translate-x-1/2
      top-full
      w-0 h-0
      border-l-4 border-r-4 border-t-4
      border-l-transparent border-r-transparent
      border-t-black
     
    "></span></h1></button>

        </div>

      ),
      //     style: {
      //     justifyContent: "center"
      //   },
      center: true,
      //grow: 1,
      minWidth: '160px',
    },
  ]




  const data = [
    {
      id: 5,
      name: "Test Manager",
      email: "manager@yopmail.com",
      role: "Manager",
      labs: "Test Lab",
      department: "-",
      status: "ACTIVE",
    },
    {
      id: 4,
      name: "Test Manager",
      email: "depart_manager@yopmail.com",
      role: "Department Manager",
      labs: "-",
      department: "-",
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "Test Keeper",
      email: "keeper@yopmail.com",
      role: "Keeper",
      labs: "-",
      department: "-",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Test Worker",
      email: "worker@yopmail.com",
      role: "Worker",
      labs: "-",
      department: "-",
      status: "ACTIVE",
    },
  ];



  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#0B2C5F',
        minHeight: '56px',
      }
    },
    headCells: {
      style: {
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600',


      }
    },
    rows: {
      style: {
        minHeight: '60px',
        fontSize: '14px',
        borderBottom: "1px solid #e5e7eb",
        // whiteSpace: "nowrap"
      },
    },
    cells: {
      style: {
        // whiteSpace: "nowrap"
        borderRight: "2px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
      }
    }
  }
  return (

    <div className='p-8 bg-gray-100 h-screen  '>
      <div className='mb-8' >
    {/* <FilterSelect /> */}
    <Filters/>
    </div>
      <div className='flex justify-end  items-center mb-6'>

        {/* <button className="bg-[#0B2C5F] text-md text-white px-8 py-2 rounded-md shadow  transition">
          Creat New User
        </button> */}
        <Button
          fetchUsers={fetchUsers}
        />
      </div>

      {/* Table Card */}
      <div className=" shadow-md rounded overflow-hidden  ">
        <DataTable
          columns={columns}
          
          data={Data}
          pagination
          progressComponent={<Loading />}
          progressPending={loading}
          paginationPerPage={LISTING_LIMIT}

          onChangePage={page => setCurrentPage(page)}
          paginationDefaultPage={currentPage}
          paginationComponentOptions={{
            noRowsPerPage: true,  
          }}

          responsive
          paginationTotalRows={count}
          customStyles={customStyles}
          paginationServer// importent prop
          //   title="Users List"
          //count={50}
          //data={data}
           //paginationRowsPerPageOptions={[30]}
           //  rangeSeparatorText: "",
          
        />
      </div>
    </div>

  )
}

export default Users



const Button = ({ fetchUsers }) => {
  const { openModal, closeModal } = useModal();
  const { resetAll } = useResetLabs()

  return (
    <button className="bg-[#0B2C5F] text-md text-white px-8 py-2  rounded-md shadow  transition"
      // onClick={() => {openModal({
      //   title: "Create New User",
      //   size: "sm",
      //   height: "h-full",
      //   content: (
      //   <ModalContent
      //   fetchUsers={fetchUsers}
      //   />

      //   )
      // });resetAll()}}

      onClick={() => {
        openModal({
          title: "Create New User",
          size: "sm",
          height: "h-full",
          content: (
            // <ModalContent
            // fetchUsers={fetchUsers}
            // />
            <AddUser
              update={null}
              fetchUsers={fetchUsers}
            />
          )
        })
      }}
    >
      Creat New User
    </button>
  )
}








// const Button = () => {
//   const { openModal, closeModal } = useModal();
//   const [roleTabe, setroleTabe] = useAtom(userRole);
// console.log("roleTabe",roleTabe);

//   const cardButton = [
//     {
//       imageUrl: "https://diasorin-test-dev.netlify.app/images/worker.svg",
//       tabName: "Worker"
//     },
//     {
//       imageUrl: "https://diasorin-test-dev.netlify.app/images/manager.svg",
//       tabName: "Manager"
//     },
//     {
//       imageUrl: "https://diasorin-test-dev.netlify.app/images/department-manager.svg",
//       tabName: "Department Manager"
//     },
//     {
//       imageUrl: "https://diasorin-test-dev.netlify.app/images/keeper.svg",
//       tabName: "Keeper"
//     }
//   ]

//   const schema = Yup.object(
//     {
//       firstName: Yup.string().required("rediured"),
//       lastName: Yup.string().required("reqiured"),
//       email: Yup.string().email("Invalid Email").required("reqiured")
//     }
//   )


//   return (
//     <button className="bg-[#0B2C5F] text-md text-white px-8 py-2  rounded-md shadow  transition"
//       onClick={() => openModal({
//         title: "Create New User",
//         size: "sm",
//         height: "h-full",
//         content: (
//           <>

//             <Formik
//               initialValues={{ firstName: "", lastName: "", email: "" }}
//               validationSchema={schema}
//               onSubmit={(value) => console.log(value)
//               }
//             >
//               {({ errors, touched }) => (
//                 <Form
//                   className='p-2  '
//                 >
//                   <div className='flex flex-col  gap-4' >
//                     <div>
//                       <label
//                         className='text-sm text-gray-950'
//                         htmlFor="email">First Name*</label>
//                       <Field
//                         name="firstName"
//                         type="text"
//                         className={`w-full rounded p-2.5 transition-all shadow-xs
//       focus:outline-[#0B2C5F]
//     ${errors.firstName && touched.firstName
//                             ? "border-2 border-red-600  "
//                             : "border-2 border-gray-300 "
//                           }
//   `}
//                       />
//                       <ErrorMessage
//                         name='firstName'
//                         component='p'
//                         className="text-xs text-red-500 mt-1"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         className=' text-md text-gray-950'
//                         htmlFor="email">Last Name*</label>
//                       <Field
//                         name="lastName"
//                         className={`w-full rounded p-2.5 transition-all shadow-xs
//       focus:outline-[#0B2C5F]
//     ${errors.lastName && touched.lastName
//                             ? "border-2 border-red-600  "
//                             : "border-2 border-gray-300 "
//                           }
//   `}
//                         type="text" />
//                       <ErrorMessage
//                         name='lastName'
//                         component='p'
//                         className="text-xs text-red-500 mt-1"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         className='text-md text-gray-950'
//                         htmlFor="email">Email*</label>
//                       <Field
//                         name="email"
//                         className={`w-full rounded p-2.5 transition-all shadow-xs
//       focus:outline-[#0B2C5F]
//     ${errors.email && touched.email
//                             ? "border-2 border-red-600  "
//                             : "border-2 border-gray-300 "
//                           }
//   `}

//                         type="email"
//                       />
//                       <ErrorMessage
//                         name='email'
//                         component='p'
//                         className="text-xs text-red-500 mt-1"
//                       />
//                     </div>
//                     {/* <button
//         type="submit"
//         className="w-full bg-[#0B2C5F] text-white py-2 rounded-md"
//       >
//         Submit
//       </button> */}

//                     <div className='mt-2' >
//                       <p className='text-md text-gray-950' >Role*</p>
//                     </div>
//                     <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
//                       {cardButton.map((data, index) => (
//                        <button
//       type="button"
//       key={index}
//       onClick={() =>
//         setroleTabe({
//           name: data.tabName,
//           index: index
//         })
//       }
//       className={`flex flex-col gap-2 justify-center items-center
//         border-2 rounded p-5 transition duration-200
//         ${
//           roleTabe?.index === index
//             ? "border-[#0B2C5F] shadow-xl"
//             : "border-gray-400 hover:border-[#0B2C5F] hover:shadow-xl"
//         }`}
//     >
//       <img
//         src={data.imageUrl}
//         alt=""
//         className="w-[55%]"
//       />
//       <p className='text-gray-700 text-sm text-center'>
//         {data.tabName}
//       </p>
//     </button>
//                       ))}
//                     </div>
//                     {/* <div className=' flex flex-col gap-2 justify-center items-center border-2 rounded border-gray-400 p-5 transition duration-200 hover:border-[#0B2C5F] hover:shadow-xl ' >
//                         <img src="https://diasorin-test-dev.netlify.app/images/manager.svg" alt=""
//                           className=" w-[55%] "
//                         />
//                         <p className='text-gray-700 text-sm' >Manager</p>
//                       </div>
//                       <div className=' flex flex-col gap-2 justify-center items-center border-2 rounded border-gray-400 p-5 transition duration-200 hover:border-[#0B2C5F] hover:shadow-xl ' >
//                         <img src="https://diasorin-test-dev.netlify.app/images/department-manager.svg" alt=""
//                           className=" w-[55%] "
//                         />
//                         <p className='text-gray-700 text-center text-sm' >Department Manager</p>
//                       </div>
//                       <div className=' flex flex-col gap-2 justify-center items-center border-2 rounded border-gray-400 p-5 transition duration-200 hover:border-[#0B2C5F] hover:shadow-xl ' >
//                         <img src="https://diasorin-test-dev.netlify.app/images/keeper.svg" alt=""
//                           className=" w-[55%] "
//                         />
//                         <p className='text-gray-700 text-sm' >Keeper</p>
//                       </div> */}
//                     {/* </div> */}
//                     <div className='flex justify-end gap-7'>
//                       <button className='py-2 px-5 rounded-sm  text-gray-900 border-2 hover:bg-[#0B2C5F]/15 transition duration-200 border-[#0B2C5F]' >Cancel</button>
//                       <button className='py-2 px-5 rounded-sm bg-[#0B2C5F] transition duration-200 hover:shadow-lg hover:opacity-90  text-white'>Create</button>
//                     </div>
//                   </div>

//                 </Form>
//               )}
//             </Formik>
//           </>
//         )
//       })}
//     >
//       Creat New User
//     </button>
//   )
// }
