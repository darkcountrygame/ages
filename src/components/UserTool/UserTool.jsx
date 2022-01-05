import React from "react";

const UserTool = ({ item, setSelectTool }) => {

    return(
        <>
        <div className="markwet-list_item">
            <div className="list-item-wrapper" onClick={() => setSelectTool(item.asset_id)}>
                <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt='item' />
            </div>
        </div>
        </>
    )
}


export default UserTool