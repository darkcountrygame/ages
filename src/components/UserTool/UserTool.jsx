import React from "react";

import WoodenSpear from '../../images/wooden_spear.png'

const UserTool = ({item, index}) => {

    // const toolInfo = () => {
    //     setSelectToolImg(item.data.img)
    //     setToolName(item.data.name)
    // }



    return(
        <>
            {item.schema.schema_name === 'tool' &&
                <div key={index} className="market-list_item" >
                    <div className="list-item-wrapper">
                        <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt="img" />
                    </div>
                </div>
            }
        </>
    )
}


export default UserTool