import React from 'react'
import { useAtom,} from 'jotai'
import { countAtom } from '../store/countAtom'
//const countAtom = atom(0);
const ButtonComponent = () => {
    const [count, setCount] = useAtom(countAtom)
  return (
    <div>
        <button className='bg-green-600 block mx-auto mt-5 p-2 rounded text-white ' onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default ButtonComponent