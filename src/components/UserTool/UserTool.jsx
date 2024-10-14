import React from "react";

const UserTool = ({
                      item,
                      index,
                      setSelectTool,
                      selectedTool,
}) => {

    return (
        <>
            <div 
                key={index}
                className={item.token_name === selectedTool.token_name ? "market-list_item selected" : "market-list_item"}
                onClick={() => {
                    setSelectTool(item);
                }}
            >
                <div className="list-item-wrapper">
                    <img src={item.uri || item.token_uri} alt="img" />
                    <p className={'item-level'}>Level {item.level ? item.level : 1}</p>
                </div>
            </div>
        </>
    );
}

export default UserTool;
