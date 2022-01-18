import React from "react";

import { useApp } from "../../Data/AppContext";

import './sidebar.css'


import EquipCardWp from '../../Modal/EquipCard'
import SidebarItem from './SidebarItem'


export default function Sidebr({ selectItem, setSelectItem, stakeHandler }) {

    const {
        itemList,
        stakedItemList,
    } = useApp();

    return (
        <div className="main-workplace-sidebar">
            <div className="main-workplace-sidebar__wrapper">
                <div className="main-workplace-sidebar__list">
                    {stakedItemList.map(item => <SidebarItem  item={item} />)}
                </div>
                <EquipCardWp class="add-workplace" itemList={itemList} setSelectItem={setSelectItem} stakeHandler={stakeHandler} title='Add workplace'/>}
            </div>
        </div>
    )
}
