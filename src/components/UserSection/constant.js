


export const ASSIGNED = "assigned"
export const UNASSIGNED = "unassigned"


export const ROLE_ADMIN = {
    value: "super-admin",
    access_level: 900,
    label: "Super Admin",
}
export const ROLE_WORKER = {
    value: "worker",
    access_level: 400,
    label: "Worker",
}
export const ROLE_MANAGER = {
    value: "manager",
    access_level: 500,
    label:"Manager",
}
export const ROLE_DEPARTMENT_MANGER = {
    value: "department-manager",
    access_level: 600,
    label: "Department Manager",
}
export const ROLE_SUPPLIER_MANAGER = {
    value: "supplier-manager",
    access_level: 700,
    label: "Supplier Manager",
}
export const ROLE_KEEPER = {
    value: "keeper",
    access_level: 800,
    label:"Keeper",
}
export const APPROVER = [
    {
        value: true,
        label:"Yes"
    },
    {
        value: false,
        label: "No",
    }
]

export const ROLES = [
    ROLE_WORKER,
    ROLE_MANAGER,
    ROLE_DEPARTMENT_MANGER,
    ROLE_SUPPLIER_MANAGER,
    ROLE_KEEPER,
    ROLE_ADMIN
]

export const ROLES_ARR = [
    ROLE_WORKER,
    ROLE_MANAGER,
    ROLE_DEPARTMENT_MANGER,
    // ROLE_SUPPLIER_MANAGER,
    ROLE_KEEPER,
]

// export const USER_ACTIVE = {
//     value: "active",
//     label:"Active",
// }
// export const USER_PENDING = {
//     value: "pending",
//     label: "Pending",
// }
// export const USER_DISABLED = {
//     value: "disable",
//     label: "Disabled",
// }

// export const USER_STATUS = [
//     USER_ACTIVE,
//     USER_PENDING,
//     USER_DISABLED
// ]
export const ORDER_DESCENDING = {
    value: "desc",
    label:"Most Recent",
}

export const LISTING_LIMIT = 30;


export const USER_ACTIVE = {
    value: "active",
    label: "Active",
}
export const USER_PENDING = {
    value: "pending",
    label: "Pending",
}
export const USER_DISABLED = {
    value: "disable",
    label: "Disabled",
}

export const USER_STATUS = [
    USER_ACTIVE,
    USER_PENDING,
    USER_DISABLED
]
export const DESENDING_ORDER = "desc"
