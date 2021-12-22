import React from "react";
import { useApp } from "../../Data/AppContext";

import './workplaces.css'

import Header from '../../components/HeaderGame/HeaderGame'

import sidebarItem from '../../images/hunters_lodge.png'
import close from '../../images/close.png'
import meat from '../../images/market-items/meat.png'
import spear from '../../images/wooden_spear.png'
import equip from '../../images/equip.png'
import lock from '../../images/lock.png'


import Footer from '../../components/FooterGameNav/FooterGameNav'
import UnEquipCard from '../../Modal/UnEquipCard'
import UnlockCard from '../../Modal/UnlockCard'
import EquipCard from '../../Modal/EquipCard'

const Workplaces = () => {
    // const {
    //     userData,
    //     isAuthenticated,
    // } = useApp();


    return (
        <section className="workplace">
            <Header />
            <div className="main-workplace">
                {/* <div className="main-wrapper"> */}
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
                        <div className="close">
                            <img src={close} alt="close" />
                        </div>
                        <div className="main-main-wrapper">
                            <div className="main-workplace-header">
                                <a href="#">Start Work</a>
                                <p>Total Prodused: <span>3 000</span><img src={meat} alt="meat" /></p>
                            </div>


                            <div className="main-main-contant">
                                <div className="main-main-list">
                                    <div className="workplaces-item">
                                        <div className="workplaces-img">
                                            <img src={spear} alt="spear" />
                                        </div>
                                        <div className="btn-equip">
                                            <UnEquipCard />
                                        </div>
                                    </div>

                                    <div className="workplaces-item equip">
                                        <div className="workplaces-img">
                                            <img src={equip} alt="spear" />
                                        </div>
                                        <div className="btn-unequip ">
                                            <EquipCard />
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

                {/* </div> */}

            </div>
            <Footer />
            {/* <SimpleBottomNavigation />  */}
        </section>
    )
}

export default Workplaces;