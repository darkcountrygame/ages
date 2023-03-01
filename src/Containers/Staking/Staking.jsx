import React, {useState} from 'react'

import { useApp } from "../../Data/AppContext";
import { toast } from "react-toastify";


import '../Workplaces/workplaces.css'
import './staking.css'


import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'
import UserTool from '../../components/UserTool/UserTool'


export default function Staking() {

    const {
        itemList,
        wpConfig,
    } = useApp();

    const ADD_ASSET = 'Add Asset'
    const REMOVE_ASSET = 'Remove Asset'

    const [selectedTool, setSelectTool] = useState([])
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
    const redirectMarket = () => {
        window.open('https://wax-test.atomichub.io/market?collection_name=rush2prosper&order=desc&sort=created&symbol=WAX', '_blank')
    }


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
                                        itemList.map( item => <UserTool
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
                                        <p className={'no-workplaces'}>No tools</p>
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