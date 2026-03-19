import React from 'react'
//import Select from 'react-select/dist/declarations/src/Select'
import Select from 'react-select'
import { useState } from 'react'
import { ROLES_ARR } from './Constants'
const FilterSelect = ({ options, onChange,customStyle, isMulti, placeholder,isDisabled, setSelectedOption, selectedOption }) => {
 // const [selectedOption, setSelectedOption] = useState(null)
// const optionsss = [  { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]
console.log("slected value",selectedOption);

  return (
    <>
        <Select
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
       // isMulti={isMulti}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isClearable={true} 
        styles={customStyle}
        />

    </>
  )
}

export default FilterSelect