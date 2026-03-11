// import { Formik, Form, Field, FieldArray } from 'formik';
// import * as Yup from 'yup';
// // Validation schema for labs array
// const validationSchema = Yup.object({ labs: Yup.array()
//     .min(1, 'At least one lab must be selected')
//     .required('Labs are required'),
// });

// <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       > {({ values, errors, touched, isSubmitting, setFieldValue }) => (
//           <Form className="space-y-4">
//             {/* First Name */}
//             <div>
//               <label htmlFor="labs" className="block text-sm font-medium text-gray-700 mb-1">
//                 First Name*
//               </label>
//               <Field
//                 type="text"
//                 name="labs"
//                 id="labs"
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.labs && touched.labs ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter labs"
//               />
//               {/* {errors.labs && touched.labs && ( */}
//                  <ErrorMessage
//                    name='labs'
//                     component='p'
//                      className="text-xs text-red-500 mt-1"
//                     />
//                 {/* <div className="text-red-500 text-sm mt-1">{errors.labs}</div>  )} */}
//                  </div>
//               </Form>
//       )}
//       </Formik>
import React from 'react'
import { useAtom } from 'jotai';
import { useRef, useEffect } from 'react';
import { X, ChevronDown, Tally1 } from 'lucide-react';
import { errorAtom } from '@/store/countAtom';

const LabelSelected = ({ placeHolder,
 // error,
  data = [],
  selectedAtom, searchAtom,
  draftAtom,
  dropdownAtom }) => {
  const [open, setOpen] = useAtom(dropdownAtom);
  const [selected, setSelected] = useAtom(draftAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const dropdownRef = useRef(null);
  const [error, setError] = useAtom(errorAtom);

  const defaultOption = data; //thats the api data

  // useeffect which run for the preselected value 
  useEffect(() => {
    if (data.length > 0) {
      if (selected.length === 0) {
        setSelected([data[0]]);
      }
    } else {

      setSelected([]);
    }
  }, [data]);
  console.log("selected", selected);

  //filter for filter the values on search 
  const filterValue = defaultOption.filter(option => option.name?.toLowerCase().includes(search?.toLowerCase()))

  // for the closed the selectable if click out side of the modal or it range 
  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])


  // slect the value 
  const handleClick = (item) => {
    setSelected(prev => {
      const alreadyExists = prev.some(lab => lab.id === item.id);
      if (alreadyExists) return prev;
      return [...prev, item];
    });
  }

  return (
    <div className="relative w-full " ref={dropdownRef}  >
      <div className={`flex  border-2 rounded ${(open || selected) ? "border-green-600 text-gray-800 " : "border-gray-400 text-gray-300"} justify-between p-2`} >

        {/*main input field  */}
        <input type="text"
          value={search !== ""
            ? search
            : selected.length > 0
              ? selected?.map(l => l.name).join(", ")
              : ""
          }
          placeholder={placeHolder}
          onChange={(e) => {
            setSearch(e.target.value)
            setSelected([])
            setOpen(true)
          }}
          className="outline-none w-full text-gray-600 bg-transparent "
        />
        {/* cross and the arrow buttons  */}
        <div className='flex gap-3 justify-center items-center ' >
          {(selected.length > 0 || search) && (
            <button className='text-gray-400 cursor-pointer hover:text-gray-500'
              onClick={(e) => {
                e.stopPropagation();
                if (search) {
                  // if user searched something invalid → reset
                  setOpen(false)
                  setSearch("");
                  setSelected(data?.length > 0 ? [data[0]] : []);

                } else {
                  setSelected([]);
                }
              }}

            > <X /> </button>
          )}
          <span className='h-full text-gray-500 ' ><Tally1 /></span>
          <span className='text-gray-400 cursor-pointer hover:text-gray-500'
            onClick={() => setOpen(!open)}
          > <ChevronDown className={` transition-all duration-300 ${open ? "rotate-180" : ""}`} /></span>
        </div>
      </div>

      {/* error required message  */}
      {error && (
        <p className='text-red-700' >reqiured</p>
      )}


      {/* drop down  */}
      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 text-gray-700 rounded-md shadow-lg z-50">
          {search ? (
            filterValue?.length > 0 ? (
              filterValue?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleClick(item);
                    setSearch("");
                    setOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-[#d5d6da] cursor-pointer rounded-md"
                >
                  {item.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-400 text-center">
                No record found
              </div>
            )
          ) : (
            defaultOption?.length === 0 ? (<div className="px-4 py-3 text-gray-400 text-center">
              No record found
            </div>) : (
              defaultOption?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleClick(item)
                    setOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-[#d5d6da] cursor-pointer rounded-md"
                >
                  {item?.name}
                </div>
              ))
            )
          )}
        </div>
      )}


    </div>
  )
}

export default LabelSelected

