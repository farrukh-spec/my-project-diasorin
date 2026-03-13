import React from 'react'
import { Formik, Form } from 'formik'
import * as  Yup from 'yup'
import TextField from './TextField'
import { useModal } from '@/store/useModal'
import { ROLES_ARR, ROLE_DEPARTMENT_MANGER, ROLE_MANAGER, ROLE_WORKER, } from './constant'
import { stringNotEmpty } from '../utils/handleConfirm'
import { Loading } from '../dashBoard'
import { worker } from 'globals'
import { LuTrash2 } from 'react-icons/lu';
import { HiPencil } from 'react-icons/hi2';
import { FaPlus } from "react-icons/fa";
import {APPROVER} from './constant'
import SelectAPIField from './SelectAPIField'
const WorkerForm = ({ form }) => {
    const { openModal, closeModal } = useModal();
    const initialValues = {
        is_approval: null,
        lab: null,
    };

    const validationSchema = Yup.object({
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
                                    query_params={`&exclude_ids=${form.values?.labs?.map(lab => lab?.id).join(",")}`}
                                />

  

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
                                <p className="text-sm text-t-dark/80">Lab</p>
                                <p className="text-md font-medium text-t-dark">{p.lab_data?.name}</p>
                            </div>
                            <div className=" flex items-center justify-center">
                                <div className="flex items-center  gap-x-2">
                                    <button
                                        onClick={() => PopupForm(p, i)}
                                        type="button"
                                        className="btn btn-primary !min-w-[40px] !w-[40px] !h-[40px] !p-0 flex items-center justify-center"

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
                                        className="btn btn-primary !min-w-[40px] !w-[40px] !h-[40px] !p-0 flex items-center justify-center"
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

export default WorkerForm