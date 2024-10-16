import React, { useState, useEffect } from 'react';
import Footer from '../../components/FooterGameNav/FooterGameNav';
import testImg from "../../images/items/HandAxe_wood.png";

import BasketMiles from '../../images/items/Basket_miles.png';
import ChopperStone from '../../images/items/Chopper_stone.png';
import HandAxeWood from '../../images/items/HandAxe_wood.png';
import HuntersLodge from '../../images/items/Hunters_lodge.png';
import StoneAxeWood from '../../images/items/StoneAxe_wood.png';
import StonemasonsCave from '../../images/items/Stonemasons_cave_.png';
import StonePickaxeStone from '../../images/items/StonePickaxe_stone.png';
import WarehouseInTheCave from '../../images/items/Warehouse_in_the_cave_.png';
import WheelbarrowMiles from '../../images/items/Wheelbarrow_miles.png';
import WoodcuttersCave from '../../images/items/Woodcutters_cave_.png';
import WoodenRaftFood from '../../images/items/WoodenRaft_food.png';
import WoodenSpearFood from '../../images/items/WoodenSpear_food.png';

import meat from  '../../images/market-items/meat.png';
import rock from '../../images/market-items/rock.png';
import gems from  '../../images/market-items/wheel.png';
import wood from '../../images/market-items/wood.png';

import { getInfoAboutCraftAptos } from '../../Services/aptos.service';

import './Swap.css';
import CraftLastStepModal from '../../Modal/CraftLastStepModal';


// Константи з даними
const workplaceItems = [
    { name: "Hunter's Lodge", uri: HuntersLodge, template_id: 8 },
    { name: "Stonemasons Cave", uri: StonemasonsCave, template_id: 9 },
    { name: "Warehouse in the Cave", uri: WarehouseInTheCave, template_id: 10 },
    { name: "Woodcutters Cave", uri: WoodcuttersCave, template_id: 11 }
];

const instrumentItems = [
    { name: 'Basket', uri: BasketMiles, template_id: 0 },
    { name: 'Wheel Barrow', uri: WheelbarrowMiles, template_id: 1 },
    { name: 'Wooden Raft', uri: WoodenRaftFood, template_id: 2 },
    { name: 'Wooden Spear', uri: WoodenSpearFood, template_id: 3 },
    { name: 'Chopper', uri: ChopperStone, template_id: 4 },
    { name: 'Stone Pickaxe', uri: StonePickaxeStone, template_id: 5 },
    { name: 'Hand Axe', uri: HandAxeWood, template_id: 6 },
    { name: 'Stone Axe', uri: StoneAxeWood, template_id: 7 }
];

export default function Swap() {

    // Ініціалізація стану з першим елементом
    const [selectedItem, setSelectedItem] = useState([...instrumentItems, ...workplaceItems][0]);
    const [craftInfo, setCraftInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    // Обробка вибору айтема
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    // Функція для отримання інформації про крафт
    const fetchCraftInfo = async (templateId) => {
        setLoading(true);
        try {
            const data = await getInfoAboutCraftAptos({ template_id: templateId });
            setCraftInfo(data[0]);
        } catch (error) {
            console.error("Error fetching craft info:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (selectedItem) {
            fetchCraftInfo(selectedItem.template_id);
        }
    }, [selectedItem]);

    return (
        <section className='workplace'>
            <div className="main-workplace swap">
                <div className="main-main">
                    <div className="main-title">
                        <h2>Craft</h2>
                    </div>
                    <div className="swap-container">
                        <div className="block-craft">
                            <div className="block-craft_container">
                                {[...instrumentItems, ...workplaceItems].map((item) => (
                                    <div
                                        key={item.template_id}
                                        className={`craft-item ${selectedItem?.template_id === item.template_id ? 'active' : ''}`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <img src={item.uri} alt={item.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="block-selected-craft">
                            <img src={selectedItem?.uri || testImg} alt={selectedItem?.name || "Select an item"} />
                        </div>
                        <div className="block-craft-info">
                            {loading ? (
                                <div className="loading">Loading...</div>
                            ) : selectedItem && craftInfo ? (
                                <>
                                    <div className="title-block-craft-info">
                                        <h3>{selectedItem.name}</h3>
                                    </div>
                                    <div className="main-info-about-craft">
                                        <div>
                                            <p className="info">Level:</p> <span>3</span>
                                        </div>
                                        <div>
                                            <p className="info">Rarity:</p> <span>Rare</span>
                                        </div>
                                        <div>
                                            <p className="info">Produced:</p> <span>20 /hour</span>
                                        </div>
                                        <div>
                                            <p className="info">Energy consume:</p> <span>12 /hour</span>
                                        </div>

                                    </div>
                                    <div className="cost-block-craft">
                                        <div className='cost-aptos-token'>
                                            <p>Cost:</p>
                                            <div><span>{Number(craftInfo.aptos_amount) / 1e8 } APT</span></div>
                                        </div>

                                        <div className='cost-resources'>
                                            <div>
                                                <span>{craftInfo.food_amount}</span>
                                                <img src={meat} alt="meat" />
                                            </div>

                                            <div>
                                                <span>{craftInfo.wood_amount}</span>
                                                <img src={wood} alt="wood" />
                                            </div>

                                            <div>
                                                <span>{craftInfo.stone_amount}</span>
                                                <img src={rock} alt="stone" />
                                            </div>

                                            <div>
                                                <span>{craftInfo.gems_amount}</span>
                                                <img src={gems} alt="gems" />
                                            </div>

                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="title-block-craft-info">
                                    <h3>Select an item to view details</h3>
                                </div>
                            )}
                            <div className="stake-btn">
                                <CraftLastStepModal template_id={selectedItem?.template_id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}
