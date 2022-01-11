import { RTP_GAME } from "../Constants";
import { signTransaction } from "../Helpers";


export const newEra = async ({ activeUser }) => {

    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'newera',
        data: {
            player: activeUser.accountName,
        }
    });
};