import React, {useEffect, useState} from 'react'

import { useApp } from "../../Data/AppContext";
import { toast } from "react-toastify";


import '../Workplaces/workplaces.css'
import './market.css'



import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'
import UpgradeCard from '../../Modal/UpgradeCard'
import UserTool from '../../components/UserTool/UserTool'


export default function Market() {

    const {
        itemList,
    } = useApp();

   const [selectedTool, setSelectTool] = useState([])
    const [selectedToolImg, setSelectToolImg] = useState([])

    useEffect(() => {
        console.log(selectedTool)
    }, [selectedTool])

    const toastyErr = () => {
        toast.error('First select tool');
    }
    const redirectMarket = () => {
       window.open('https://wax-test.atomichub.io/market?collection_name=rush2prosper&order=desc&sort=created&symbol=WAX', '_blank')
    }

    if (!itemList.length){
        return (
            <section className='market'>
                <Header />
                <div className="main-workplace market">


                    <div className="main-main">
                        <div className="main-title">
                            <h2>Inventory</h2>
                        </div>
                        <div className="container">
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
                                            <button onClick={redirectMarket}>Go to Market</button>
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


                </div>
                <Footer />
            </section>
        )
    }

    return (
        <section className='market'>
            <Header />
            <div className="main-workplace market">


                <div className="main-main">
                    <div className="main-title">
                        <h2>Inventory</h2>
                    </div>
                    <div className="container">
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
                                        <button onClick={redirectMarket}>Go to Market</button>
                                    </div>
                                </div>
                            </div>


                            <div className="main-main-contant">
                                <div className="main-main-list market-list">
                                    {itemList.map( item => (item.schema.schema_name === 'tool' ? <UserTool itemList={itemList} item={item} setSelectTool={setSelectTool} setSelectToolImg={setSelectToolImg} />
                                            :
                                            false
                                    ))}
                                </div>

                            </div>
                            <div className="market-btn">
                                {!selectedTool.length ?
                                    <button onClick={toastyErr}>Upgrade -12 RTP</button>
                                :
                                    <UpgradeCard  selectedTool={selectedTool} selectedToolImg={selectedToolImg} />
                                }
                            </div>
                            <div className="market-lvl">
                                <div className="market-lvl_wrapper">
                                    <p className="lv">1 lv - 25/hr</p>
                                    <p>2 lv - 50/hr</p>
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