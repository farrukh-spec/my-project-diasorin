import * as yup from "yup";
export const handleConfirm = (selected, data) => {
     if (selected.length === 0) return false;

  const isValidSelection =
    selected.length > 0 &&
    //data.some(lab => lab.id !== selected[0].id);

 
 data.some(lab =>
    selected.some(sel => sel.id === lab.id)
  );

  return isValidSelection;
};




export function stringNotEmpty() {
    return yup.mixed().test({
        name: "stringNotEmpty",
        exclusive: false,
      //  message: <FormattedMessage id="required" defaultMessage="Required" />,
      message: "This field is required",
        test: function (value) {
            if (value !== undefined && value !== false) {
                return value.trim() !== "";
            } else if (value === undefined) {
                return false;
            }
        },
    });
}