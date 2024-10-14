import React from "react";

const UserItems = ({ item, index, setToolSelected, toolSelected }) => {
    console.log(item);
    

    return (
        <div
            key={index}
            className={item.asset_id === toolSelected ? `card-item selected` : `card-item`}
            onClick={() => setToolSelected(item.asset_id)}
        >
            <div className="card-item__img">
                <img src={`${item.token_uri}`} alt='item' />
            </div>
        </div>
    );
};

export default UserItems;
