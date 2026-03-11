import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { useAtom } from 'jotai'
import * as Yup from 'yup'
import { useModal } from '@/store/useModal'
import LabSelect from '../LabelSelect'
import LabelSelected from '../labelSelected'
//import useFetchLabs from '@/api/fetchData';
import { useFetchLabs } from '@/api/fetchData';
import {
    workerLabAtom, managerLabAtom, departmentLabAtom, approverManager, approverDepartment, userRole, searchLabAtom, searchManagerAtom,
    searchDepartmentAtom, dropDownLabAtom, dropDownManagerAtom, dropDownDepartmentAtom, editLabAtom, editManagerAtom, editDepartMentAtom,
    sectionTypeAtom, modalStackAtom, labsListAtom, labsLoadingAtom, workerLabDraftAtom, managerLabDraftAtom, departmentLabDraftAtom
    , AssignedWorker, AssignedManager, AssignedDepartment, errorAtom
} from '@/store/countAtom'
import { getWorkerUser, getDepartment, addUser } from '@/api/userService';
import { handleConfirm } from '../utils/handleConfirm';
import { useResetLabs } from '../utils/resetValue';

//=======================================================================>Modal content
function ModalContent({ fetchUsers }) {
    const { openModal, closeModal } = useModal();
    const [roleTabe, setroleTabe] = useAtom(userRole);
    const [aproverManager] = useAtom(approverManager)
    const [aproverDepartment] = useAtom(approverDepartment)
    const [selectedLabatom] = useAtom(workerLabAtom)
    const [selectedMangeratom] = useAtom(managerLabAtom)
    const [selectedDepartment] = useAtom(departmentLabAtom)
    const [editedSection, seteditedSection] = useAtom(sectionTypeAtom)
    const [modalIndex, setModalIndex] = useAtom(modalStackAtom);
    const [labs, setLabs] = useAtom(labsListAtom);
    const [selectedLabs] = useAtom(workerLabAtom);
    const [error, setError] = useAtom(errorAtom);
const [isCreating, setIsCreating] = useState(false);

    const { resetAll, resetLabs, resetManager, resetDepartment } = useResetLabs();

    //=============> reset useeffect for the all the sections
    useEffect(() => {
        if (roleTabe.name === "Worker") {
            resetManager();
            resetDepartment();
        }
        if (roleTabe.name === "Manager") {
            resetDepartment();
            resetLabs();
        }
        if (roleTabe.name === "Department Manager") {
            resetManager();
            resetLabs();
        }
        if (roleTabe.name === "Keeper") {
            resetAll();
        }
    }, [roleTabe.name])


    //==============> api call function for the selectableAble values and open the second modal 
    const fetchModal = async (section) => {
        
            const modalMap = {
                labs: {
                    title: "Assign Lab",
                    component: <Addlabs />
                },
                manager: {
                    title: "Assign Lab",
                    component: <AddlabsManager />
                },
                department: {
                    title: "Assign Department",
                    component: <AddDepartment />
                }
            }
if (modalIndex.length < 2) {
    

                openModal({
                    title: modalMap[section].title,
                    size: "sm",
                    height: "h-full",
                    content: modalMap[section].component
                });
            }
    };


    //=====================>formated the form values in the payload before the api call for create users 
    const madePayload = (values) => {
        const roleCodeMap = {
            Worker: "worker",
            Manager: "manager",
            "Department Manager": "department-manager",
            Keeper: "keeper"
        }
        const objectKey = {
            Worker: "lab_assignments",
            Manager: "lab_assignments",
            "Department Manager": "department_assignments"
        }
        let assignments = [];

        if (roleTabe.name === "Worker") {
            assignments = selectedLabatom.map(lab => ({
                lab: lab.id,

            }))
        }

        if (roleTabe.name === "Manager") {
            assignments = selectedMangeratom.map(lab => ({
                lab: lab.id,
                is_approval: lab.approver
            }))
        }
        if (roleTabe.name === "Department Manager") {
            assignments = selectedDepartment.map(dept => ({
                department: dept.id,
                is_approval: dept.approver
            }))
        }
        return {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            role_code: roleCodeMap[roleTabe.name],
            ...(roleTabe.name !== "Keeper" && {
                [objectKey[roleTabe.name]]: assignments
            })

        };
    }


    //====================>handle for create user api 
    
    const handleCreateUser = async (value) => {
       
         if (isCreating) return;

    setIsCreating(true);

        try {
            const payload = madePayload(value)
            const response = await addUser(payload)
            console.log("create user respone ", response);

            if (response.data.success) {
                // console.log("User Created", data);
                console.log("User Created", response.data);
                resetAll();
                fetchUsers();
                if (modalIndex.length > 0) {
                    closeModal();
                }
            } else {
                console.log("API Error:", response.data.description);
            }

        } catch (error) {
            // console.log("Create user error:", error);
            if (error.response) {
                // 🔥 This is your 422 backend message
                console.log("API Error:", error.response.data.description);
            } else {
                console.log("Network Error:", error.message);
            }
        }

    }

    //==============>schema for the formik form
    const schema = Yup.object(
        {
            firstName: Yup.string().trim().required("First name is required"),
            lastName: Yup.string().trim().required("Last name is required"),
            email: Yup.string().trim().email("Invalid Email").required("Email is required")
        }
    )


    const cardButton = [
        {
            imageUrl: "https://diasorin-test-dev.netlify.app/images/worker.svg",
            tabName: "Worker"
        },
        {
            imageUrl: "https://diasorin-test-dev.netlify.app/images/manager.svg",
            tabName: "Manager"
        },
        {
            imageUrl: "https://diasorin-test-dev.netlify.app/images/department-manager.svg",
            tabName: "Department Manager"
        },
        {
            imageUrl: "https://diasorin-test-dev.netlify.app/images/keeper.svg",
            tabName: "Keeper"
        }
    ]

    return (
        <div>

            <>
                <Formik
                    initialValues={{ firstName: "", lastName: "", email: "" }}
                    enableReinitialize
                    validationSchema={schema}
                    onSubmit={handleCreateUser}
                //onSubmit={(value) => console.log("value",value) }
                >
                    {({ errors, touched }) => (
                        <Form
                            className='p-2  '
                        >
                            <div className='flex flex-col  gap-4' >
                                <div>
                                    <label
                                        className='text-sm text-gray-950'
                                        htmlFor="email">First Name*</label>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        className={`w-full rounded p-2.5 transition-all shadow-xs focus:outline-[#0B2C5F] ${errors.firstName && touched.firstName
                                            ? "border-2 border-red-600  "
                                            : "border-2 border-gray-300 "
                                            }`}
                                    />
                                    <ErrorMessage
                                        name='firstName'
                                        component='p'
                                        className="text-xs text-red-500 mt-1"
                                    />
                                </div>

                                <div>
                                    <label
                                        className=' text-md text-gray-950'
                                        htmlFor="email">Last Name*</label>
                                    <Field
                                        name="lastName"
                                        className={`w-full rounded p-2.5 transition-all shadow-xs
                                                               focus:outline-[#0B2C5F]
                                                                 ${errors.lastName && touched.lastName
                                                ? "border-2 border-red-600  "
                                                : "border-2 border-gray-300 "
                                            }
                                                `}
                                        type="text" />
                                    <ErrorMessage
                                        name='lastName'
                                        component='p'
                                        className="text-xs text-red-500 mt-1"
                                    />
                                </div>

                                <div>
                                    <label
                                        className='text-md text-gray-950'
                                        htmlFor="email">Email*</label>
                                    <Field
                                        name="email"
                                        className={`w-full rounded p-2.5 transition-all shadow-xs focus:outline-[#0B2C5F] ${errors.email && touched.email
                                            ? "border-2 border-red-600  "
                                            : "border-2 border-gray-300 "}  `}
                                        type="email"
                                    />
                                    <ErrorMessage
                                        name='email'
                                        component='p'
                                        className="text-xs text-red-500 mt-1"
                                    />
                                </div>
                                <div className='mt-2' >
                                    <p className='text-md text-gray-950' >Role*</p>
                                </div>
                                {/* <div className='grid grid-cols-2 lg:grid-cols-4 bg-green-600 gap-5'> */}
                             

<div className='grid grid-cols-2 lg:grid-cols-4 gap-5 '>
    {cardButton.map((data, index) => (
        <button
            type="button"
            key={index}
            onClick={() =>
                setroleTabe({
                    name: data.tabName,
                    index: index
                })
            }
            className={`flex flex-col gap-2 justify-center items-center border-2 rounded p-5 transition duration-200 ${
                roleTabe?.index === index 
                    ? "border-[#0B2C5F] shadow-xl scale-105"
                    : "border-gray-400 hover:border-[#0B2C5F] hover:shadow-xl"
            }`}
        >
            <img src={data.imageUrl} alt="" className="w-[55%] " />
            <p className='text-gray-700 text-sm text-center'>
                {data.tabName}
            </p>
        </button>
    ))}
</div>


                                <div className='flex flex-col gap-8 mt-1 ' >
                                    {roleTabe.name === "Worker" && (

                                        <>
                                            <div className='flex flex-col gap-4' >
                                                <div className='flex justify-between gap-7'>
                                                    <h className="text-xl text-gray-800" >Labs (Optional)</h>
                                                    <button className='py-2 px-5 rounded-sm bg-[#0B2C5F] transition duration-200 hover:shadow-lg hover:opacity-90  text-white'
                                                        type="button"
                                                        onClick={() => {

                                                            seteditedSection(null);
                                                            fetchModal("labs");
                                                            setError(false);
                                                        }}
                                                    >+ Assign Labs</button>
                                                </div>

                                                   {/* to render the approver section  */}
                                                {selectedLabatom?.length > 0 && (
                                                    <ApproverSection
                                                        Approver={aproverManager}
                                                        worker={true}
                                                        sectionName={"Labs"}
                                                        parentValue={workerLabAtom}
                                                        sectionType={"labs"}
                                                        draftValue={workerLabDraftAtom}

                                                    />
                                                )}
                                            </div>

                                        </>
                                    )}
                                    {roleTabe.name === "Manager" && (
                                        <>
                                            <div className='flex flex-col gap-4' >
                                                <div className='flex justify-between gap-7'>
                                                    <h className="text-xl text-gray-800" >Labs (Optional)</h>
                                                    <button className='py-2 px-5 rounded-sm bg-[#0B2C5F] transition duration-200 hover:shadow-lg hover:opacity-90  text-white'

                                                        type="button"
                                                        onClick={() => {

                                                            seteditedSection(null);
                                                            fetchModal("manager");
                                                            setError(false);
                                                        }}

                                                    >+ Assign Labs</button>
                                                </div>

                                             {/* to render the approver section  */}
                                                {selectedMangeratom?.length > 0 && (
                                                    <ApproverSection
                                                        Approver={aproverManager}
                                                        sectionName={"Labs"}
                                                        parentValue={managerLabAtom}
                                                        sectionType={"manager"}
                                                        draftValue={managerLabDraftAtom}
                                                    />
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {roleTabe.name === "Department Manager" && (
                                        <>
                                            <div className='flex flex-col gap-4' >
                                                <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-7">
                                                    <h2 className="text-xl font-semibold text-gray-800">
                                                        Departments (Optional)
                                                    </h2>

                                                    <button className="py-2 px-5 rounded-sm bg-[#0B2C5F] 
                                                       transition duration-200 hover:shadow-lg hover:opacity-90 text-white"
                                                        type="button"
                                                        onClick={() => {
                                                            seteditedSection(null);
                                                            fetchModal("department");
                                                            setError(false)
                                                        }}
                                                    >
                                                        + Assign Department
                                                    </button>
                                                </div>

                                                   {/* to render the approver section  */}
                                                {selectedDepartment?.length > 0 && (
                                                    <ApproverSection
                                                        Approver={aproverDepartment}
                                                        sectionName={"Department"}
                                                        parentValue={departmentLabAtom}
                                                        sectionType={"department"}
                                                        draftValue={departmentLabDraftAtom}
                                                    />
                                                )}
                                            </div>
                                        </>
                                    )}

                                    <div className='flex justify-end gap-7'>
                                        <button className='py-2 px-5 rounded-sm  text-gray-900 border-2 hover:bg-[#0B2C5F]/15 transition duration-200 border-[#0B2C5F]'
                                            type="button"
                                            onClick={() => { closeModal(); resetAll() }}
                                        >Cancel</button>
                                        <button className='py-2 px-5 rounded-sm bg-[#0B2C5F] transition duration-200 hover:shadow-lg hover:opacity-90  text-white'
                                            type='submit'
                                        >Create</button>
                                    </div>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            </>

        </div>
    )
}

export default ModalContent


//==================================================> addlabs second modal content for adding the workers 
const Addlabs = () => {
    const [editedSection, setSeditedSection] = useAtom(sectionTypeAtom)
    const { openModal, closeModal } = useModal()
    const [draft, setDraft] = useAtom(workerLabDraftAtom)
    const [confirmed, setConfirmed] = useAtom(workerLabAtom)
    const [error, setError] = useAtom(errorAtom);
   // const [loading, setLoading] = useState(false);
    const [labs, setLabs] = useAtom(labsListAtom);
    const{fetchLabs,loading, } = useFetchLabs();

    useEffect(() => {
        fetchLabs("labs");
    }, []);

    const handleSubmited = () => {
        const isValid = handleConfirm(draft, labs);
        console.log("isValid", isValid);

        if (!isValid) {
            setError(true);
            return;
        }
        setError(false);
        setConfirmed(draft);
        closeModal();
    };

    return (
        <>
        {loading ? (<Loading/>) :(
            
            <div className='flex flex-col gap-6' >
                <div className='flex flex-col'>
                    <label htmlFor="">Lab</label>
                      {/* to render the selectable field  */}
                    <LabelSelected
                        placeHolder={" Labs"}
                        data={labs}
                        selectedAtom={workerLabAtom}
                        searchAtom={searchLabAtom}
                        dropdownAtom={dropDownLabAtom}
                        draftAtom={workerLabDraftAtom}
                    />
                </div>
                <div className='flex  justify-center'>
                    <button className='py-2 px-14 rounded-sm bg-[#0B2C5F] transition duration-200 hover:shadow-lg hover:opacity-90  text-white'
                        onClick={() => { handleSubmited() }}
                    >{editedSection === "labs" ? "Update Labs" : "Assign Lab"}</button>
                </div>
            </div>
            )}
        </>
    )
}



// =====================================> AddlabsManager second modal content for adding the managers in the lab 
const AddlabsManager = () => {
    const [editedSection, setSeditedSection] = useAtom(sectionTypeAtom)
    const [approverLab, setapproverLab] = useAtom(approverManager)
    const [draftManager, setDraftManager] = useAtom(managerLabDraftAtom)
    const [confrim, setConfirmedManager] = useAtom(managerLabAtom)
    const [modalIndex, setModalIndex] = useAtom(modalStackAtom);
    const { openModal, closeModal } = useModal();
    const [error, setError] = useAtom(errorAtom);

const{fetchLabs,loading, labs} = useFetchLabs();

    useEffect(() => {
        fetchLabs("manager");
    }, []);



    // toggle function for approver for yes or no
    const handleApproverToggle = (labId, value) => {
        const updatedDraft = draftManager.map(item =>
            item.id === labId
                ? { ...item, approver: value }
                : item
        );
        setDraftManager(updatedDraft);
    };

    // final handle sumbit for select the value and close the modal 
    const handleSubmited = () => {
        const isValid = handleConfirm(draftManager, labs);// handle confirm for confirm the function
        console.log("isValid", isValid);
        console.log('draftManager', draftManager);
        if (!isValid) {
            setError(true);
            return;
        }
        setError(false);
        setConfirmedManager(draftManager);
        closeModal();
    };

    // thats the logic for the default yes or no button it give the fake no value if there is no assign any to the valjue
    const renderDraft =
        draftManager.length > 0
            ? draftManager
            : [{ id: "default", approver: false }];

    console.log('Manager Lab Atom ', confrim);
    return (
        <>
        {
            loading ? (<Loading />) : (
        
            <div className='flex flex-col gap-6' >
                <div className='flex flex-col'>
                    <label htmlFor="">Lab</label>

                      {/* to render the selectable field  */}
                    <LabelSelected
                        placeHolder={" Labs"}
                        data={labs}
                        selectedAtom={managerLabAtom}
                        searchAtom={searchManagerAtom}
                        dropdownAtom={dropDownManagerAtom}
                        draftAtom={managerLabDraftAtom}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <label htmlFor="">Approver *</label>
                    {renderDraft.map(item => (
                        <div className='flex gap-2.5'
                            key={item.id}
                        >
                            <button className={`border-2 ${item.approver === false ? "border-[#0B2C5F] shadow-lg" : "border-gray-400"} transition-all 
                        duration-150 hover:border-[#0B2C5F] hover:scale-105 shadow-sm rounded-md gap-3  flex flex-col p-5 items-center justify-center`}

                                onClick={() => handleApproverToggle(item.id, false)}
                            >
                                <img src="https://diasorin-test-dev.netlify.app/images/approver-true.svg" alt="" className='w-[50%]' />
                                <p className='text-md text-gray-500'  >No</p>
                            </button>

                            <button className={`border-2 ${item.approver === true ? "border-[#0B2C5F] shadow-lg" : "border-gray-400"} transition-all 
                        duration-150  hover:border-[#0B2C5F] hover:scale-105 shadow-sm rounded-md gap-3  flex flex-col p-5 items-center 
                        justify-center`}

                                onClick={() => handleApproverToggle(item.id, true)}
                            >
                                <img src="https://diasorin-test-dev.netlify.app/images/approver-false.svg" alt="" className='w-[50%]' />
                                <p className='text-md text-gray-500' >Yes</p>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='flex  justify-center'>
                    <button className='py-2 px-14 rounded-sm bg-[#0B2C5F] transition duration-200 hover:shadow-lg hover:opacity-90 
                     text-white'

                        onClick={() => handleSubmited()}
                    >{editedSection === "manager" ? "Update Labs" : "Assign Lab"}</button>
                </div>
            </div>
            )
        }
        </>
    )
}



//============================================>  AddDepartment second modal content for adding the Department 
const AddDepartment = () => {
    const [editedSection, setSeditedSection] = useAtom(sectionTypeAtom)
    const [approverLab, setapproverLab] = useAtom(approverDepartment)
    const [draftDepartment, setDraftDepartment] = useAtom(departmentLabDraftAtom)
    const [, setConfirmedDeaprtment] = useAtom(departmentLabAtom)
    const [modalIndex, setModalIndex] = useAtom(modalStackAtom);
    const { openModal, closeModal } = useModal();
const [labs] = useAtom(labsListAtom);
    const [error, setError] = useAtom(errorAtom);


    const{fetchLabs,loading, } = useFetchLabs();

    useEffect(() => {
        fetchLabs("department");
    }, []);

    // toggle function for approver for yes or no
    const handleApproverToggle = (deptId, value) => {
        const update = draftDepartment.map(item =>
            item.id === deptId ? { ...item, approver: value }
                : item
        )
        setDraftDepartment(update)
        console.log('draftManager', draftDepartment);
    }

    // final handle sumbit for select the value and close the modal 
    const handleSubmited = () => {
        const isValid = handleConfirm(draftDepartment, labs);
        console.log("isValid", isValid);
        console.log('draftManager', draftDepartment);
        if (!isValid) {
            setError(true);
            return;
        }
        setError(false);
        setConfirmedDeaprtment(draftDepartment);
        closeModal();
    };

    // thats the logic for the default yes or no button it give the fake no value if there is no assign any to the value
    const renderDraft = draftDepartment.length > 0 ? draftDepartment
        : [{ id: "default", approver: false }]

    return (
        <>
        {loading ? (<Loading />) : (
            <div className='flex flex-col gap-6' >
                <div className='flex flex-col'>
                    {/* to render the selectable field  */}
                    <LabelSelected
                        placeHolder={"Department"}
                        data={labs}
                        selectedAtom={departmentLabAtom}
                        searchAtom={searchDepartmentAtom}
                        dropdownAtom={dropDownDepartmentAtom}
                        draftAtom={departmentLabDraftAtom}
                    />
                </div>

                <div className='flex flex-col gap-5'  >
                    <label htmlFor="">Approver *</label>
                    {renderDraft.map((item) => (
                        <div className='flex gap-2.5'
                            key={item.id}
                        >
                            <button className={`border-2 ${item.approver === false ? "border-[#0B2C5F] shawdow-lg " : "border-gray-400"} transition-all duration-150 hover:border-[#0B2C5F] hover:scale-105 shadow-sm rounded-md gap-3  flex flex-col p-5 items-center justify-center`}
                                onClick={() => handleApproverToggle(item.id, false)}
                            >
                                <img src="https://diasorin-test-dev.netlify.app/images/approver-true.svg" alt="" className='w-[50%]' />
                                <p className='text-md text-gray-500'  >No</p>
                            </button>

                            <button className={`border-2 ${item.approver === true ? "border-[#0B2C5F] shawdow-lg" : "border-gray-400"} transition-all duration-150  hover:border-[#0B2C5F] hover:scale-105 shadow-sm rounded-md gap-3  flex flex-col p-5 items-center justify-center`}
                                onClick={() => handleApproverToggle(item.id, true)}
                            >
                                <img src="https://diasorin-test-dev.netlify.app/images/approver-false.svg" alt="" className='w-[50%]' />
                                <p className='text-md text-gray-500' >Yes</p>
                            </button>
                        </div>
                    ))}
                </div>

                <div className='flex  justify-center'>
                    <button className='py-2 px-14 rounded-sm bg-[#0B2C5F] transition duration-200 hover:shadow-lg hover:opacity-90  text-white'
                        onClick={() => handleSubmited()}
                    >{editedSection === "department" ? "Update Department" : "Assign Department"}</button>
                </div>
            </div>
        )}
        </>
    )
}


//===========================================>thats the approver section which is shown on after given the approver from the lab manager and the departmnet
const ApproverSection = ({ Approver, worker, sectionName, parentValue, setEdit, sectionType, draftValue }) => {
    const [Eidtsetion, setEditSSection] = useAtom(sectionTypeAtom)
    const { openModal, closeModal } = useModal();
    const [selectedValue, setSelectedValue] = useAtom(parentValue)
    const [error, setError] = useAtom(errorAtom);
    const [selectedLabatom] = useAtom(workerLabAtom)
    const [selectedMangeratom] = useAtom(managerLabAtom)
    const [selectedDepartment] = useAtom(departmentLabAtom)
    const [labs, setLabs] = useAtom(labsListAtom);
    const [loading, setLoading] = useAtom(labsLoadingAtom);
    const [draft, setDraft] = useAtom(draftValue)

    //fetch lab api call again to fetch and add the selected value
    const fetchLabs = async (section, isEdit = false) => {
        setLoading(true);
        try {
            const excludeIdMap = {
                labs: selectedLabatom,
                manager: selectedMangeratom,
                department: selectedDepartment,
            }
            const excludeIds = excludeIdMap[section]?.map(lab => lab.id).join(",");
            const param = {
                limit: 10,
                offset: 0,
                search: "",
                exclude_ids: excludeIds || "",
            };
            // API mapping
            const apiMap = {
                labs: getWorkerUser,
                manager: getWorkerUser,
                department: getDepartment,
            };
            const currentAtomMap = {
                labs: selectedLabatom,
                manager: selectedMangeratom,
                department: selectedDepartment,
            }
            const res = await apiMap[section](param);

            if (res?.success) {
                let apiData = res.payload.map(item => ({
                    ...item,
                    approver: item.approver ?? false
                }));

                if (isEdit) {
                    const currentSelected = currentAtomMap[section] || [];
                    apiData = [
                        ...currentSelected,
                        ...apiData.filter(
                            item => !currentSelected.some(sel => sel.id === item.id)
                        )
                    ];
                }
                setLabs(apiData);
            }

        } catch (error) {
            console.log("fetchLabs error", error);
        } finally {
            setLoading(false);
        }
    };

    // function for the modal title 
    const getModalTite = (sectionType) => {
        switch (sectionType) {
            case "labs":
                return "Assign Lab"

            case "manager":
                return "Assign Manager Lab"

            case "department":
                return "Assign Department"

            default:
                return ""
        }
    }

    // function for the modal content
    const renderSectionModal = (sectionType) => {
        switch (sectionType) {
            case "labs":
                return <Addlabs />

            case "manager":
                return <AddlabsManager />

            case "department":
                return <AddDepartment />

            default:
                return null
        }
    }

    console.log("edit workerLabAtom", selectedLabatom);

    // delete handle which remove the specific item
    const handleDelete = (item) => {
        const delFilter = selectedValue.filter(l => l.id !== item.id)
        setSelectedValue(delFilter)
        setDraft(delFilter)
        console.log(" selecteed manager atom on delete ", selectedMangeratom);
        log();
    }
    const log = () => { console.log("parent or seledted value after del", selectedValue) }

    return (
        <>
            <div className='flex flex-col gap-4' >
                {selectedValue.map((item, index) => (
                    <div className='flex  justify-between  bg-white  shadow-sm shadow-gray-700 rounded-xl p-3'
                        key={index}
                    >
                        <div className='flex flex-col  justify-center gap-1'>
                            <h4 className='text-md text-gray-400' >{sectionName}</h4>
                            <h4 className='text-md text-gray-800 font-bold' >{item.name}</h4>
                        </div>
                        <div className='flex gap-9 ' >
                            <div className='flex flex-col items-center justify-center gap-1'>

                                {!worker && (
                                    <>
                                        <h4>Approver</h4>
                                        {item.approver ?
                                            <span className='rounded-full p-1 bg-green-400' ><Check size={18} className='text-white font-extrabold' /></span>
                                            : <span className='rounded-full p-1 bg-red-400' ><X size={18} className='text-white font-extrabold' /></span>}
                                    </>
                                )}
                            </div>
                            <div className='flex gap-2 items-center justify-center' >
                                <button className='bg-[#0B2C5F] p-2 rounded cursor-pointer hover:opacity-95 '
                                    type="button"
                                    onClick={() => {
                                        setEditSSection(sectionType);  
                                        fetchLabs(sectionType, true);
                                        openModal({
                                            title: getModalTite(sectionType),
                                            size: "sm",
                                            height: "h-full",
                                            content: renderSectionModal(sectionType),
                                        });
                                        setError(false)
                                    }}
                                ><Pencil size={22} className='text-white' /></button>
                                <button className='bg-[#0B2C5F] p-2 rounded cursor-pointer hover:opacity-95 '
                                    type="button"
                                    onClick={() => handleDelete(item)}
                                ><Trash2 size={22} className='text-white' /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}




export const Loading = () => {
  return (
    <div className='fixed inset-0 z-40 bg-black/50 flex items-center justify-center ' >
      <div className=' w-10 h-10  md:w-24 md:h-24 rounded-full border-4 border-gray-400 border-t-blue-800 animate-spin' />
    </div>
  )
}