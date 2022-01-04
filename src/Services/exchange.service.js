import { RTP_GAME } from "../Constants";
import { signTransaction } from "../Helpers";


export const exchangeResources = async ({ activeUser }) => {
    console.log(activeUser)
    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'exchange',
        data: {
            player: activeUser.accountName,
            resource: 'miles',
            number: 100
        }
    });
};