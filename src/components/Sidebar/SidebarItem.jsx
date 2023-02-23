import React from "react";
import './sidebar.css'




export default function Sidebar({ item, index, setSelectedWorkPlace, selectedWorkPlace }) {


    return (
        <>
            {item.schema.schema_name === 'workplace' &&
                <div key={index} className={selectedWorkPlace ? "main-workplace-sidebar__item wp-active" : "main-workplace-sidebar__item"} onClick={() => setSelectedWorkPlace(item.asset_id)}>
                    <img src={`https://cloudflare-ipfs.com/ipfs/${item.data.img}`} alt="img" />
                </div>
            }
        </>
    )
}
