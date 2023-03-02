import {fetchRows} from "../Helpers";
import {RTP_GAME} from "../Constants";

export const fetchPoolConfig = async () => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: RTP_GAME,
        table: "poolconfig"
    });

    if (!rows)
        return []

    return rows[0];

};
