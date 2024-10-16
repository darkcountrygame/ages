import {RTP_GAME, RTP_TOKEN} from "../Constants";
import { signTransaction } from "../Helpers";


export const upgradeTool = async ({ activeUser, selectedTool }) => {
    return await signTransaction({
        activeUser,
        account: RTP_TOKEN,
        action: 'transfer',
        data: {
            from: activeUser.accountName,
            to: RTP_GAME,
            quantity: '50.0000 RTP',
            memo: `upgrade:tool:0:${selectedTool}`
        }
    });
};