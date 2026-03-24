import React from 'react'
//import Select from 'react-select/dist/declarations/src/Select'
import Select from 'react-select'
import { useState } from 'react'
import { ROLES_ARR } from './Constants'
const FilterSelect = ({ options,customStyle,  placeholder,isDisabled,state, setState,label_text }) => {
 // const [selectedOption, setSelectedOption] = useState(null)
// const optionsss = [  { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]
const handleChange=(value)=>{
if (!value) {
  setState("")
}
else{
  setState(value)
}
}
//console.log("slected value",selectedOption);

  return (
    <>
     <div className=' z-10 '>
            <span className="text-xs font-medium mb-1 block">
                {label_text}
            </span>

        <Select
        options={options}
       value={state}
        onChange={value => handleChange(value)}
        placeholder={placeholder}
       // isDisabled={isDisabled}
        isClearable={true} 
        styles={customStyle}
        />
</div>
    </>
  )
}

export default FilterSelect