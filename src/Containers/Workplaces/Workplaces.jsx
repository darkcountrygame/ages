import React, {useEffect, useState, useContext} from "react";
import { useApp } from "../../Data/AppContext";
import { UALContext } from "ual-reactjs-renderer";
import { toast } from "react-toastify";

import './workplaces.css'

import Header from '../../components/HeaderGame/HeaderGame'


import sidebarItem from '../../images/hunters_lodge.png'
import meat from '../../images/market-items/meat.png'
import equip from '../../images/equip.png'
import lock from '../../images/lock.png'

import Footer from '../../components/FooterGameNav/FooterGameNav'
import UnEquipCard from '../../Modal/UnEquipCard'
import UnlockCard from '../../Modal/UnlockCard'
import EquipCard from '../../Modal/EquipCard'

import { fetchResources ,claimMiningResources } from "../../Services";

const Workplaces = () => {

    const { activeUser } = useContext(UALContext);

    const {
        itemList,
        resourcesList,
        setResources
    } = useApp();

    const [selectItem, setSelectItem] = useState([])


    const handleClaim = () => {
        claimMiningResources( { activeUser })
            .then(() => {
                fetchResources({ account: activeUser.accountName })
                    .then(resource => setResources(resource))
                    .catch(e => console.log(e));


                // toast.success('Claimed');
            })
            // .catch(e => toast.error(e.message))
            .catch(e => console.error(e))
    }

    console.log(activeUser)


    useEffect(() => {
        console.log(itemList)
        console.log(resourcesList)
    },[itemList, resourcesList])



    return (
        <section className="workplace">
            <Header />
            <div className="main-workplace">
                <div className="main-workplace-sidebar">
                    <div className="main-workplace-sidebar__wrapper">
                        <div className="main-workplace-sidebar__list">
                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>

                            <div className="main-workplace-sidebar__item">
                                <div className="sidebar__item__container">
                                    <img src={sidebarItem} alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-main">
                    <div className="main-title">
                        <h2>Workplaces</h2>
                    </div>
                    <div className="container">
                        <div className="main-main-wrapper">
                            <div className="main-workplace-header">
                                <button onClick={handleClaim}>Start Work</button>
                                <p>Total Prodused: <span>0</span><img src={meat} alt="meat" /></p>
                            </div>

                            <div className="main-main-contant">
                                <div className="main-main-list">

                                    <div className="workplaces-item equip">
                                        <div className="workplaces-img">
                                            <img src={equip} alt="spear" />
                                        </div>
                                        <div className="btn-unequip ">
                                            { !itemList.length ? <UnEquipCard /> : <EquipCard itemList={itemList} setSelectItem={setSelectItem}/>}
                                        </div>
                                    </div>

                                    <div className="workplaces-item lock">
                                        <div className="workplaces-img">
                                            <img src={lock} alt="spear" />
                                        </div>
                                        <div className="btn-lock">
                                            <UnlockCard />
                                        </div>
                                    </div>

                                    <div className="workplaces-item lock">
                                        <div className="workplaces-img">
                                            <img src={lock} alt="spear" />
                                        </div>
                                        <div className="btn-lock">
                                            <UnlockCard />
                                        </div>
                                    </div>

                                    <div className="workplaces-item lock">
                                        <div className="workplaces-img">
                                            <img src={lock} alt="spear" />
                                        </div>
                                        <div className="btn-lock">
                                            <UnlockCard />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default Workplaces;