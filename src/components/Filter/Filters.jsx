import React from 'react'
import FilterSelect from './FilterSelect'
import { ROLES_ARR } from './Constants'
import { useState } from 'react'
import { customStyle } from './selectFiledsStyles'
const Filters = () => {
     const [selectedOption, setSelectedOption] = useState(null)

  return (
   <>
   <FilterSelect
    options={ROLES_ARR}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        isMulti={true}
        placeholder="Select the option "
        customStyle={customStyle}
       // isDisabled={true}
   />
   </>
  )
}

export default Filters