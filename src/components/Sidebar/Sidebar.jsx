import React from "react";

import { useApp } from "../../Data/AppContext";

import './sidebar.css'


import SidebarItem from './SidebarItem'


export default function Sidebar({  selectItem, setSelectItem, stakeHandler, setSelectedWorkPlace, selectedWorkPlace }) {
    const {
        stakedItemList,
    } = useApp();

    console.log(stakedItemList)

    return (
        <div className="main-workplace-sidebar">
            <div className="main-workplace-sidebar__wrapper">
                {stakedItemList.length ?
                        <div className="main-workplace-sidebar__list">
                            {stakedItemList.map((item, index) => <SidebarItem
                                item={item}
                                index={index}
                                setSelectedWorkPlace={setSelectedWorkPlace}
                                selectedWorkPlace={selectedWorkPlace}
                            />)}
                        </div>
                        :
                        <p className={'no-workplaces'}>No workplaces</p>
                }

                {/*<EquipCardWp class="add-workplace" itemList={itemList} setSelectItem={setSelectItem} stakeHandler={stakeHandler} title='Add workplace'/>}*/}
            </div>
        </div>
    )
}
