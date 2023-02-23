import React from "react";

import WoodenSpear from '../../images/wooden_spear.png'

const UserTool = () => {

    // const toolInfo = () => {
    //     setSelectToolImg(item.data.img)
    //     setToolName(item.data.name)
    // }



    return(
        <div className="market-list_item" >
            <div className="list-item-wrapper">
                <img src={WoodenSpear} alt='item' />
            </div>
        </div>
    )
}


export default UserTool