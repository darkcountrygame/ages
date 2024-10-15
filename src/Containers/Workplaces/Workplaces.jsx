import React, { useState, useEffect } from "react";
import { useApp } from "../../Data/AppContext";

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


import './workplaces.css';

const Workplaces = () => {
    const { account, signAndSubmitTransaction } = useWallet();
    const { stakedItemList, itemList, setItems } = useApp();
    const [selectItem, setSelectItem] = useState([]);
    const [selectedWorkPlace, setSelectedWorkPlace] = useState([]);
    const [wp, setWP] = useState([]);
    const [stakedTools, setStakedTools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

    const history = createBrowserHistory();


    useEffect(() => {
        getAptosStakedTools({ account })
            .then(setStakedTools)
            .catch(console.log);
    }, [account]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Math.floor(Date.now() / 1000)); // Оновлюємо час кожну секунду
        }, 1000);

        return () => clearInterval(interval); // Очищаємо таймер, коли компонент відмонтовано
    }, []);

    const calculateCooldown = (lastFarmTime, cooldown) => {
        const lastFarmTimeInt = parseInt(lastFarmTime, 10); // Перетворюємо last_farm_time на число
        const cooldownInt = parseInt(cooldown, 10) * 60; // Перетворюємо cooldown на секунди
        const timePassed = currentTime - lastFarmTimeInt; // Обчислюємо, скільки часу минуло

        const remainingCooldown = cooldownInt - timePassed; // Залишок часу до завершення фарму

        if (remainingCooldown <= 0) {
            return "0:00"; // Коли фарм завершився, показуємо 0:00
        }

        const minutes = Math.floor(remainingCooldown / 60); // Залишкові хвилини
        const seconds = remainingCooldown % 60; // Залишкові секунди

        // Якщо повна хвилина, показуємо 60:00, інакше формат хвилини:секунди
        if (seconds === 0 && minutes > 0) {
            return "60:00"; // Показуємо 60, коли повна хвилина
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Формат хвилини:секунди
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

    const handleCollect = () => {

    }

    const renderWorkPlaceTools = () => {
        const slots = wp?.res?.[0]?.slots || 0;
        
        // Отримуємо кількість зайнятих слотів
        const occupiedSlots = stakedTools.filter(item => wp.res[0].resource_type === item.res[0].resource_type).length;
        
        // Кількість вільних слотів
        const freeSlots = Math.max(0, slots - occupiedSlots);
    
        const equipItems = (
            Array.from({ length: freeSlots }).map((_, i) => (
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
    
        const lockItems = (
            Array.from({ length: Math.max(0, 4 - slots) }).map((_, i) => (
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
                            function: `${contract_address}::farm::farm_instrument`,
                            functionArguments: [name],
                        },
                    });
    
                    toast.success('Farming...');
    
                    getAptosStakedTools({ account })
                    .then(setStakedTools)
                    .catch(console.log);
                } catch (error) {
                    console.error("Transaction failed:", error);
                }
            }
        };
    
        return (
            <div className="container">
                <div className="main-main-wrapper">
                    <div className="main-main-content">
                        {wp?.res?.[0] ? (
                            <div className="main-main-list">
                                {stakedTools
                                    .filter(item => wp.res[0].resource_type === item.res[0].resource_type)
                                    .map(item => {
                                        const isFarming = item.res[0].last_farm_time !== "0";
                                        const cooldownTime = isFarming ? calculateCooldown(item.res[0].last_farm_time, item.res[0].cooldown) : 0;
    
                                        return (
                                            <div key={item.asset_id} className="workplaces-item">
                                                <div className="workplaces-img available-img">
                                                    <img src={item.token_uri} alt="tool" />
                                                    <button className="unequip-btn" onClick={() => handleUnEquip(item.token_name)}>
                                                        Unequip
                                                    </button>
                                                </div>
    
                                                <div className="produces">
                                                    <p>Produces:</p>
                                                </div>
                                                <div className="btn-equip">
                                                    {isFarming ? (
                                                        cooldownTime !== "0:00" ? (
                                                            <p>Cooldown: {cooldownTime}</p>
                                                        ) : (
                                                            <button onClick={() => handleCollect(item.token_name)}>Collect</button>
                                                        )
                                                    ) : (
                                                        <button onClick={() => handlerFarmItem(item.token_name)}>
                                                            Farm
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
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
    

    const handleUnEquip = async (name) => {
        try {
            setLoading(true);
            await signAndSubmitTransaction({
                sender: account.address,
                data: {
                    function: `${contract_address}::farm::unstake_instrument`,
                    functionArguments: [name],
                },
            });

            const userNfts = await getUserNfts({ account: account.address });
            setItems(userNfts);
            toast.success("Success unstaked!");

            const data = await getAptosStakedTools({ account });
            setStakedTools(data);

        } catch (error) {
            toast.error(error.message || error);
        } finally {
            setLoading(false);
        }
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
