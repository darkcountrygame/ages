import React, {useContext, useEffect, useState} from 'react'

import { useApp } from "../../Data/AppContext";
import { toast } from "react-toastify";


import '../Workplaces/workplaces.css'
import './staking.css'


import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'
import UserTool from '../../components/UserTool/UserTool'
import {stakedToCollectionAssets} from "../../Services";
import {UALContext} from "ual-reactjs-renderer";


export default function Staking() {

    const {
        itemList,
    } = useApp();
    const { activeUser } = useContext(UALContext);

    const ADD_ASSET = 'Add Asset'
    const REMOVE_ASSET = 'Remove Asset'

    const [selectedTool, setSelectTool] = useState([])
    const [stakedAsset, setStakedAsset] = useState([])
    const [selectedToolImg, setSelectToolImg] = useState([])
    const [toolName, setToolName] = useState([])
    const [selectedTab, setSelectedTab] = useState(ADD_ASSET)



    const handleClick = (tabName) => {
        setSelectedTab(tabName);
    };

    const handleStake = () => {

    };

    const handleUnStake = () => {

    };



    const toastyErr = () => {
        toast.error('First select tool');
    }

    useEffect(() => {
        stakedToCollectionAssets({activeUser})
            .then(response => {
                const uniqueAssets = response.data.data.reduce((acc, curr) => {
                    curr.assets.forEach(asset => {
                        if (!acc[asset.asset_id]) {
                            acc[asset.asset_id] = asset;
                        }
                    });
                    return acc;
                }, {});
                setStakedAsset(Object.values(uniqueAssets));
            })
            .catch(error => {
                console.log(error);
            });

    }, [activeUser])

    return (
        <section className='workplace'>
            <Header />
            <div className="main-workplace stake">
                <div className="main-main">
                    <div className="main-title">
                        <h2>Inventory</h2>
                    </div>
                    <div className={`add ${selectedTab === ADD_ASSET ? 'active' : ''}`} onClick={() => handleClick(ADD_ASSET)}>
                        <p>{ADD_ASSET}</p>
                    </div>
                    <div className={`remove ${selectedTab === REMOVE_ASSET ? 'active' : ''}`} onClick={() => handleClick(REMOVE_ASSET)}>
                        <p>{REMOVE_ASSET}</p>
                    </div>
                    <div className="container">
                        <div className="header-stake">
                            <div className="header-stake__wrapper">
                                <div className="filter">
                                    <select name="">
                                        <option>Hunters Lodge</option>
                                    </select>
                                    <select name="">
                                        <option>Rarity Filter</option>
                                    </select>
                                    <select name="">
                                        <option>Level</option>
                                    </select>
                                    <select name="">
                                        <option>Sort by</option>
                                    </select>
                                </div>
                                <div className="btn">
                                    {/*<button onClick={redirectMarket}>Go to Market</button>*/}
                                </div>
                            </div>
                        </div>


                        <div className="main-main-contant">
                            {selectedTab === ADD_ASSET &&
                                <div className="stake-list">
                                    {itemList.length ?
                                        itemList
                                            .filter(item => item.schema.schema_name === 'workplace')
                                            .map( item => <UserTool
                                            item={item}
                                            setSelectTool={setSelectTool}
                                            selectedTool={selectedTool}
                                        />)
                                        :
                                        <p className={'no-workplaces'}>No tools</p>
                                    }
                                </div>
                            }

                            {selectedTab === REMOVE_ASSET &&
                                <div className="stake-list">
                                    {stakedAsset.length ?
                                        stakedAsset
                                            .filter(item => item.schema.schema_name === 'workplace')
                                            .map( item => <UserTool
                                            item={item}
                                            setSelectTool={setSelectTool}
                                            selectedTool={selectedTool}
                                        />)
                                        :
                                        <p className={'no-workplaces'}>No tools</p>
                                    }
                                </div>
                            }


                        </div>
                        <div className="stake-btn">
                            {selectedTab === ADD_ASSET &&
                                <button onClick={handleStake}>
                                Stake
                                </button>
                            }

                            {selectedTab === REMOVE_ASSET &&
                                <button onClick={handleUnStake}>
                                Unstake
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}