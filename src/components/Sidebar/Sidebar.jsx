import React from "react";

import { useApp } from "../../Data/AppContext";

import './sidebar.css'


import WoodenCutter from '../../images/woodcutter.png'
import SidebarItem from './SidebarItem'


export default function Sidebr({  selectItem, setSelectItem, stakeHandler }) {

    const {
        itemList,
        stakedItemList,
    } = useApp();

    return (
        <div className="main-workplace-sidebar">
            <div className="main-workplace-sidebar__wrapper">
                {itemList.length ?
                        <div className="main-workplace-sidebar__list">
                            {itemList.map((item, index) => <SidebarItem  item={item} index={index} />)}
                        </div>
                        :
                        <p className={'no-workplaces'}>No workplaces</p>
                }

                {/*<EquipCardWp class="add-workplace" itemList={itemList} setSelectItem={setSelectItem} stakeHandler={stakeHandler} title='Add workplace'/>}*/}
            </div>
        </div>
    )
}
