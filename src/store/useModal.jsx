import { Atom } from "lucide-react";
import { useAtom } from "jotai";
import { modalStackAtom } from "./countAtom";
import { modalOpen } from "./countAtom";
import { userRole } from "./countAtom";

//const[modalstack, setmodalStack]= useAtom(modalStackAtom)

export const useModal=()=>{
const [modalStack, setModalStack] = useAtom(modalStackAtom);
   const[Openmodal,setOpenmodal]=useAtom(modalOpen);
    const [, setRoleTabe] = useAtom(userRole);
const openModal= (modaldata)=>{
    console.log("modaldata",modaldata);
setModalStack(prev => ([...prev,modaldata]))
 setOpenmodal(true);
}

const closeModal = () => {
  // setModalStack(prev => prev.filter((_, i) => i !== index));
  setModalStack(prev => prev.filter((_, i) => i !==prev.length-1));

  if (modalStack.length <= 1) {
    setRoleTabe({ name: "", index: null });
    setOpenmodal(false);
  }
};
// const closeModal = ()=>{
//     if (modalStack.length<=1) {
//          setRoleTabe({ name: "", index: null });
//     setOpenmodal(false)
// setTimeout(()=>{},1000)
// setModalStack(prev => prev.slice(0,-1))
//     }
//    // setRoleTabe({ name: "", index: null });
//    // setOpenmodal(false)

// setModalStack(prev => prev.slice(0,-1))
 
// //setOpenmodal(false)

// // ✅ reset all temporary modal states
//     //setRoleTabe({ name: "", index: null });
// }
return {openModal,closeModal}

}


