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
        table: "accounts"
    });

    if (!rows[0])
        return `0 RTP`;

    const [value, currency] = rows[0].balance.split(' ');

    return `${Number(value).toFixed(1)} ${currency}`;
};


export const fetchItems = async ({ account }) => {
    const {
        data: { data }
    } = await axios.get(`${ATOMIC_ASSETS_API}/assets?collection_name=${RTP_GAME_COLLECTION}&owner=${account}&page=1&limit=1000`);
    console.log(data)
    return data
};


export const fetchResources = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: account,
        table: "resources"
    });

    if (!rows[0])
        return `0`;

    return rows[0];

};












