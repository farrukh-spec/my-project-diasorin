import React from 'react'
import { Formik, Form } from 'formik'
import * as  Yup from 'yup'
import TextField from './TextField'
import { useModal } from '@/store/useModal'
import { ROLES_ARR, ROLE_DEPARTMENT_MANGER, ROLE_MANAGER, ROLE_WORKER, } from './constant'
import { stringNotEmpty } from '../utils/handleConfirm'
import { Loading } from '../dashBoard/dashBoard'
import { worker } from 'globals'
import { LuTrash2 } from 'react-icons/lu';
import { HiPencil } from 'react-icons/hi2';
import { FaPlus } from "react-icons/fa";
import { APPROVER } from './constant'
import SelectAPIField from './SelectAPIField'
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { IoCloseCircle } from "react-icons/io5";
const ManagerForm = ({ form }) => {

    const { openModal, closeModal } = useModal();
    const initialValues = {
        is_approval: APPROVER[1],
        lab: null,
    };

    const validationSchema = Yup.object({
        is_approval: Yup.object().nullable().required("This field is required"),
        lab: Yup.object().nullable().required("This field is required")
    })

    const handleSubmit = (values, formikBag) => {
        const payload = {
            id: values.lab.value?.id,
            title: values.lab.value?.name,
            is_approval: values.is_approval?.value,
            lab_data: values.lab?.value,
        }

        const existingLabIndex = form.values.labs.findIndex((lab,) => lab.id === payload.id);

        if (existingLabIndex !== -1) {
            const updatedLabs = form?.values?.labs.map((lab, index) => index === existingLabIndex ? payload : lab);
            form.setFieldValue("labs", updatedLabs);
        }
        else {
            // form.setFieldValue("labs", [...form?.values?.labs, payload]); 
            form.setFieldValue('labs', [...(form?.values?.labs || []), payload]);
        }
        formikBag.resetForm();
        // console.log("lab values", values);
    }


    const PopupForm = (lab = null, index = null) => {
        return (
            openModal({
                title: lab ? "Edit Lab" : "Assign Lab",
                size: "sm",
                height: "h-full",
                content: (
                    <Formik
                        initialValues={
                            lab ? {
                                is_approval: {
                                    label: APPROVER.find((option) => option.value === lab.is_approval)?.label || "-",
                                    value: lab?.is_approval ? lab?.is_approval : null,
                                },
                                lab: {
                                    label: lab?.lab_data?.name,
                                    value: lab?.lab_data,
                                }
                            }
                                : initialValues
                        }
                        validationSchema={validationSchema}
                        onSubmit={(values, formikBag) => {
                            handleSubmit(values, formikBag);
                            closeModal();
                        }}
                    >
                        {managerForm => (
                            <div className="mb-5 gap-5 flex flex-col items-center">
                                <SelectAPIField
                                    form={managerForm}
                                    field="lab"
                                    label_text='Lab'
                                    placeholder='Lab'
                                    url="api/lab"
                                    valueGenerator={val => ({ label: val.name || '-', value: val })}
                                  //  query_params={`&exclude_ids=${form.values?.labs?.map(lab => lab?.id).join(",")}`}
    //                                  query_params={{
    //     exclude_ids: form.values?.labs?.map(lab => lab?.id).join(",") 
    // }}
     query_params={form.values?.labs?.map(lab => lab?.id).join(",")}
                                />

                                <div className='w-full'>

                                    <label className="text-xs font-medium inline-block">
                                        Approver *
                                    </label>
                                    <div className="mt-4 grid grid-cols-2 gap-5">
                                        {APPROVER.map((approver) => (
                                            <div
                                                key={approver.value}
                                                className={`p-5 border-2 rounded-lg cursor-pointer flex flex-col justify-center items-center text-center transition duration-300 
                                         ${managerForm?.values?.is_approval?.value === approver.value ? 'border-[#0B2C5F] shadow-lg' : 'border-gray-300 hover:border-[#0B2C5F]  hover:shadow-md'}`}
                                                onClick={() => {

                                                    managerForm.setFieldValue("is_approval", approver);

                                                }}
                                            >
                                                <img
                                                    src={`/images/approver-${approver.value}.svg`}
                                                    alt={approver.label}
                                                    className="w-[50%] mb-3"
                                                />
                                                {/* <IoCheckbox className='text-xl'/> */}
                                                <span className={`text-sm ${managerForm?.values?.is_approval?.value === approver.value ? 'text-[#0B2C5F]' : 'text-gray-700'}`}>
                                                    {approver.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={managerForm.submitForm}
                                    type="button"
                                    className="py-2.5 px-10 flex justify-between items-center bg-[#0B2C5F] text-white rounded-lg "
                                >
                                    {lab ? 'Update Lab' : 'Assign Lab'}
                                </button>
                            </div>
                        )}
                    </Formik>
                )
            })
        );
    };


    return (
        <>
            <div className="mb-5 gap-2 flex flex-col items-center">
                <div className="flex items-center w-full justify-between font-medium self-start">
                    Labs (Optional)
                    <button
                        onClick={() => PopupForm()}
                        type="button"
                        className=" p-2.5  flex justify-between items-center bg-[#0B2C5F] text-white rounded-lg"
                    >
                        {/* <IoAddOutline className="text-xl mr-2" /> */}
                        <FaPlus className="text-xs mr-2" />

                        Assign Lab
                    </button>
                </div>
            </div>
            <div className="gap-2 flex flex-col">
                {form?.values?.labs?.map((p, i) => (
                    <div key={i} className="p-3 btn-shadow rounded-[10px]">


                        <div className="flex gap-y-1 justify-between items-center">
                            <div className="w-[60%] flex flex-col items-start justify-between">
                                <p className="text-sm text-t-dark/80"></p>
                                <p className="text-md font-medium text-t-dark">{p.lab_data?.name}</p>
                            </div>

                            <div className=" flex flex-col items-center gap-y-1 justify-between">
                                <p className="text-sm text-end text-t-dark/80">Approver</p>
                                {APPROVER.find(x => x.value === p.is_approval) === APPROVER[0] ? (
                                    <IoCheckmarkCircleSharp className="text-green-400 w-7 h-7" />
                                ) : (
                                    <IoCloseCircle className="text-red-500 w-7 h-7" />
                                )}
                            </div>
                            <div className=" flex items-center justify-center">
                                <div className="flex flex-col sm:flex-row items-center ml-5 gap-2">
                                    <button
                                        onClick={() => PopupForm(p, i)}
                                        type="button"
                                        className="text-white disabled:hover:scale-[1] overflow-hidden disabled:bg-gray-300 py-3 px-4 text-sm rounded-lg cursor-pointer bg-[#0B2C5F] focus:bg-[#051e43] hover:bg-[#051e43] !min-w-[40px] !w-[40px] !h-[40px] !p-0 flex items-center justify-center"

                                    >
                                        <HiPencil className='text-lg' />
                                    </button>

                                    <button
                                        onClick={() => {
                                            const updatedLabs = form.values.labs.filter(
                                                (_, index) => index !== i
                                            );
                                            form.setFieldValue('labs', updatedLabs);
                                        }}
                                        type="button"
                                        className="text-white disabled:hover:scale-[1] overflow-hidden disabled:bg-gray-300 py-3 px-4 text-sm rounded-lg cursor-pointer bg-[#0B2C5F] focus:bg-[#051e43] hover:bg-[#051e43] !min-w-[40px] !w-[40px] !h-[40px] !p-0 flex items-center justify-center"
                                    >
                                        <LuTrash2 className='text-lg' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ManagerForm