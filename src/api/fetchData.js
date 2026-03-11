import { useAtom } from "jotai";
import { workerLabAtom, managerLabAtom, departmentLabAtom, labsListAtom, labsLoadingAtom } from "@/store/countAtom";
import { getWorkerUser, getDepartment,  } from '@/api/userService';

export function useFetchLabs() {
    const [loading, setLoading] = useAtom(labsLoadingAtom);
    const [selectedLabatom] = useAtom(workerLabAtom);
    const [selectedMangeratom] = useAtom(managerLabAtom);
    const [selectedDepartment] = useAtom(departmentLabAtom);
    const [labs, setLabs] = useAtom(labsListAtom);

    const fetchLabs = async (section) => {
        setLoading(true);

        try {
            const excludeIdMap = {
                labs: selectedLabatom,
                manager: selectedMangeratom,
                department: selectedDepartment,
            }
            const excludeIds = excludeIdMap[section]?.map(lab => lab.id).join(",");
            //params for the exclude id's
            const param = {
                limit: 10,
                offset: 0,
                search: "",
                exclude_ids: excludeIds || "",
            };

            //  API mapping
            const apiMap = {
                labs: getWorkerUser,
                manager: getWorkerUser,
                department: getDepartment,
            };

            const res = await apiMap[section](param);

            if (res?.success) {


                let apiData = res.payload.map(item => ({
                    ...item,
                    approver: item.approver ?? false
                }));

                console.log("apiData", apiData)
                //setLabs(res.payload);
                setLabs(apiData);
                
            }

        } catch (error) {
            console.log("fetchLabs error", error);
        } finally {
            setLoading(false);
        }
    };

    return { fetchLabs, loading, labs };
}
