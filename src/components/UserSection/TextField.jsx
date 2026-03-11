import React from 'react'
import { Field,ErrorMessage } from 'formik'
const TextField = ({form, field, label_text, helper_text, password, isDisabled, type, hideError}) => {
  return (
       <>
            <div>
                {
                    label_text&&
                    <label htmlFor={field} className={"text-xs font-medium inline-block"}>{label_text}*</label>
                }
                <Field 
                    as={"input"}
                    type={type ? type : "text"}
                    name={field}
                    autoComplete="on"
                    id={field}
                    disabled={isDisabled}
                    placeholder={helper_text ? helper_text : ""}
                    className={`resize-none w-full rounded border border-gray-300 h-[52px] disabled:bg-gray-100 disabled:cursor-not-allowed input-text ${form.touched[field] && form.errors[field] ? "border border-red-500" : ""} ${form.values[field] && form.values[field].toString().length > 0 && " border border-green-500"}`}
                />
                {
                    !hideError &&
                    <p className="text-xs text-red-500">
                        <ErrorMessage name={field} />
                    </p>
                }
              
            </div>
        </>
  )
}

export default TextField