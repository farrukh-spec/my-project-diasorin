import React from 'react'

const FilterSearch = ({state, setState, label_text, placeholder}) => {
    //  const handleChange = (e) => {
    //     setState(e.target.value.trim())
    // }

    const handleChange = (e) => {
  const value = e.target.value
  if (value.trim() === "") {
    setState("")   // treat as empty
  } else {
    setState(value)
  }
}

  return (
    <>
     <div className="relative block w-full group">
                    <label
                        htmlFor={label_text}
                        className="text-xs font-medium mb-1 block"
                    >
                        {label_text}
                    </label>
                    <input
                        type="text"
                        name={label_text}
                        id={label_text}
                        placeholder={placeholder ? placeholder : ""}
                        className={`resize-none h-[42px] disabled:bg-gray-100 disabled:cursor-not-allowed input-text ${state && "!border-primary"}`}
                        value={state}
                        onChange={handleChange}
                    />

                </div>
    </>
  )
}

export default FilterSearch