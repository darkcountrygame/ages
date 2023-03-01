import React from "react";

const UserTool = ({item, index, setSelectTool, selectedTool}) => {

    // const toolInfo = () => {
    //     setSelectToolImg(item.data.img)
    //     setToolName(item.data.name)
    // }



    return(
        <>
                <div key={index}
                     className={item.asset_id === selectedTool ? "market-list_item selected" : "market-list_item"}
                     onClick={() => setSelectTool(item.asset_id)}
                >
                    <div className="list-item-wrapper">
                        <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt="img" />
                        <p className={'item-level'}>Level {item.data.level ? item.data.level : 1}</p>
                    </div>
                </div>
        </>
    )
}


export default UserTool