import axios from "axios";

import {
    ATOMIC_ASSETS_API,
    RTP_GAME,
    RTP_GAME_COLLECTION,
    EOSIO_TOKEN,
    RTP_TOKEN,

} from "../Constants";
import { fetchRows, rpc, getDataFromAtomicApi } from '../Helpers';

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
        contract: RTP_TOKEN,
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
    // console.log(data)
    return data
};

const sliceArrayIntoChunks = (array) => {
    const perChunk = 500; // items per chunk + limit for assets per one request on atomic api

    return array.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index/perChunk);

        if(!resultArray[chunkIndex])
            resultArray[chunkIndex] = [];

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
};

export const fetchStakedItems = async ({account}) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: account,
        table: "workplaces",
        limit: 1,
    });

    if (!rows[0])
        return [];

     const stakedItems = [rows[0].workplace_asset_id];
    const stakedItemsChunks = sliceArrayIntoChunks(stakedItems);

    const assets = [];

    for (const items of stakedItemsChunks) {
        const data = await getDataFromAtomicApi(`assets?ids=${stakedItems}&page=1&limit=100`);
        console.log(items)
        assets.push(...data);
    }
     console.log(stakedItemsChunks)
    return assets
};

export const fetchResources = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: account,
        table: "resources"
    });

    if (!rows[0])
        return rows[0] = {wood: 0, stone: 0, food: 0, miles: 0, science_points: 0};

    return rows[0];

};

export const fetchCurrentEra = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: RTP_GAME,
        table: "eraconfig"
    });

    if (!rows[0])
        return rows[0] = {title: 'Prehistoric age'};

    return rows;

};

export const fetchToolConfig = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: RTP_GAME,
        table: "toolconfig"
    });

    if (!rows[0])
        return rows[0] = [];

    return rows;

};

export const fetchWpConfig = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: RTP_GAME,
        table: "wpconfig"
    });

    if (!rows[0])
        return rows[0] = [];

    return rows;

};












