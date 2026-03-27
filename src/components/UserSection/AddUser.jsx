
import React from 'react'
import { Formik, Form } from 'formik'
import * as  Yup from 'yup'
import TextField from './TextField'
import { useModal } from '@/store/useModal'
import { ROLES_ARR, ROLE_DEPARTMENT_MANGER, ROLE_MANAGER, ROLE_WORKER, } from './constant'
import { stringNotEmpty } from '../utils/handleConfirm'
import { Loading } from '../dashBoard/dashBoard'
import WorkerForm from './WorkerForm'
import ManagerForm from './ManagerForm'
import DepartmentForm from './DepartmentForm'
import { addUser,updateUser } from '@/api/userService'
const AddUser = ({ update=null, fetchUsers,refreshListing,refreshData}) => {
    // validation schema
    const initialValues = {
        first_name: update ? update.first_name : "",
        last_name: update ? update.last_name : "",
        email: update ? update.email : "",
        departments: [],
        labs: [],
        role: update ? ROLES_ARR.find((role) => role.value === update.role) : null,
    }
    Yup.addMethod(Yup.string, 'StringNotEmpty', stringNotEmpty);
    const schema = Yup.object({
        first_name: Yup.string().StringNotEmpty(),
        last_name: Yup.string().StringNotEmpty(),
        email: Yup.string().email("Invalid email format").StringNotEmpty(),
        role: update ? Yup.object().nullable() : Yup.object().nullable().required("This field is required"),
    });

    const { openModal, closeModal } = useModal();

    const handleSubmit = async (values,formikBag) => {
        try {
 console.log("Submitting...", values);

            const payload = update ? {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
               ... ( values.role.value === ROLE_WORKER.value &&

               { lab_assignments: values.labs.map((lab) => ({
                    lab: lab.id,
                   })),
                }),
                 ... ( values.role.value === ROLE_MANAGER.value &&

               { lab_assignments: values.labs.map((lab) => ({
                    lab: lab.id,
                    is_approval: lab.is_approval,
                   })),
                }),
                 ... ( values.role.value === ROLE_DEPARTMENT_MANGER.value &&

            //    { lab_assignments: values.departments.map((dept) => ({
            //         department: dept.id,
            //         is_approval: dept.is_approval,
            //        })),
            //     }
             { department_assignments: values.departments.map((dept) => ({
                    department: dept.id,
                    is_approval: dept.is_approval,
                   })),
                }
            ),
            } : {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                 role_code: values.role.value,
                  ... ( values.role.value === ROLE_WORKER.value &&

               { lab_assignments: values.labs.map((lab) => ({
                    lab: lab.id,
                   })),
                }),
                ... ( values.role.value === ROLE_MANAGER.value &&

               { lab_assignments: values.labs.map((lab) => ({
                    lab: lab.id,
                    is_approval: lab.is_approval,
                   })),
                }),
                   ... ( values.role.value === ROLE_DEPARTMENT_MANGER.value &&

            //    { lab_assignments: values.departments?.map((dept) => ({
            //         department: dept.id,
            //         is_approval: dept.is_approval,
            //        })),
            //     }
            { department_assignments: values.departments?.map((dept) => ({
                    department: dept.id,
                    is_approval: dept.is_approval,
                   })),
                }
            ),
                

            };
                console.log("payload", payload);
                let result;
if (update) {
     result = await updateUser(update.id, payload);
   // console.log("update result", result);
    //refreshData()
}
else {     result = await addUser(payload);
    //console.log("add result", result);
}
formikBag.setSubmitting(false);
//refreshData()
closeModal();
//refreshData()
refreshListing()
//  if (refreshData) refreshData();
//  console.log("refreshData",refreshData);
 
       if (refreshListing) refreshListing();
        console.log("refreshListing",refreshListing);
        
//await fetchUsers();


        } catch (error) {
            if (error.response) {
                console.log("error response", error.response.data.description);
            }
        }
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
            > {form => (

                <Form className='mb-16 sm:mb-6 xl:mb-0' >
{/* 
 <pre className="text-xs bg-gray-100 p-2 rounded mb-4">
        {JSON.stringify({ values: form.values, errors: form.errors, touched: form.touched }, null, 2)}
    </pre> */}

                    <div className='mb-5  grid sm:grid-cols-1 gap-5'>
                        <TextField
                            field={"first_name"}
                            label_text={"First Name"}
                            placeholder={"First Name"}
                            form={form}
                        />

                        <TextField
                            field={"last_name"}
                            label_text={"Last Name"}
                            placeholder={"Last Name"}
                            form={form}
                        />

                        {
                            <>
                                {
                                    <>
                                        <TextField
                                            field={"email"}
                                            label_text={"Email"}
                                            placeholder={"Email"}
                                            form={form}
                                        />

                                        <div className="z-20">
                                            <label className="text-xs font-medium inline-block ">
                                                Role
                                            </label>
                                            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-5 ">
                                                {ROLES_ARR.map((role) => (
                                                    <div
                                                        key={role.value}
                                                        className={`p-5 border-2 rounded-lg  flex flex-col justify-center items-center text-center transition duration-300 
                                                                    ${form.values.role?.value === role.value ? 'border-primary shadow-lg' : 'border-gray-300 hover:border-primary hover:shadow-md'}
                                                                    ${update ? 'opacity-50 cursor-not-allowed ' : 'cursor-pointer'}
                                                                    `}
                                                        onClick={() => {
                                                            if (!update) {
                                                                // form.setFieldValue("role", role);
                                                                form.setFieldValue("role", role);
                                                                form.setFieldValue("departments", []);
                                                                form.setFieldValue("labs", []);
                                                            }
                                                        }}
                                                    >
                                                        <img
                                                            src={`/images/${role.value}.svg`}
                                                            alt={role.label}
                                                            className=" w-[50%]  mb-3"
                                                        />
                                                        <span className={`text-sm ${form.values.role?.value === role.value ? 'text-primary' : 'text-gray-700'}`}>
                                                            {role.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            {form.errors.role && form.touched.role && (
                                                <div className="text-red-500 text-xs mt-1">
                                                    {form.errors.role}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                }
                                {
                                    form.values.role?.value === ROLE_DEPARTMENT_MANGER.value && !update ?
                                        <div className=''>
                                            {/* <DepartmentManagerForm form={form} /> */}
                                            {/* department manager form is not ready yet */}
                                            <DepartmentForm form={form} />
                                        </div>
                                        : null
                                }
                                {
                                    form.values.role?.value === ROLE_MANAGER.value && !update ?
                                        <div className=''>
                                            {/* <ManagerForm form={form} /> */} 
                                            {/* manager form is not ready yet */}
                                            <ManagerForm form={form}/>
                                        </div>
                                        : null
                                }
                                {
                                    form.values.role?.value === ROLE_WORKER.value && !update ?
                                        <div className=''>
                                            {/* <WorkerForm form={form} /> */}
                                             {/* worker form is not ready yet */}
                                             <WorkerForm form={form} />
                                        </div>
                                        : null
                                }
                            </>
                        }
                    </div>
                    <div className="space-x-5 flex justify-end items-center">
                        <button
                            disabled={form.isSubmitting}
                            onClick={closeModal}
                            type="button"
                            className='py-2 px-5 rounded-sm  text-gray-900 border-2 hover:bg-[#0B2C5F]/15 transition duration-200 border-[#0B2C5F]'
                        >
                            <div className=''>
                                {
                                    form.isSubmitting ?
                                        <div className='flex items-center justify-center'>
                                            {/* <Loading /> */}
                                            Loading....
                                        </div>
                                        :
                                        "Cancel"
                                }
                            </div>
                        </button>
                        <button
                            disabled={form.isSubmitting}
                            type="submit"
                            // onClick={()=> console.log("form.values", form.values)}
                            className='py-2 px-5 rounded-sm bg-[#0B2C5F] transition duration-200 hover:shadow-lg hover:opacity-90  text-white'
                        >
                            <div>
                                {
                                    form.isSubmitting ?
                                        <div className='flex items-center justify-center'>
                                            {/* <Loading /> */}
                                            Loading....
                                        </div>
                                        :
                                        update ?
                                            "Update"
                                            :
                                            "Create"
                                }
                            </div>
                        </button>
                    </div>
                </Form>

            )}
            </Formik>
        </>
    )
}

export default AddUser





