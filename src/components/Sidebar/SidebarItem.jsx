import React from "react";

import { useApp } from "../../Data/AppContext";

import './sidebar.css'

import sidebarItem from '../../images/hunters_lodge.png'



export default function Sidebar({ item }) {

    const {
        stakedItemList,
    } = useApp();

    // return (
    //     <div className="main-workplace-sidebar__item">
    //         <div className="sidebar__item__container">
    //             { !stakedItemList.length  ?  <img src={sidebarItem} alt="img" /> : <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt="spear" /> }
    //         </div>
    //     </div>
    // )

    return (
        <div className="main-workplace-sidebar__item">
               <img src={item} alt="img" />
        </div>
    )
}
