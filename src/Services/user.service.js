import axios from "axios";

import {
    ATOMIC_ASSETS_API,
    RTP_GAME,
    RTP_GAME_COLLECTION,
    EOSIO_TOKEN,

} from "../Constants";
import { fetchRows, rpc } from '../Helpers';

export const fetchWaxBalance = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: EOSIO_TOKEN,
        scope: account,
        table: "accounts"
    });

    if (!rows[0])
        return `0 WAX`;

    const [value, currency] = rows[0].balance.split(' ');

    return `${Number(value).toFixed(1)} ${currency}`;
};

export const fetchRtpBalance = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: account,
        table: "collected",
        lowerBound: account,
        upperBound: account,
        limit: 1
    });

    if (!rows[0])
        return `0 RTP`;

    return `${Number(rows[0].quantity).toFixed(4)} RTP`;
};


export const fetchItems = async ({ account }) => {
    const {
        data: { data }
    } = await axios.get(`${ATOMIC_ASSETS_API}/assets?collection_name=${RTP_GAME_COLLECTION}&owner=${account}&page=1&limit=1000`);

    console.log(data)
};










