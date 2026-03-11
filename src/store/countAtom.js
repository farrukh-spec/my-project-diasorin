import { atom } from "jotai";
export const countAtom = atom(0);
export const stateAtom = atom(true)
//export const tabAtom = atom('dashboard')
export const modalAtom= atom(false)
export const  countdataAtom = atom()
export const apiloadingAtom = atom(false)
export const profileAtom = atom ({
    firstname:"",
    lastname:"",
    email:""
})
export const userData=atom()
export const modalStackAtom = atom([]);
export const tableLoading=atom(false);
export const modalOpen=atom(true)
export const approverManager=atom(false)
export const approverDepartment=atom(false)
//export const lebelAtom =atom(null)
//export const dropdownAtom =atom(false)
//export const searchAtom=atom("")
export const userRole = atom({
  name: "",
  index: null
});

export const workerLabAtom = atom([]);// export const workerLabAtom = atom(null); 
export const workerLabDraftAtom = atom([]); // to store the temporary value
export const managerLabAtom = atom([]);
export const managerLabDraftAtom = atom([]);
export const departmentLabAtom = atom([]);
export const departmentLabDraftAtom = atom([]);
export const searchLabAtom = atom("");
export const searchManagerAtom = atom("");
export const searchDepartmentAtom = atom("");
// export const dropDownLabAtom = atom("");
// export const dropDownManagerAtom = atom("");
// export const dropDownDepartmentAtom = atom("");
export const dropDownLabAtom = atom(false);
export const dropDownManagerAtom = atom(false);
export const dropDownDepartmentAtom = atom(false);
export const editLabAtom = atom(false);
export const editManagerAtom = atom(false);
export const editDepartMentAtom = atom(false);
export const sectionTypeAtom = atom("");
export const AssignedWorker = atom(false);
export const AssignedManager = atom(false);
export const AssignedDepartment = atom(false);
export const modalIndex = atom(null);
export const labsListAtom = atom([]);   // store API labs
export const labsLoadingAtom = atom(false);
export const errorAtom = atom(false);

export const popupAtom = atom([])