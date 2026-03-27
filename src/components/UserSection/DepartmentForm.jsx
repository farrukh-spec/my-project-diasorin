
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
const DepartmentForm = ({ form }) => {

  const { openModal, closeModal } = useModal();
  const initialValues = {
    is_approval: APPROVER[1],
    department: null,
  };

  const validationSchema = Yup.object({
    is_approval: Yup.object().nullable().required("This field is required"),
    department: Yup.object().nullable().required("This field is required")
  })

  const handleSubmit = (values, formikBag) => {
    const payload = {
      id: values.department.value?.id,
      title: values.department.value?.name,
      is_approval: values.is_approval?.value,
      department_data: values.department?.value,
    }

    const existingDepartmentIndex = form.values.departments.findIndex((dep) => dep.id === payload.id);

    if (existingDepartmentIndex !== -1) {
      const updatedDepartments = form?.values?.departments.map((dept, index) => index === existingDepartmentIndex ? payload : dept);
      form.setFieldValue("departments", updatedDepartments);
    }
    else {
      // form.setFieldValue("labs", [...form?.values?.labs, payload]); 
      form.setFieldValue('departments', [...(form?.values?.departments || []), payload]);
    }
    formikBag.resetForm();
    // console.log("lab values", values);
  }


  const PopupForm = (department = null, index = null) => {
    return (
      openModal({
        title: department ? "Edit Department" : "Assign Department",
        size: "sm",
        height: "h-full",
        content: (
          <Formik
            initialValues={
              department ? {
                is_approval: {
                  label: APPROVER.find((option) => option.value === department.is_approval)?.label || "-",
                  value: department?.is_approval ? department?.is_approval : null,
                },
                department: {
                  label: department?.department_data?.name,
                  value: department?.department_data,
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
            {departmentForm => (
              <div className="mb-5 gap-5 flex flex-col items-center">
                <SelectAPIField
                  form={departmentForm}
                  field="department"
                  label_text='Department'
                  placeholder='Department'
                  // url="api/department"
                  url="department"
                  valueGenerator={val => ({ label: val.name || '-', value: val })}
                 // query_params={`&exclude_ids=${form.values?.departments?.map(dept => dept?.id).join(",")}`}
                  query_params={form.values?.departments?.map(dept => dept?.id).join(",")}
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
                                         ${departmentForm?.values?.is_approval?.value === approver.value ? 'border-[#0B2C5F] shadow-lg' : 'border-gray-300 hover:border-[#0B2C5F]  hover:shadow-md'}`}
                        onClick={() => {

                          departmentForm.setFieldValue("is_approval", approver);

                        }}
                      >
                        <img
                          src={`/images/approver-${approver.value}.svg`}
                          alt={approver.label}
                          className="w-[50%] mb-3"
                        />
                        {/* <IoCheckbox className='text-xl'/> */}
                        <span className={`text-sm ${departmentForm?.values?.is_approval?.value === approver.value ? 'text-[#0B2C5F]' : 'text-gray-700'}`}>
                          {approver.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={departmentForm.submitForm}
                  type="button"
                  className="py-2.5 px-10 flex justify-between items-center bg-[#0B2C5F] text-white rounded-lg "
                >
                  {department ? 'Update Department' : 'Assign Department'}
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
        <div className=" flex flex-col lg:flex-row  lg:items-center justify-between font-medium w-full">
          Departments (Optional)
          <button
            onClick={() => PopupForm()}
            type="button"
            className=" mt-2 lg:mt-0  p-2.5  flex gap-3 items-center justify-center bg-[#0B2C5F] text-white rounded-lg"
          >
            {/* <IoAddOutline className="text-xl mr-2" /> */}
            <FaPlus className="text-xs mr-2" />
            Assign Department
          </button>
        </div>
      </div>
      <div className="gap-2 flex flex-col">
        {form?.values?.departments?.map((p, i) => (
          <div key={i} className="p-3 btn-shadow rounded-[10px]">


            <div className="flex gap-y-1 justify-between items-center">
              <div className="w-[60%] flex flex-col items-start justify-between">
                <p className="text-sm text-t-dark/80">Department</p>
                <p className="text-md font-medium text-t-dark">{p.department_data?.name}</p>
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
                      const updatedDepartments = form.values.departments.filter(
                        (_, index) => index !== i
                      );
                      form.setFieldValue('departments', updatedDepartments);
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

export default DepartmentForm
