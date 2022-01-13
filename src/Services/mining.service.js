import { RTP_GAME } from "../Constants";
import { signTransaction } from "../Helpers";


export const claimMiningResources = async ({ activeUser, workplace_id }) => {
    // console.log(activeUser)
    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'claim',
        data: {
            player: activeUser.accountName,
            workplace_asset_id: workplace_id
        }
    });
};