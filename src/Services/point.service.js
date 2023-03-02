import { RTP_GAME, RTP_TOKEN } from "../Constants";
import {signTransaction, fetchRows} from "../Helpers";

export const claimSciencePoints = async ({ activeUser, price }) => {
    return await signTransaction({
        activeUser,
        account: RTP_TOKEN,
        action: 'transfer',
        data: {
            from: activeUser.accountName,
            to: RTP_GAME,
            quantity: price,
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
        return rows[0] = [];



    return rows[0].probability;
};


export const spConfig = async () => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        table: "spconfig",
        scope: RTP_GAME,
    });

    if (!rows[0])
        return rows[0] = [];

    return rows[0];
};


export const totalSp = async ({account}) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        table: "sp",
        scope: account,
    });

    if (!rows[0])
        return rows[0] = [];


    return rows[0];
};