import React from 'react'

import '../Workplaces/workplaces.css'
import './market.css'



import close from '../../images/close.png'
import spearImg from '../../images/wooden_spear.png'

import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'
import UpgradeCard from '../../Modal/UpgradeCard'


export default function Market() {
    return (
        <section className='workplace'>
            <Header />
            <div className="main-workplace market">


                <div className="main-main">
                    <div className="main-title">
                        <h2>Market</h2>
                    </div>
                    <div className="container">
                        {/*<div className="close">*/}
                        {/*    <img src={close} alt="close" />*/}
                        {/*</div>*/}
                        <div className="main-main-wrapper">
                            <div className="header-market">
                                <div className="header-market__wrapper">
                                    <div className="filter">
                                        <select name="">
                                            <option>Hunters Lodge</option>
                                        </select>
                                        <select name="">
                                            <option>Rarity Filter</option>
                                        </select>
                                    </div>
                                    <div className="btn">
                                        <button>Go to Market</button>
                                    </div>
                                </div>

                            </div>


                            <div className="main-main-contant">
                                <div className="main-main-list market-list">

                                    <div className="markwet-list_item">
                                        <div className="list-item-wrapper">
                                            <img src={spearImg} alt="spear" />
                                        </div>
                                    </div>

                                    <div className="markwet-list_item">
                                        <div className="list-item-wrapper">
                                            <img src={spearImg} alt="spear" />
                                        </div>
                                    </div>

                                    <div className="markwet-list_item">
                                        <div className="list-item-wrapper">
                                            <img src={spearImg} alt="spear" />
                                        </div>
                                    </div>

                                    <div className="markwet-list_item">
                                        <div className="list-item-wrapper">
                                            <img src={spearImg} alt="spear" />
                                        </div>
                                    </div>

                                    <div className="markwet-list_item">
                                        <div className="list-item-wrapper">
                                            <img src={spearImg} alt="spear" />
                                        </div>
                                    </div>

                                    <div className="markwet-list_item">
                                        <div className="list-item-wrapper">
                                            <img src={spearImg} alt="spear" />
                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className="market-btn">
                                <UpgradeCard />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </section>
    )
}