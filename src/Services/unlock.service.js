import { RTP_GAME } from "../Constants";
import { signTransaction } from "../Helpers";


export const unlockSlot = async ({ activeUser, selectedTool }) => {
    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'unlockslotwp',
        data: {
            player: activeUser.accountName,
            workplace_asset_id: 1099524450042,
            is_staked: true
        }
    });
};