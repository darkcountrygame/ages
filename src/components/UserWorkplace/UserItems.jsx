import React from "react";

const UserItems = ({ item, index, setToolSelected, toolSelected }) => {

    return (
        <div
            key={index}
            className={item.asset_id === toolSelected ? `card-item selected` : `card-item`}
            onClick={() => setToolSelected(item.asset_id)}
        >
            <div className="card-item__img">
                <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt='item' />
            </div>
        </div>
    );
};

export default UserItems;
