import React from "react";

import { useApp } from "../../Data/AppContext";

import './sidebar.css'

import sidebarItem from '../../images/hunters_lodge.png'



export default function Sidebar({ item, index }) {

    const {
        stakedItemList,
    } = useApp();

    return (
        <>
            {item.schema.schema_name === 'workplace' &&
                <div key={index} className="main-workplace-sidebar__item">
                    <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt="img" />
                </div>
            }
        </>
    )
}
