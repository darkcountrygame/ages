import { RTP_GAME } from "../Constants";
import { signTransaction } from "../Helpers";


export const upgradeTool = async ({ activeUser, selectedTool }) => {
    return await signTransaction({
        activeUser,
        account: RTP_GAME,
        action: 'upgradetool',
        data: {
            player: activeUser.accountName,
            workplace_asset_id: 1099524450042,
            tool_asset_id: selectedTool
        }
    });
};