import React from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
const ToolTip = ({content, component,notooltip}) => {
  return (
   <Tippy
      animation="fade"
      duration={[200, 100]}
      zIndex={40}
   // {...(!notooltip && { zIndex: 40 })}
   
      content={
        <span className=" text-sm  rounded-md shadow-lg ">
          {content}
        </span>
      }
      arrow={true}
      theme="light"
    >
      {component}
    </Tippy>
  )
}

export default ToolTip