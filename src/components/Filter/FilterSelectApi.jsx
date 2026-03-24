import React from 'react'
import { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { SlArrowDown } from 'react-icons/sl';
import { getDepartment, getWorkerUser } from '@/api/userService';
import { BiLoaderAlt } from 'react-icons/bi';
import { useRef } from 'react';
const FilterSelectApi = ({
    label_text,
    state,
    setState,
    placeholder,
    valueGenerator,
    isClearable,
    url,
    query_params,
}) => {
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [showMenu, setShowMenu] = useState(false)
    const [runFirstTime, setRunFirstime] = useState(true);
    const containerRef = useDetectClickOutside({ onTriggered: () => setShowMenu(false) })
    const menuRef = useRef(null);
    const inputRef = useRef()

    const handleSelect = (value) => {
        setSearch("")
        console.log("setstateValue",value);
        
        setState(value)
        setShowMenu(false)
    }

    const getData = async (offset, withSearch) => {
        try {

            setLoading(true)
            const param = {
                limit: 10,
                offset: offset ? offset : 0,
                search: search ? search : "",
                //  ...(query_params ? query_params : {})
                exclude_ids: query_params ? query_params : ""
            }
            const result = url === "department"
                ? await getDepartment(param)
                : await getWorkerUser(param);

            const formatted_payload = result.payload.map(item => valueGenerator(item))

            if (withSearch) {
                setData(formatted_payload)
            } else {
                setData(old => [...old, ...formatted_payload])
            }
            setCount(result.data.count)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log("Error", e.message);
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

    // first time this runs
    useEffect(() => {
        if (runFirstTime) {
            getData(0, true)
        } else {
            setRunFirstime(true)
        }
    }, [search])

    const scrolledDown = () => {

        // on scroll bottom
        if (loading) {
            return
        }

        if (data.length < count) {
            getData(data.length)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (menuRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
                if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
                    scrolledDown()
                }

            }
        };

        if (menuRef.current && showMenu) {
            menuRef.current.addEventListener('scroll', handleScroll);
        }

        // Cleanup the event listener on unmount
        return () => {
            if (menuRef.current) {
                menuRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [showMenu,data,count]);

    console.log("filterData", data);

    return (

        <div>
            <span className="text-xs font-medium mb-1 block">
                {label_text}
            </span>
            <div
                ref={containerRef}
                 className='relative cursor-default'
            >
                <div
                    className='relative'
                    onClick={() => {
                         if (!inputRef.current) {
                            setShowMenu(!showMenu)
                       }
                    }
                    }
                >
                    {

                        state ?
                            <div
                                className='w-full min-h-[42px]  justify-between input-text flex items-center space-x-2 !pl-2'>
                                <div
                                    className='text-sm line-clamp-1 w-[88%] text-clip px-2 overflow-y-clip overflow-x-clip'
                                >
                                    <div>{search ? search : state?.label}</div>
                                </div>
                                {
                                    isClearable &&
                                    <span className='right-7 relative '
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setState(null)
                                        }}
                                    >
                                        <RxCross2 className='text-lg mx-auto text-gray-400' />
                                    </span>
                                }
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
                                    className="resize-none cursor-default h-[42px]  bg-white disabled:bg-gray-100 disabled:cursor-not-allowed input-text"
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
                               //  setShowMenu(true);
                            }
                        }}
                            className="absolute right-1 top-1/2 -translate-y-1/2 py-1 px-3 border-l-[2px] border-gray-200">
                            <SlArrowDown className={`text-[10px] ${showMenu ? "text-gray-600" : "text-gray-400"}`} />
                        </div>
                        {
                            search &&
                            <RxCross2 className='absolute right-12 top-1/2 -translate-y-1/2  text-lg mx-auto text-primary'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSearch("")
                                }}
                            />
                        }
                    </div>
                </div>
                {/* Menu list */}
                <div>
                    {showMenu &&
                        <div
                            ref={menuRef}
                            className='w-full z-30 flex flex-col max-h-[200px] overflow-auto text-sm border-gray-200 rounded-[6px] border-[1px] absolute -bottom-3 translate-y-[100%] shadow-lg bg-white'
                        >
                            <>
                                {
                                    data && data.length > 0 ? data.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={()=>{handleSelect(item)}}
                                            className={`pl-2 w-full text-wrap py-2.5 ${state && state.value === item.value ? "bg-[#06255B] text-white" : ""} hover:bg-[#06255B] hover:text-white`}>{item.label}</div>
                                    ))
                                        : !loading &&
                                        <div className='flex min-h-[100px] text-sm flex-col justify-center items-center'>
                                            <p>Record Not Found</p>
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
        </div>

    )
}

export default FilterSelectApi