import React from "react";

const UserItems = ({ item, setSelectItem, index }) => {

    return(
            <div key={index} className="card-item" onClick={() => setSelectItem(item.asset_id)}>
                    <div className="card-item__img">
                        <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt='item' />
                    </div>
            </div>
        )
}


export default UserItems