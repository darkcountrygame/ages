import { RTP_GAME } from "../Constants";
import { signTransaction } from "../Helpers";


export const exchangeResources = async ({ activeUser, resource, count }) => {
    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'exchange',
        data: {
            player: activeUser.accountName,
            resource: resource,
            number: count
        }
    });
};