import { RTP_GAME } from "../Constants";
import { signTransaction } from "../Helpers";

export const claimSciencePoints = async ({ activeUser }) => {
    console.log(activeUser)
    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'research',
        data: {
            player: activeUser.accountName,
        }
    });
};