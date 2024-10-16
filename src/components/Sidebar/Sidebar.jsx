import React from "react";

import { useApp } from "../../Data/AppContext";

import './sidebar.css'


import SidebarItem from './SidebarItem'


export default function Sidebar({ setSelectedWorkPlace, selectedWorkPlace }) {
    const {
        stakedItemList,
    } = useApp();

    return (
        <div className="main-workplace-sidebar">
            <div className="main-workplace-sidebar__wrapper">
                {stakedItemList.length ?
                    <div className="main-workplace-sidebar__list">
                        {stakedItemList.map((item, index) => (
                            <SidebarItem
                                index={item.token_name || index}
                                item={item}
                                setSelectedWorkPlace={setSelectedWorkPlace}
                                selectedWorkPlace={selectedWorkPlace}
                            />
                        ))}
                    </div>
                        :
                        <p className={'no-workplaces'}>No workplaces</p>
                }

            </div>
        </div>
    )
}
