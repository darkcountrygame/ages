import { RTP_GAME } from "../Constants";
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