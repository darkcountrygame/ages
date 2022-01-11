import { RTP_GAME, ATOMIC_ASSETS } from "../Constants";
import { signTransaction } from "../Helpers";


export const unstakeWp = async ({ activeUser, assetId }) => {

    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'unstakewp',
        data: {
            player: activeUser.accountName,
            workplace_asset_id: assetId,
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
            memo: 'stake:workplace'
        }
    });
};

