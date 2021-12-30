import React from "react";

const UserItems = ({ item, setSelectItem }) => {

    return(
            <div className="card-item" onClick={() => setSelectItem(item.asset_id)}>
                <div className="card-item__wrapper">
                    <div className="card-item__img">
                        <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt='item' />
                    </div>
                    <div className="card-item__content">
                        <h4>{item.data.name}</h4>
                    </div>
                </div>
            </div>
        )
}


export default UserItems