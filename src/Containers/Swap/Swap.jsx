import React, {useState} from 'react'

import { useApp } from "../../Data/AppContext";
import { toast } from "react-toastify";


import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'

import './Swap.css'

export default function Swap() {

    const {
        itemList,
    } = useApp();


    if (!itemList.length){
        return (
            <section className='workplace'>
                <Header />
                <div className="main-workplace market">
                    <div className="main-main">
                        <div className="main-title">
                            <h2>Swap</h2>
                        </div>
                        <div className="container">
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
                                        {/*<button onClick={redirectMarket}>Go to Market</button>*/}
                                    </div>
                                </div>

                            </div>


                            <div className="main-main-contant">
                                <div className="main-main-list no-inventory">
                                    You do not have inventory tool
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        )
    }

    return (
        <section className='workplace'>
            <Header />
            <div className="main-workplace swap">
                <div className="main-main">
                    <div className="main-title">
                        <h2>Swap</h2>
                    </div>
                <div className="swap-container">
                    <div className="swap-block">
                        <div className="swiper">
                            <div className="swiper-field">
                                <input type="text"/>
                                <div className="resource-block">
                                    <p>Select resource</p>
                                </div>
                            </div>
                            <div className="swiper-field">
                                <input type="text"/>
                                <div className="token-block">
                                     <p>RTP</p>
                                    <p className={'balance'}>Balance: 10 000</p>
                                </div>
                            </div>
                            <div className="swap-btn"><p>Swap</p></div>
                        </div>
                        <div className="statistic">
                            <div className="statistic-title">
                                <h4>Statistic:</h4>
                            </div>
                            <div className="statistic-field">
                                <h5>Total amount of mined resources:</h5>
                                <div className={'resource'}>
                                    <p>870,753,890</p>
                                </div>
                            </div>
                            <div className="statistic-field">
                                <h5>Total mined tokens:</h5>
                                    <p>9,753,890 RTP</p>
                            </div>
                            <div className="statistic-field">
                                <h5>Mining rate per second:</h5>
                                    <p>1,890 RTP</p>
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