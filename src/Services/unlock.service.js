import {RTP_GAME, RTP_TOKEN} from "../Constants";
import { signTransaction } from "../Helpers";


export const unlockSlot = async ({ activeUser, selectedWP }) => {
    return await signTransaction({
        activeUser,
        account: RTP_TOKEN,
        action: 'transfer',
        data: {
            from: activeUser.accountName,
            to: RTP_GAME,
            quantity: '100.0000 RTP',
            memo: `unlock:slot:workplace:1:${selectedWP}`
        }
    });
};