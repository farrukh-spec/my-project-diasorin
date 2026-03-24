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
import { LISTING_LIMIT, ORDER_DESCENDING, USER_ACTIVE,USER_PENDING, USER_DISABLED } from './UserSection/constant'
import _ from 'lodash'
import ToolTip from './ToolTip'
AddUser
const Users = () => {


  const [Data, setData] = useAtom(userData)
  const [loading, setloading] = useAtom(tableLoading)
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({
    search: "",
    user_status: "",
    role: "",
    lab: "",
    department: "",
    sort_order: ORDER_DESCENDING
  })

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    user_status: "",
    role: "",
    lab: "",
    department: "",
    sort_order: ORDER_DESCENDING
  })
  //api cal
  console.log("currentPage", currentPage);

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
        search: appliedFilters.search ? appliedFilters.search : "",
        status: appliedFilters.user_status ? appliedFilters.user_status.value : "",
        //role: filters.role ? filters.role.value : "",
        role: appliedFilters.role ? appliedFilters.role.value : "",
        assigned_lab: appliedFilters.lab ? appliedFilters.lab.value.id : "",
        assigned_department: appliedFilters.department ? appliedFilters.department.value.id : "",
        order: "desc",
      }

      const res = await getUsersTable(param);
      console.log("user res", res);
      setCount(res.count)
      const data = res.payload;
      console.log("data", data);

      // const formattedData = data.map(user => ({
      //   id: user.id,
      //   name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
      //   email: user.email || "-",
      //   role: user.role || "-",
      //   status: user.status || (user.is_active ? "ACTIVE" : "INACTIVE"),
      //   department: user.department || "-",
      //   labs: user.labs?.length ? user.labs.map(l => l.name).join(", ") : "-"
      // }));

      const formattedData = data.map(user => ({
  id: user.id,
  name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
  email: user.email || "-",
  role: user.role || "-",
  status: user.status || (user.is_active ? "ACTIVE" : "INACTIVE"),
  department: user.department || "-",
  labs: user.labs?.length ? user.labs.map(l => l.name).join(", ") : "-",

  // ✅ ADD THESE
  invitation_accepted: user.invitation_accepted,
  is_active: user.is_active,
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
  const applyFilters = () => {
    const copy = _.cloneDeep(filters)
    //setCurrentPage(1);

    setAppliedFilters(copy)
  }
  useEffect(() => {
    fetchUsers();
  }, [currentPage])

  useEffect(() => {
    fetchUsers();
  }, [appliedFilters])

  const resetFilters = () => {
    // setCurrentPage(1)
    setFilters({
      search: "",
      user_status: "",
      role: "",
      lab: "",
      department: "",
      sort_order: ORDER_DESCENDING
    })
    setAppliedFilters({
      search: "",
      user_status: "",
      role: "",
      lab: "",
      department: "",
      sort_order: ORDER_DESCENDING
    })
  }


  console.log("usertable Data", Data);
  console.log("filters ", filters.role);

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
      cell: row => {
        const statusTooltip = !row.invitation_accepted ? "User has not verified yet" : row.invitation_accepted && row.is_active ? "User is active" : "User has been disabled by admin"
        // <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
        //   {row.status}

        // </span>
        return (
          <div className='flex justify-center' >
            <ToolTip
              content={statusTooltip}
              component={
                <p
                  className={`rounded-full py-1 px-2 inline-block mx-auto min-w-[80px] text-center uppercase text-xs font-[600] ${row.invitation_accepted && row.is_active ? "bg-emerald-100 text-emerald-500" : row.invitation_accepted && !row.is_active ? "bg-red-100 text-red-500" : !row.invitation_accepted ? "bg-yellow-100 text-yellow-500" : "bg-gray-100 text-gray-700"}`}>
                  {/* {
                   !row.invitation_accepted ?
                    USER_PENDING.label
                    :row.invitation_accepted && row.is_active ?
                     USER_ACTIVE.label
                     : row.invitation_accepted && !row.is_active ?
                       USER_DISABLED.label
                     :
                     ""
                  } */}
                   {
                                        !row.invitation_accepted ?
                                            USER_PENDING.label
                                            : row.invitation_accepted && row.is_active ?
                                                USER_ACTIVE.label
                                                :
                                                row.invitation_accepted && !row.is_active ?
                                                    USER_DISABLED.label
                                                    :
                                                    ""
                                    }

                </p>
              }
            />
          </div>
        )
      },
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
      minwidth: '160px',
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
        <Filters
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
          appliedFilters={appliedFilters}
          resetFilters={resetFilters}
        />
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





