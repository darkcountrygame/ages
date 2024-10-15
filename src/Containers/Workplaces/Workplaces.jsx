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
import { contract_address, getAptosStakedTools, getUserNfts } from "../../Services";
import { toast } from "react-toastify";

const Workplaces = () => {
    const { account, signAndSubmitTransaction } = useWallet();
    const { stakedItemList, itemList, setItems } = useApp();
    const [selectItem, setSelectItem] = useState([]);
    const [selectedWorkPlace, setSelectedWorkPlace] = useState([]);
    const [wp, setWP] = useState([]);
    const [stakedTools, setStakedTools] = useState([]);
    const [loading, setLoading] = useState(false);

    const history = createBrowserHistory();

    useEffect(() => {
        getAptosStakedTools({ account })
            .then(setStakedTools)
            .catch(console.log);
    }, [account]);

    useEffect(() => {
        setWP(selectedWorkPlace);
    }, [selectedWorkPlace]);

    console.log(loading);

    useEffect(() => {
        if (wp?.token_name) {
            history.push(`/workplace/${wp.token_name.replace('#', '')}`);
        } else {
            history.push(`/workplace`);
        }
    }, [wp, history]);

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

    const renderWorkPlaceTools = () => {
        const slots = wp?.res?.[0]?.slots || 0;

        const equipItems = stakedTools.length < slots && (
            Array.from({ length: slots - stakedTools.length }).map((_, i) => (
                <div key={i} className="workplaces-item equip">
                    <div className="workplaces-img unequip-img">
                        <img src={equip} alt="equip" />
                    </div>
                    <div className="btn-equip">
                        <EquipTool stakeHandler={equipTool} itemList={itemList} wp={wp} />
                    </div>
                </div>
            ))
        );

        const lockItems = stakedTools.length <= slots && (
            Array.from({ length: 4 - slots }).map((_, i) => (
                <div key={i} className="workplaces-item lock">
                    <div className="workplaces-img locked-img">
                        <img src={lock} alt="lock" />
                    </div>
                    <div className="btn-lock">
                        <UnlockCard wpID={wp?.token_name?.replace('#', '')} />
                    </div>
                </div>
            ))
        );

        const handlerFarmItem = async (name) => {
            if (account) {
                try {
                    await signAndSubmitTransaction({
                        sender: account.address,
                        data: {
                            function: `${contract_address}::farm::farm_instrument`, // String interpolation
                            functionArguments: [
                                name
                            ],
                        },
                    });
                } catch (error) {
                    console.error("Transaction failed:", error); // Error handling
                }
            }
        }

        return (
            <div className="container">
                <div className="main-main-wrapper">
                    <div className="main-workplace-header">
                        <p className="time">
                            Left to the next production:
                            <div className="timer">
                                <Timer wp={wp} stakedWP={stakedItemList} />
                            </div>
                        </p>
                        <div className="workplace-header-right">
                            {wp?.res?.length > 0 && (
                                <img src={getResourceIcon(wp.res[0]?.resource_type)} alt="resource" />
                            )}
                            <button className="start-work_btn" onClick={() => handleClaim(wp?.token_name?.replace('#', ''))}>
                                Claim
                            </button>
                        </div>
                    </div>
                    <div className="main-main-content">
                        {wp?.res?.[0] ? (
                            <div className="main-main-list">
                                {stakedTools
                                    .filter(item => wp.res[0].resource_type === item.res[0].resource_type)
                                    .map(item => (
                                        <div key={item.asset_id} className="workplaces-item">
                                            <div className="workplaces-img available-img">
                                                <img src={item.token_uri} alt="tool" />
                                            </div>
                                            <div className="produces">
                                                <p>Produces:</p>
                                            </div>
                                            <div className="btn-equip">
                                                <button onClick={() => handlerFarmItem(item.token_name)}>
                                                    Farm
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                {equipItems}
                                {lockItems}
                            </div>
                        ) : (
                            <div className="main-main-list">
                                <p>Firstly select a Workstation</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const handleClaim = (workplace_id) => {
        // Claim logic here
    };

    const equipTool = async (item, close) => {
        try {
            setLoading(true);
            await signAndSubmitTransaction({
                sender: account.address,
                data: {
                    function: `${contract_address}::farm::stake_instrument`,
                    functionArguments: [item],
                },
            });

            const userNfts = await getUserNfts({ account: account.address });
            setItems(userNfts);
            toast.success("Success equipped!");

            const data = await getAptosStakedTools({ account });
            setStakedTools(data);

            close();
        } catch (error) {
            toast.error(error.message || error);
        } finally {
            setLoading(false);
        }
    };

    // const unstakeHandler = (wpId, assetId) => {
    //     // Unstake logic here
    // };

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
