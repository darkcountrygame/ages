import React, { useState, useEffect } from "react";
import { useApp } from "../../Data/AppContext";

import './workplaces.css';

import meat from '../../images/market-items/meat.png';
import stone from '../../images/market-items/rock.png';
import wood from '../../images/market-items/wood.png';
import wheel from '../../images/market-items/wheel.png';
import equip from '../../images/plus_icon_section.png';
import lock from '../../images/lock.png';

import Footer from '../../components/FooterGameNav/FooterGameNav';
import UnlockCard from '../../Modal/UnlockCard';
import EquipTool from '../../Modal/EquipTool';
import Sidebar from '../../components/Sidebar/Sidebar';
import Timer from "../../components/Countdown/Timer";
import { createBrowserHistory } from "history";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { contract_address } from "../../Services";
import { toast } from "react-toastify";

const Workplaces = () => {
    const {account, signAndSubmitTransaction} = useWallet();
    const { itemList, stakedItemList } = useApp();
    const [selectItem, setSelectItem] = useState([]);
    const [selectedWorkPlace, setSelectedWorkPlace] = useState([]);
    const [tools, setTools] = useState([]);
    const [wp, setWP] = useState([]);
    const [miningCount, setMiningCount] = useState(0);
    const [loading, setLoading] = useState(0);

    const history = createBrowserHistory();
    console.log(setTools);
    console.log(setMiningCount);
    console.log(loading);
    
    console.log(wp);
    
    

    const getResourceIcon = (name) => {
        switch (name) {
            case "food":
                return meat;
            case "stone":
                return stone;
            case "miles":
                return wheel;
            case "wood":
            default:
                return wood;
        }
    };

    useEffect(() => {
        setWP(selectedWorkPlace);
    }, [selectedWorkPlace]);


    useEffect(() => {
        if (wp?.token_name) {
            history.push(`/workplace/${wp.token_name.replace('#', '')}`);
        } else {
            history.push(`/workplace`);
        }
    }, [wp, history]);


    const renderWorkPlaceTools = () => {
        const slots = wp?.res?.[0]?.slots || 0; // Перевірка на існування wp.res і wp.res[0]
    
        const equipItems = tools.length < slots ? (
            Array.from({ length: slots - tools.length }, (_, i) => (
                <div key={i} className="workplaces-item equip">
                    <div className="workplaces-img unequip-img">
                        <img src={equip} alt="equip" />
                    </div>
                    <div className="btn-equip">
                        <EquipTool stakeHandler={equipTool} itemList={itemList} wp={wp} />
                    </div>
                </div>
            ))
        ) : null;
    
        const lockItems = tools.length <= slots ? (
            Array.from({ length: 4 - slots }, (_, i) => (
                <div key={i} className="workplaces-item lock">
                    <div className="workplaces-img locked-img">
                        <img src={lock} alt="lock" />
                    </div>
                    <div className="btn-lock">
                        <UnlockCard wpID={wp?.token_name?.replace('#', '')} />
                    </div>
                </div>
            ))
        ) : null;
    
        return (
            <div className="container">
                <div className="main-main-wrapper">
                    <div className="main-workplace-header">
                        <p className="time">Left to the next production:
                            <div className="timer">
                                <Timer wp={wp} stakedWP={stakedItemList} />
                            </div>
                        </p>
                        <div className="workplace-header-right">
                            <p>
                                <span>{miningCount}</span>
                                {wp?.res?.length > 0 && (
                                    <img src={getResourceIcon(wp.res[0]?.resource_type)} alt="resource" />
                                )}
                            </p>
                            <button className="start-work_btn" onClick={() => handleClaim(String(wp?.token_name?.replace('#', '')))}>
                                Claim
                            </button>
                        </div>
                    </div>
                    <div className="main-main-content">
                        {wp ?
                            <div className="main-main-list">
                                {tools.map((item) => (
                                    <div key={Number(item.asset_id)} className="workplaces-item">
                                        <div className="workplaces-img available-img">
                                            <img src={`https://atomichub-ipfs.com/ipfs/${item.data.img}`} alt="tool" />
                                        </div>
                                        <div className="produces">
                                            <p>Produces:</p>
                                            <p>{item.data.power}/Hour</p>
                                        </div>
                                        <div className="btn-unequip">
                                            <button onClick={() => unstakeHandler(selectedWorkPlace.workplace_asset_id, item.asset_id)}>
                                                Unequip
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {equipItems}
                                {lockItems}
                            </div> :
                            <div className="main-main-list">
                                <p>Firstly select a Workstation</p>
                            </div>}
                    </div>
                </div>
            </div>
        );
    };
    

    const handleClaim = (workplace_id) => {
        // Claim logic here
    };

    const equipTool = async (item) => {
        try {
            setLoading(true);
            await signAndSubmitTransaction({
                sender: account.address,
                data: {
                  function: `${contract_address}::farm::stake_instrument`,
                  functionArguments: [item],
                },
            });
            toast.success("Success staked tool!");
           
           
          } catch (error) {
            toast.error(error.message || error);
          } finally {
            setLoading(false)
          }
    };

    const unstakeHandler = (wpId, assetId) => {
        // Unstake logic here
    };

    return (
        <section className="workplace">
            <div className="main-workplace">
                <Sidebar
                    setSelectedWorkPlace={setSelectedWorkPlace}
                    selectItem={selectItem}
                    setSelectItem={setSelectItem}
                    stakeHandler={equipTool}
                    selectedWorkPlace={selectedWorkPlace}
                />
                <div className="main-main">
                    <div className="main-title">
                        <h2>Workplaces</h2>
                    </div>
                    {renderWorkPlaceTools()}
                    <Footer />
                </div>
            </div>
        </section>
    );
};

export default Workplaces;
