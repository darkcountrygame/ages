import React from "react";
import {logDOM} from "@testing-library/react";

const UserTool = ({ item, setSelectTool, setSelectToolImg }) => {
    // const selectedItem = () => {
    //     const item = document.querySelectorAll('.market-list_item')
    //     for (const itemEl of item) {
    //         itemEl.classList.toggle('selected')
    //     }
    // }
    return(
        <div className="market-list_item" >
            <div className="list-item-wrapper" onClick={() => setSelectTool(item.asset_id)}>
                <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt='item' onClick={() => setSelectToolImg(item.data.img)}/>
            </div>
        </div>
    )
}


export default UserTool