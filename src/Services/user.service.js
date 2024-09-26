import axios from "axios";

import {
    ATOMIC_ASSETS_API,
    RTP_GAME,
    RTP_GAME_COLLECTION,
    EOSIO_TOKEN,
    RTP_TOKEN,

} from "../Constants";
import { fetchRows } from '../Helpers';

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
    return data
};

// const sliceArrayIntoChunks = (array) => {
//     const perChunk = 500; // items per chunk + limit for assets per one request on atomic api

//     return array.reduce((resultArray, item, index) => {
//         const chunkIndex = Math.floor(index/perChunk);

//         if(!resultArray[chunkIndex])
//             resultArray[chunkIndex] = [];

//         resultArray[chunkIndex].push(item);

//         return resultArray;
//     }, []);
// };

export const fetchStakedWp = async ({account}) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: account,
        table: "workplaces",
        limit: 1000,
    });

    if (!rows[0])
        return [];

    return rows
};

// export const fetchStakedWp = async ({account}) => {
//     const { rows } = await fetchRows({
//         contract: RTP_GAME,
//         scope: account,
//         table: "workplaces",
//         limit: 1000,
//     });
//
//     if (!rows[0]) {
//         return [];
//     }
//
//     const updatedRows = await Promise.all(rows.map(async (row) => {
//         const { workplace_asset_id, ...rest } = row;
//         const dataWP = await getDataFromAtomicApi(`assets?ids=${workplace_asset_id}&page=1&limit=100`);
//         const updatedAssetId = dataWP;
//         const updatedTools = rest.tools ? await Promise.all(rest.tools.map(async (tool) => {
//             const { key, ...toolRest } = tool;
//             const dataTool = await getDataFromAtomicApi(`assets?ids=${key}&page=1&limit=100`);
//             const updatedKey = dataTool;
//             return { ...toolRest, key: updatedKey };
//         })) : [];
//         return { ...rest, workplace_asset_id: updatedAssetId, tools: updatedTools };
//     }));
//
//
//
//
//     return updatedRows;
// };






// export const fetchStakedTools = async ({account}) => {
//     const { rows } = await fetchRows({
//         contract: RTP_GAME,
//         scope: account,
//         table: "workplaces",
//         limit: 1,
//     });
//
//     if (!rows[0])
//         return [];
//
//     const stakedTools = [rows[0].tools[0].key];
//     const data = await getDataFromAtomicApi(`assets?ids=${stakedTools}&page=1&limit=100`);
//
//      return data
// };

export const fetchResources = async ({ account }) => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: account,
        table: "resources"
    });

    if (!rows[0])
        return rows[0] = {wood: 0, stone: 0, food: 0, miles: 0, science_points: 0};

    console.log(rows)

    return rows;

};

export const fetchCurrentEra = async () => {
    const { rows } = await fetchRows({
        contract: RTP_GAME,
        scope: RTP_GAME,
        table: "eraconfig"
    });

    if (!rows[0])
        return rows[0] = {title: 'Prehistoric age'};

    const lastOwned = rows.filter(item => item.owner !== 'none' ).pop() || rows[0];
    const index = rows.findIndex(item => item === lastOwned);
    const nextIndex = index + 1 < rows.length ? index + 1 : 0;
    const nextItem = rows[nextIndex];
    const newArray = [lastOwned, nextItem];

    return newArray;

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












