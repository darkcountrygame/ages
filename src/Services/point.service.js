import { RTP_GAME, RTP_TOKEN } from "../Constants";
import {signTransaction, fetchRows} from "../Helpers";

export const claimSciencePoints = async ({ activeUser }) => {
    // console.log(activeUser)
    return await signTransaction({
        activeUser,
        account: RTP_TOKEN,
        action: 'transfer',
        data: {
            from: activeUser.accountName,
            to: RTP_GAME,
            quantity: '10.0000 RTP',
            memo: 'research'
        }
    });
};

export const probabilityGetPoints = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        table: "researches",
        scope: RTP_GAME,
        lowerBound: account,
        upperBound: account,
    });

    if (!rows[0])
        return rows[0] = { probability: 0 };


    // console.log(rows[0])
    return rows[0].probability;
};