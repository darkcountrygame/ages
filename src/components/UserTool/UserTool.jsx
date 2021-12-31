import React from "react";

const UserTool = ({ item }) => {

    return(
        <>
        <div className="markwet-list_item">
            <div className="list-item-wrapper">
                <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt='item' />
            </div>
        </div>
        </>
    )
}


export default UserTool