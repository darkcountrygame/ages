import React, {useEffect, useState, useContext} from "react";
import { useApp } from "../../Data/AppContext";
import { UALContext } from "ual-reactjs-renderer";
import { toast } from "react-toastify";

import './workplaces.css'

import Header from '../../components/HeaderGame/HeaderGame'

import WoodenSpear from '../../images/wooden_spear.png'
import meat from '../../images/market-items/meat.png'
import equip from '../../images/plus_icon_section.png'
import lock from '../../images/lock.png'

import Footer from '../../components/FooterGameNav/FooterGameNav'
import UnEquipCard from '../../Modal/UnEquipCard'
import UnlockCard from '../../Modal/UnlockCard'
import EquipTool from '../../Modal/EquipTool'
import Sidebar from '../../components/Sidebar/Sidebar'

import {fetchResources, claimMiningResources, unStakeTool, fetchItems, stakeTool, stakeWp} from "../../Services";

const Workplaces = () => {

    const { activeUser } = useContext(UALContext);

    const {
        itemList,
        setResources,
        stakedItemList,
        setStakedItems,
        stakedToolsList,
    } = useApp();

     console.log(stakedItemList)
     console.log(stakedToolsList)

    const [selectItem, setSelectItem] = useState([])



    const handleClaim = (workplace_id) => {
        claimMiningResources( { activeUser, workplace_id })
            .then(() => {
                fetchResources({ account: activeUser.accountName })
                    .then(resource => setResources(resource))
                    .catch(e => console.log(e));


                 toast.success('Claimed');
            })
            .catch(e => toast.error(e.message))
            .catch(e => console.error(e))
    }

    const stakeHandlerWp = () => {
        stakeWp({ activeUser, selectItem })
            .then(() => {
                toast.success('Staked successed');
            })
            .catch(e => toast.error(e.message))
            .catch(e => console.error(e))
    }

    const stakeHandler = () => {
        stakeTool({ activeUser, selectItem })
            .then(() => {
                toast.success('Staked successed');
            })
            .catch(e => toast.error(e.message))
            .catch(e => console.error(e))
    }

    const unstakeHandler = ( assetId ) => {
        unStakeTool({ activeUser, assetId })
            .then(() => {
                fetchItems({ account: activeUser.accountName })
                    .then(items => setStakedItems(items))
                    .catch(e => console.log(e));


                 toast.success('Unstaked');
            })
             .catch(e => toast.error(e.message))
            .catch(e => console.error(e))
    }

    return (
        <section className="workplace">
            <Header />
            <div className="main-workplace">
                <Sidebar selectItem={selectItem} setSelectItem={setSelectItem} stakeHandler={stakeHandlerWp} />
                <div className="main-main">
                    <div className="main-title">
                        <h2>Workplaces</h2>
                    </div>
                    <div className="container">
                        <div className="main-main-wrapper">
                            <div className="main-workplace-header">
                                <button onClick={() => handleClaim(stakedItemList[0].asset_id)}>Start Work</button>
                                <p>Total Prodused: <span>0</span><img src={meat} alt="meat" /></p>
                            </div>

                            <div className="main-main-contant">
                                <div className="main-main-list">

                                    <div className="workplaces-item available">
                                        <div className="workplaces-img available-img">
                                            <img src={WoodenSpear} alt="spear" />
                                            <p className={'workplaces-img_name'}>Wooden Spear</p>
                                        </div>
                                        <div className="produces">
                                            <p>Produces:</p>
                                            <p>100/Hour</p>
                                        </div>
                                        <div className="btn-lock">
                                            <UnEquipCard />
                                        </div>
                                    </div>

                                    <div className="workplaces-item equip">
                                        <div className="workplaces-img unequip-img">
                                            { !stakedToolsList.length ?  <img src={equip} alt="spear" /> : <img src={`https://cloudflare-ipfs.com/ipfs/${stakedToolsList[0].data.img}`} alt="spear" /> }
                                        </div>
                                        {
                                            !stakedToolsList.length ?

                                                <div className="btn-unequip">

                                                    { !itemList.length ? <UnEquipCard /> : <EquipTool itemList={itemList} setSelectItem={setSelectItem} stakeHandler={stakeHandler} />}

                                                </div>

                                                :

                                                <div className="btn-unequip unequip">
                                                    <button onClick={() => unstakeHandler(stakedToolsList[0].asset_id)}>Unequip</button>
                                                </div>

                                        }

                                    </div>

                                    <div className="workplaces-item lock">
                                        <div className="workplaces-img locked-img">
                                            <img src={lock} alt="spear" />
                                        </div>
                                        <div className="btn-lock">
                                            <UnlockCard />
                                        </div>
                                    </div>

                                    <div className="workplaces-item lock">
                                        <div className="workplaces-img locked-img">
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