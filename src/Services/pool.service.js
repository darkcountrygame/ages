import {fetchRows} from "../Helpers";
import {RTP_GAME} from "../Constants";

export const fetchPoolConfig = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: account,
        table: "poolconfig"
    });

    if (rows)
        return false

    return rows[0];

};
