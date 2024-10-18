import React, { useState, useEffect } from "react";
import { useApp } from "../../Data/AppContext";

import meat from '../../images/market-items/meat.png';
import stone from '../../images/market-items/rock.png';
import wood from '../../images/market-items/wood.png';
import wheel from '../../images/market-items/wheel.png';
import equip from '../../images/plus_icon_section.png';
import energyIcon from '../../images/market-items/energy.png';

import lock from '../../images/lock.png';
import Footer from '../../components/FooterGameNav/FooterGameNav';
// import UnlockCard from '../../Modal/UnlockCard';
import EquipTool from '../../Modal/EquipTool';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { contract_address, getAptosStakedTools, getResources, getUserEnergy, getUserNfts } from "../../Services";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


import './workplaces.css';


const Workplaces = () => {
    const history = useHistory()
    const { id } = useParams();
    const { account, signAndSubmitTransaction } = useWallet();
    const { itemList, setItems, setResources, stakedItemList, setProbability } = useApp();
    const [selectItem, setSelectItem] = useState([]);
    const [selectedWorkPlace, setSelectedWorkPlace] = useState([]);
    const [wp, setWP] = useState([]);
    const [stakedTools, setStakedTools] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

    useEffect(() => {
        // Якщо дані ще не завантажились
        if (stakedItemList.length === 0) {
            return; // чекаємо, поки масив не заповниться
        }

        if (!id) {
            // Якщо id немає (URL тільки /workplace)
            const firstWorkPlace = stakedItemList[0];

            if (firstWorkPlace) {
                // Якщо перший об'єкт існує, редіректимо на нього
                history.replace(`/workplace/${firstWorkPlace.token_name.slice(1)}`);
            } else {
                // Якщо масив порожній, залишаємо на /workplace
                history.replace("/workplace");
            }
        } else {
            // Шукаємо об'єкт з відповідним token_name
            const selectedWorkPlace = stakedItemList.find(
                (item) => item.token_name === `#${id}`
            );

            // Якщо об'єкт знайдений, встановлюємо його
            if (selectedWorkPlace) {
                setSelectedWorkPlace(selectedWorkPlace);
            } else {
                // Якщо об'єкт не знайдений, повертаємо перший об'єкт і оновлюємо URL
                const firstWorkPlace = stakedItemList[0];
                setSelectedWorkPlace(firstWorkPlace);
                history.replace(`/workplace/${firstWorkPlace.token_name.slice(1)}`);
            }
        }
    }, [id, stakedItemList, setSelectedWorkPlace, history]);

    // useEffect(() => {
    //     if (wp?.token_name) {
    //         history.push(`/workplace/${wp.token_name.replace('#', '')}`);
    //     } else {
    //         history.push(`/workplace`);
    //     }
    // }, [wp, history]);

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
            return 0; // Коли фарм завершився, показуємо 0:00
        }

        const minutes = Math.floor(remainingCooldown / 60); // Залишкові хвилини
        const seconds = remainingCooldown % 60; // Залишкові секунди

        return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Формат хвилини:секунди
    };


    useEffect(() => {
        setWP(selectedWorkPlace);
    }, [selectedWorkPlace]);

    const getResourceIcon = (name) => {
        switch (name) {
            case "food":
                return meat;
            case "stone":
                return stone;
            case "gems":
                return wheel;
            case "wood":
                return wood;
            default:
                return wood;
        }
    };

    const calculateRepairPrice = (item) => {
        let res = 10 * Number(item.res[0].farming_rate) * (Number(item.res[0].cooldown) / 1e4);
        
        return parseFloat((Math.round(res * 100) / 100).toString());
    };    
    

    const renderWorkPlaceTools = () => {
        const slots = wp?.res?.[0]?.slots || 0;

        const occupiedSlots = wp?.res?.[0]
            ? stakedTools.filter(item => wp.res[0].resource_type === item.res[0].resource_type).length
            : 0;


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
                        <button>SOON</button>
                    </div>
                </div>
            ))
        );

        const handlerFarmItem = async (name) => {
            if (!account) return;
        
            try {
                // Initiate transaction
                await signAndSubmitTransaction({
                    sender: account.address,
                    data: {
                        function: `${contract_address}::farm::farm_instrument`,
                        functionArguments: [name],
                    },
                });
        
                toast.success('Farming...');
        
                // Fetch multiple resources in parallel
                const [stakedTools, resources, userEnergy] = await Promise.all([
                    getAptosStakedTools({ account }).catch((e) => {
                        console.log("Error fetching staked tools:", e);
                        return [];
                    }),
                    getResources({ account }).catch((e) => {
                        console.log("Error fetching resources:", e);
                        return [];
                    }),
                    getUserEnergy({ account }).catch((e) => {
                        console.log("Error fetching user energy:", e);
                        return [];
                    }),
                ]);
        
                // Set states
                setStakedTools(stakedTools);
                setResources(resources);
                setProbability(userEnergy);
        
            } catch (error) {
                console.error("Transaction failed:", error);
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
                                    .map((item, index) => {
                                        const isFarming = item.res[0].last_farm_time !== "0";
                                        const cooldownTime = isFarming ? calculateCooldown(item.res[0].last_farm_time, item.res[0].cooldown) : 0;

                                        return (
                                            <div key={index} className="workplaces-item">
                                                <div className="workplaces-img available-img">
                                                    <img src={item.token_uri} alt="tool" />
                                                    <button className="unequip-btn" onClick={() => handleUnEquip(item.token_name)}>
                                                        Unequip
                                                    </button>
                                                    {Number(item.res[0].durability) < Number(item.res[0].max_durability) &&
                                                        <button className="repair-btn" onClick={() => handleRepair(item.token_name)}>
                                                            Repair - {calculateRepairPrice(item)} <img style={{width: '16px', height: '16px'}} src={wheel} alt="gems" />
                                                        </button>
                                                    }
                                                </div>

                                                <div className="cooldown">
                                                    <p>Cooldown:</p>
                                                    <span className="cooldown-time">
                                                        {isFarming && cooldownTime !== 0
                                                            ? cooldownTime
                                                            : `${item.res[0].cooldown} min`}
                                                    </span>
                                                </div>

                                                <div className="produces">
                                                    <div className="produces-product">
                                                        <p>Produces:</p>
                                                        <div className="produces-product-count">
                                                            <span>{(Number(wp.res[0].farming_boost) * Number(item.res[0].farming_rate)) / 1e4}</span>
                                                            <img src={getResourceIcon(item.res[0].resource_type)} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="produces-energy">
                                                        <p>Energy consume:</p>
                                                        <div className="produces-energy-count">
                                                            <span>{Number(item.res[0].farming_rate) / 10}</span>
                                                            <img src={energyIcon} alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="btn-equip">
                                                    {isFarming ? (
                                                        cooldownTime !== 0 ? (
                                                            <button style={{ opacity: 0 }} onClick={() => handlerFarmItem(item.token_name)}>
                                                                Farm
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => handlerFarmItem(item.token_name)}>
                                                                Farm
                                                            </button>
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
                                <p>Stake a Workplace first</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };


    const handleRepair = async (name) => {
        try {
            // setLoading(true);
            await signAndSubmitTransaction({
                sender: account.address,
                data: {
                    function: `${contract_address}::farm::repair_instrument`,
                    functionArguments: [name],
                },
            });

            const userNfts = await getUserNfts({ account: account.address });
            setItems(userNfts);


            const data = await getAptosStakedTools({ account });
            setStakedTools(data);

            const resourcesData = await getResources({account: account})
            setResources(resourcesData);

            toast.success("Success!");

        } catch (error) {
            toast.error(error.message || error);
        } finally {
            // setLoading(false);
        }
    }

    const handleUnEquip = async (name) => {
        try {
            // setLoading(true);
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
            // setLoading(false);
        }
    };

    const equipTool = async (item, close) => {
        try {
            // setLoading(true);
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
            // setLoading(false);
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
