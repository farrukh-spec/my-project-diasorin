import React from 'react'
import { useAtom } from 'jotai'
import { countAtom } from '../store/countAtom'
const TextComponent = () => {
    const [count] = useAtom(countAtom)
  return (
    <div className='text-center mt-5 '>count is : {count}</div>
  )
}

export default TextComponent