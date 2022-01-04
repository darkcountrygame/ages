import { RTP_GAME } from "../Constants";
import { signTransaction } from "../Helpers";


export const exchangeResources = async ({ activeUser, resource, count }) => {
    console.log(activeUser)
    console.log(resource)
    console.log(count)
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