import { BiBorderRadius } from "react-icons/bi";

export const customStyle={
     placeholder: (provided, state) => ({
        ...provided,
        fontSize: "0.875rem",
        color: "#9ca3af"
    }),
    control:(provided,state)=>({
        ...provided,
         borderRadius:"6px",
          minHeight: "42px",
         border: state.isFocused ? " 2px solid #06255B" :"#d3d3d3 ",
         boxShadow: state.isFocused ? "0px 0px 0px #06255B" : "none",
        "&:hover":{
           //  borderColor: "#d3d3d3",
           boxShadow: "0px 0px 0px #000000",
        },
       fontSize: "0.875rem",
    }),

    option:(provided,state)=>({
        ...provided,
        backgroundColor:state.isSelected ? "#06255B !important" : "#FFFFFF",
        color: state.isSelected ? "#FFFFFF" : "#000 !important",
    "&:hover": {
      backgroundColor: "#06255B",
      color:"#ffffff !important"
    },
    fontSize: "0.875rem",
    })
    
}