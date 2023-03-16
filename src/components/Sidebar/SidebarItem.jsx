import React, {useEffect, useState} from "react";
import './sidebar.css'
import {getDataFromAtomicApi} from "../../Helpers";
import { Link } from 'react-router-dom';

export default function Sidebar({ item, index, setSelectedWorkPlace, selectedWorkPlace, handleWorkplaceTool }) {
    const [itemObj, setItemObj] = useState({})



    const generateItemFromId = async () => {
        const data = await getDataFromAtomicApi(`assets?ids=${item.workplace_asset_id}&page=1&limit=100`)

        setItemObj(data[0])
    }


    useEffect(() => {
        generateItemFromId()
    }, [])
    //
    // console.log(itemObj)
    // console.log(selectedWorkPlace)

    return (
        <div key={index}>
            <Link to={`/workplaces/${itemObj.asset_id}`}>
                <div className={(selectedWorkPlace === String(itemObj.asset_id) || (selectedWorkPlace.workplace_asset_id === String(itemObj.asset_id))) || (selectedWorkPlace === null && index === 0) ? "main-workplace-sidebar__item wp-active" : "main-workplace-sidebar__item"} onClick={() => setSelectedWorkPlace(() => handleWorkplaceTool(item))}>
                    {itemObj && <img src={`https://cloudflare-ipfs.com/ipfs/${itemObj.data?.img}`} alt="img" />}
                </div>
            </Link>
        </div>
    )
}
