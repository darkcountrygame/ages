import { RTP_GAME, ATOMIC_ASSETS } from "../Constants";
import { signTransaction } from "../Helpers";
import axios from "axios";


export const unStakeTool = async ({ activeUser, assetId, wpId }) => {

    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'unstaketools',
        data: {
            player: activeUser.accountName,
            workplace_asset_id: wpId,
            tool_asset_ids: [assetId]
        }
    });

};

export const stakeTool = async ({ activeUser, selectItem, wp }) => {
    // console.log(selectItem)

    return await signTransaction({
        activeUser,
        account: ATOMIC_ASSETS,
        action: 'transfer',
        data: {
            from: activeUser.accountName,
            to: RTP_GAME,
            asset_ids: [selectItem],
            memo: `stake:tool:${wp.asset_id}`
        }
    });

};

export const stakeWp = async ({ activeUser, selectItem }) => {

    return await signTransaction({
        activeUser,
        account: ATOMIC_ASSETS,
        action: 'transfer',
        data: {
            from: activeUser.accountName,
            to: RTP_GAME,
            asset_ids: [selectItem],
            memo: `stake:workplace`
        }
    });

};

export const unStakeWp = async ({ activeUser, selectItem }) => {

    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'unstakewp',
        data: {
            player: activeUser.accountName,
            workplace_asset_id: selectItem
        }
    });

};

export const stakedToCollectionAssets = async ({ activeUser}) => {

    return axios.get('https://test.wax.api.atomicassets.io/atomicassets/v1/transfers', {
        params: {
            account: activeUser.accountName,
            match_memo: 'stake',
            collection_name: 'rtpassetssss'
        }
    })

};

