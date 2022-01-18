import React from "react";
import {logDOM} from "@testing-library/react";

const UserTool = ({ item, setSelectTool, setSelectToolImg, setToolName }) => {

    const toolInfo = () => {
        setSelectToolImg(item.data.img)
        setToolName(item.data.name)
    }



    return(
        <div className="market-list_item" >
            <div className="list-item-wrapper" onClick={() => setSelectTool(item.asset_id)}>
                <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt='item' onClick={ toolInfo }/>
            </div>
        </div>
    )
}


export default UserTool