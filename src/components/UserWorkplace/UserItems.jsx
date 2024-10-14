import React from "react";

const UserItems = ({ item, index, setToolSelected, toolSelected }) => {
    console.log(item);
    
    console.log(toolSelected);
    

    return (
        <div
            key={index}
            className={item.token_name === toolSelected ? `card-item selected` : `card-item`}
            onClick={() => setToolSelected(item.token_name)}
        >
            <div className="card-item__img">
                <img src={`${item.token_uri}`} alt='item' />
            </div>
        </div>
    );
};

export default UserItems;
