import { DELPHI_ORACLE } from "../Constants";
import { fetchRows } from "../Helpers";


export const fetchWaxCourse = async ({ account }) => {
    const {rows} = await fetchRows({
        contract: DELPHI_ORACLE,
        scope: 'waxpusd',
        table: "datapoints",
    });

    if (!rows[0])
        return rows[0] = {median: 0};

    return rows[0];
}