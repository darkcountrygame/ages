import { RTP_GAME, ATOMIC_ASSETS } from "../Constants";
import { signTransaction } from "../Helpers";


export const unStakeTool = async ({ activeUser, assetId }) => {

    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'unstaketools',
        data: {
            player: activeUser.accountName,
            workplace_asset_id: 1099524450045,
            tools_asset_ids: [assetId] // fix
        }
    });

};

export const stakeTool = async ({ activeUser, selectItem }) => {

    return await signTransaction({
        activeUser,
        account: ATOMIC_ASSETS,
        action: 'transfer',
        data: {
            from: activeUser.accountName,
            to: RTP_GAME,
            asset_ids: [selectItem],
            memo: `stake:tool:1099524450045`
        }
    });

};

