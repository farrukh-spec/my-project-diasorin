import React from 'react'
import { useRef } from 'react'
import { useState,useEffect } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside';
import { RxCross2 } from 'react-icons/rx';
import { SlArrowDown } from 'react-icons/sl';
import { BiLoaderAlt } from 'react-icons/bi';
import { ErrorMessage } from 'formik';
import { getWorkerUser } from '@/api/userService';
const SelectAPIField = (


    { 
        form,
        field,
        label_text, 
        placeholder,
        url,
        valueGenerator,
        query_params,
        height,
        fullWidth,
        larger_menu
    }   

) => {
 const [showMenu, setShowMenu] = useState(false)
 const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
 const [data, setData] = useState([])
const [runFirstTime, setRunFirstime] = useState(true);
 const [count, setCount] = useState( 0);
   const menuRef = useRef(null);
    const inputRef = useRef()


    
    const handleSelect = (value) => {
        setSearch("")
        form.setFieldValue(field, value);
        setShowMenu(false)
    }

   

    const getData = async (offset, withSearch) => {
        try {
            setLoading(true)
            const param={
              limit: 10,
              offset: offset ? offset : 0,
              search: search ? search : "",
              ...(query_params ? query_params : {})
             // query_params: query_params ? query_params : "" 
    }

            const result = await getWorkerUser(param)
            const formatted_payload = result.payload.map(item => valueGenerator(item))
            //setData(formatted_payload)
             if (withSearch) {
                setData(formatted_payload)
                if (!search &&formatted_payload.length === 1) {
                    handleSelect(formatted_payload[0]);
                }
                
            } else {
                setData(old => {
                    const updatedData = [...old, ...formatted_payload];
                    if (!search &&updatedData.length === 1) {
                        handleSelect(updatedData[0]);
                    }
                    return updatedData;
                });
            }
setCount(result.data.count)
            setLoading(false)
        } 
        
        catch (e) {
            setLoading(false)
console.log("Error",e.message);

        }

    }

    // first time this runs
    useEffect(() => {
        if (runFirstTime) {
            getData()
        } else {
            setRunFirstime(true)
        }

    }, [])

const containerRef= useDetectClickOutside({ onTriggered: () => setShowMenu(false) });
  return (
   <>
   
   <div className='w-full  ' >
    <div className='relative block w-full group'>
        <div className='flex w-full items-end justify-between'>
            <label className='text-xs font-medium w-full inline-block mb-1'>  
                {label_text}
            </label>
        </div>  
        <div
            ref={containerRef}
            className='relative cursor-default '>  
            <div className="relative"
                onClick={() => {
                    if (!inputRef.current) {
                        setShowMenu(!showMenu)
                    }
                }}
            >
               {
               form.values[field] ?
                      <div
                                        className={`relative input-text input-text-active ${height || ""}  !pl-1 !py-3.5 `}>
                                        <div className={`text-sm line-clamp-1 ${fullWidth? "w-[90%]" : "w-[80%]"} text-clip px-2`}>
                                    
                                            <div className=''>{search ? search : form.values[field]?.label}</div>
                                        </div>
                                        <span className='absolute right-12 top-1/2 -translate-y-1/2'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                form.setFieldValue(field, "")
                                            }}
                                        >
                                            <RxCross2 className='text-lg mx-auto text-primary' />
                                        </span>
                                    </div>
                    :
                    <>
                        <input
                                            ref={inputRef}
                                            type="text"
                                            onChange={(e) => {
                                                setShowMenu(true)
                                                setSearch(e.target.value)
                                                setData([])
                                            }}
                                            value={search ? search : ""}
                                            placeholder={placeholder ? placeholder : ""}
                                            className={`resize-none cursor-default bg-white w-full disabled:bg-gray-100  disabled:cursor-not-allowed border border-gray-400 rounded  input-text !py-3.5 ${form.touched[field] && form.errors[field] ? "text-red-500" : ""} ${form.values[field] && " border-emerald-500"}`}
                                            onFocus={() => {
                                                setShowMenu(true)
                                            }}
                                        />
                    </>

}
<div>
    <div onClick={() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }}
        className="absolute right-1 top-1/2 -translate-y-1/2 py-1 px-3 border-l-[2px] border-gray-200">
        <SlArrowDown className={`text-[10px] ${showMenu ? "text-gray-600 rotate-180 transition-all duration-200" : "text-gray-400"}`} /> 
    </div>
    {
        search &&
        <RxCross2 className='absolute right-12 top-1/2 -translate-y-1/2  text-lg mx-auto text-primary'
            onClick={(e) => {
                e.stopPropagation();
                setSearch("")
                form.setFieldValue(field, "")
            }}
        />
    } 

</div>
               
                        
</div>

   {/* Menu list */}

    <div>
                            {
                                showMenu &&
                                <div
                                    ref={menuRef}
                                    className={`w-full z-30 flex flex-col ${larger_menu ? "max-h-[350px]" : "max-h-[200px]"} overflow-auto text-sm border-gray-200 rounded-lg border-[1px] absolute -bottom-3 translate-y-[100%] shadow-lg bg-white`}>
                                    <>
                                        {
                                            data && data.length > 0 ? data.map((item, index) => (
                                                <div
                                                    key={index}
                                                onClick={() => {
                                                    if (!item.isDisabled) {
                                                        handleSelect(item); 
                                                    }
                                                }}
                                                className={`pl-2 w-full text-wrap py-2.5 ${
                                                    item.isDisabled
                                                        ? "bg-gray-100 text-gray-500 cursor-not-allowed" // Style for disabled items
                                                        : form.values[field]?.value === item.value
                                                        ? "bg-[#0B2C5F] text-white"
                                                        : "hover:bg-[#0B2C5F] hover:text-white"
                                                }`}>{item.label}</div>
                                            ))
                                                : !loading &&
                                                <div className='flex min-h-[100px] text-sm flex-col justify-center items-center'>
                                                    <p>
                                                        No record found
                                                    </p>
                                                </div>
                                        }
                                        {
                                            loading &&
                                            <div className='py-3'>
                                                <BiLoaderAlt className='text-xl mx-auto animate-spin text-primary' />
                                            </div>
                                        }
                                    </>
                                </div>
                            }
                        </div>

           </div> 
            <p className="text-xs text-red-500">
                        <ErrorMessage name={field} />
                    </p>
   </div>
   </div>
   </>
  )
}

export default SelectAPIField










// import React, { useEffect, useRef, useState } from 'react'
// import Select from "react-select";
// import { customStringify, error_alert, logger, selectStylesField } from '../../utils';
// import { ErrorMessage } from 'formik';
// import useApi from '../../hooks/useApi';
// import { FormattedMessage, useIntl } from 'react-intl';
// import { network_tl } from '../../translations';
// import { useSelector } from 'react-redux';
// import { RxCross2 } from 'react-icons/rx';
// import { SlArrowDown } from 'react-icons/sl';
// import { BiLoaderAlt } from 'react-icons/bi';
// import { IoAddOutline} from 'react-icons/io5';
// import { useDetectClickOutside } from 'react-detect-click-outside';

// const SelectAPIField = ({
//     form,
//     field,
//     label_text,
//     placeholder,
//     isDisabled,
//     query_params,
//     url,
//     valueGenerator,
//     disableClearable,
//     initial_master_key,
//     customSearch,
//     larger_menu,
//     fullWidth,
//     refresh,
//     height
// }) => {
//     const [loading, setLoading] = useState(false);
//     const { Axios } = useApi();
//     const intl = useIntl();
//     const master = useSelector(state => state.master_data);

//     const master_data = master ? master[initial_master_key] : null

//     const [data, setData] = useState(master_data ? master_data.map(item => valueGenerator(item)) : [])
//     const [count, setCount] = useState(master_data ? master_data.length + 20 : 0);
//     const [search, setSearch] = useState("");
//     const [runFirstTime, setRunFirstime] = useState(master_data ? false : true);

//     const [showMenu, setShowMenu] = useState(false)
//     const containerRef = useDetectClickOutside({ onTriggered: () => setShowMenu(false) });
//     const menuRef = useRef(null);
//     const inputRef = useRef()


//     const handleSelect = (value) => {
//         setSearch("")
//         form.setFieldValue(field, value);
//         setShowMenu(false)
//     }

//     const getData = async (offset, withSearch) => {
//         try {
//             setLoading(true)
//             const result = await Axios.get(`${url}?limit=10&offset=${offset ? offset : 0}&search=${search ? search : ""}${query_params ? query_params : ""}`)
//             const formatted_payload = result.data.payload.map(item => valueGenerator(item))
//             if (withSearch) {
//                 setData(formatted_payload)
//                 if (!search &&formatted_payload.length === 1) {
//                     handleSelect(formatted_payload[0]);
//                 }
                
//             } else {
//                 setData(old => {
//                     const updatedData = [...old, ...formatted_payload];
//                     if (!search &&updatedData.length === 1) {
//                         handleSelect(updatedData[0]);
//                     }
//                     return updatedData;
//                 });
//             }
           
//             setCount(result.data.count)
//             setLoading(false)
//         } catch (e) {
//             if (e.name === "CanceledError") {
//             }
//             else if (e.response) {
//                 error_alert(customStringify(e.response.data.description))
//                 setLoading(false)
//             } else {
//                 error_alert(network_tl(intl))
//                 setLoading(false)
//             }
//         }
//     }

//     // first time this runs
//     useEffect(() => {
//         if (runFirstTime) {
//             getData()
//         } else {
//             setRunFirstime(true)
//         }

//     }, [])

//     useEffect(() => {
//         if (refresh) {
//             // console.log("refreshing")
//             setData([]);
//             setSearch("");
//             getData(0, false);
//         }
//     }, [refresh]);

//     // first time this runs
//     useEffect(() => {
//         if (runFirstTime) {
//             getData(0, true)
//         } else {
//             setRunFirstime(true)
//         }
//     }, [search, query_params])

//     const scrolledDown = () => {
//         // on scroll bottom
//         if (loading) {
//             return
//         }

//         if (data.length < count) {
//             getData(data.length)
//         }
//     }


//     useEffect(() => {
//         const handleScroll = () => {
//             if (menuRef.current) {
//                 const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
//                 if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
//                     scrolledDown()
//                 }

//             }
//         };

//         if (menuRef.current && showMenu) {
//             menuRef.current.addEventListener('scroll', handleScroll);
//         }

//         // Cleanup the event listener on unmount
//         return () => {
//             if (menuRef.current) {
//                 menuRef.current.removeEventListener('scroll', handleScroll);
//             }
//         };
//     }, [showMenu, data, count]);


//     return (
//         <>
//             <div className='w-full'>
//                 <div className={`relative block w-full group`}>
//                     <div className='flex w-full items-end justify-between'>
//                         <label className='text-xs font-medium w-full inline-block mb-1'>
//                             {label_text}
//                         </label>
//                     </div>
//                     {/* <Select
//                         filterOption={customSearch ? customSearch : null}
//                         isDisabled={isDisabled}
//                         isClearable={disableClearable ? false : true}
//                         isSearchable={true}
//                         isLoading={loading}
//                         styles={selectStylesField(form.touched[field] && form.errors[field])}
//                         options={data}
//                         value={form.values[field]}
//                         onChange={handleChange}
//                         className="flex-grow field-text-size"
//                         placeholder={placeholder}
//                         onMenuScrollToBottom={scrolledDown}
//                         onInputChange={(e) => {
//                             setSearch(e)
//                         }}
//                     /> */}
//                     <div
//                         ref={containerRef}
//                         className='relative cursor-default '>
//                         <div className="relative"
//                             onClick={() => {
//                                 if (!inputRef.current) {
//                                     setShowMenu(!showMenu)
//                                 }
//                             }}
//                         >
//                             {
//                                 form.values[field] ?
//                                     <div
//                                         className={`relative input-text input-text-active ${height || ""}  !pl-1 !py-3.5 `}>
//                                         <div className={`text-sm line-clamp-1 ${fullWidth? "w-[90%]" : "w-[80%]"} text-clip px-2`}>
//                                         {/* <p className='text-sm w-[80%] px-2'> */}
//                                             <div className=''>{search ? search : form.values[field]?.label}</div>
//                                         </div>
//                                         <span className='absolute right-12 top-1/2 -translate-y-1/2'
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 form.setFieldValue(field, "")
//                                             }}
//                                         >
//                                             <RxCross2 className='text-lg mx-auto text-primary' />
//                                         </span>
//                                     </div>
//                                     :
//                                     <>

//                                         <input
//                                             ref={inputRef}
//                                             type="text"
//                                             onChange={(e) => {
//                                                 setShowMenu(true)
//                                                 setSearch(e.target.value)
//                                                 setData([])
//                                             }}
//                                             value={search ? search : ""}
//                                             placeholder={placeholder ? placeholder : ""}
//                                             className={`resize-none cursor-default  bg-white disabled:bg-gray-100 disabled:cursor-not-allowed   input-text !py-3.5 ${form.touched[field] && form.errors[field] ? "input-text-error" : ""} ${form.values[field] && "input-text-active"}`}
//                                             onFocus={(e) => {
//                                                 setShowMenu(true)
//                                             }}
//                                         />
//                                     </>
//                             }
//                             <div>
//                                 <div onClick={() => {
//                                     if (inputRef.current) {
//                                         inputRef.current.focus()
//                                     }
//                                 }}
//                                     className="absolute right-1 top-1/2 -translate-y-1/2 py-1 px-3 border-l-[2px] border-gray-200">
//                                     <SlArrowDown className={`text-[10px] ${showMenu ? "text-gray-600" : "text-gray-400"}`} />
//                                 </div>
//                                 {
//                                     search &&
//                                     <RxCross2 className='absolute right-12 top-1/2 -translate-y-1/2  text-lg mx-auto text-primary'
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             setSearch("")
//                                             form.setFieldValue(field, "")
//                                         }}
//                                     />
//                                 }
//                             </div>
//                         </div>

//                         {/* Menu list */}

//                         <div>
//                             {
//                                 showMenu &&
//                                 <div
//                                     ref={menuRef}
//                                     className={`w-full z-30 flex flex-col ${larger_menu ? "max-h-[350px]" : "max-h-[200px]"} overflow-auto text-sm border-gray-200 rounded-lg border-[1px] absolute -bottom-3 translate-y-[100%] shadow-lg bg-white`}>
//                                     <>
//                                         {
//                                             data && data.length > 0 ? data.map((item, index) => (
//                                                 <div
//                                                     key={index}
//                                                 onClick={() => {
//                                                     if (!item.isDisabled) {
//                                                         handleSelect(item); 
//                                                     }
//                                                 }}
//                                                 className={`pl-2 w-full text-wrap py-2.5 ${
//                                                     item.isDisabled
//                                                         ? "bg-gray-100 text-gray-500 cursor-not-allowed" // Style for disabled items
//                                                         : form.values[field]?.value === item.value
//                                                         ? "bg-primary text-white"
//                                                         : "hover:bg-primary hover:text-white"
//                                                 }`}>{item.label}</div>
//                                             ))
//                                                 : !loading &&
//                                                 <div className='flex min-h-[100px] text-sm flex-col justify-center items-center'>
//                                                     <p>
//                                                         <FormattedMessage id="no_record_found" defaultMessage="No record found" />
//                                                     </p>
//                                                 </div>
//                                         }
//                                         {
//                                             loading &&
//                                             <div className='py-3'>
//                                                 <BiLoaderAlt className='text-xl mx-auto animate-spin text-primary' />
//                                             </div>
//                                         }
//                                     </>
//                                 </div>
//                             }
//                         </div>
//                         {/* Menu list */}
//                     </div>
//                     <p className="text-xs text-red-500">
//                         <ErrorMessage name={field} />
//                     </p>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SelectAPIField