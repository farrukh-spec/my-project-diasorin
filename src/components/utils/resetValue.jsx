
import { useAtom } from "jotai";
import { workerLabAtom, managerLabAtom, departmentLabAtom, workerLabDraftAtom, managerLabDraftAtom, departmentLabDraftAtom } from "@/store/countAtom";

export const useResetLabs = () => {
  const [, setSelectedWorkerLab] = useAtom(workerLabAtom);
  const [, setDraftWorkerLab] = useAtom(workerLabDraftAtom);

  const [, setSelectedManagerLab] = useAtom(managerLabAtom);
  const [, setDraftManagerLab] = useAtom(managerLabDraftAtom);

  const [, setSelectedDepartmentLab] = useAtom(departmentLabAtom);
  const [, setDraftDepartmentLab] = useAtom(departmentLabDraftAtom);

  const resetLabs =()=>{
     setSelectedWorkerLab([]);
    setDraftWorkerLab([]);
  }

  const resetManager= ()=>{
      setSelectedManagerLab([]);
    setDraftManagerLab([]);
  }

  const resetDepartment=()=>{
    setSelectedDepartmentLab([]);
    setDraftDepartmentLab([]);
  }

  const resetAll = () => {
    resetLabs();
    resetManager();
    resetDepartment();
  };

  return{
   resetAll,
   resetLabs,
   resetManager,
   resetDepartment,
  }
};
