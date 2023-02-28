import React from "react";

import WoodenSpear from '../../images/wooden_spear.png'

const UserTool = ({item, index, setSelectTool, selectedTool}) => {

    // const toolInfo = () => {
    //     setSelectToolImg(item.data.img)
    //     setToolName(item.data.name)
    // }



    return(
        <>
            {item.schema.schema_name === 'tool' &&
                <div key={index}
                     className={item.asset_id === selectedTool ? "market-list_item selected" : "market-list_item"}
                     onClick={() => setSelectTool(item.asset_id)}
                >
                    <div className="list-item-wrapper">
                        <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt="img" />
                    </div>
                </div>
            }
        </>
    )
}


export default UserTool