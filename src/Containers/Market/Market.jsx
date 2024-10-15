import React, { useState } from 'react';
import Footer from '../../components/FooterGameNav/FooterGameNav';
import './market.css';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { contract_address, getUserNfts } from '../../Services';
import { toast } from 'react-toastify';
import { useApp } from '../../Data/AppContext';

const Market = () => {
    const { setItems } = useApp();
    const { account, signAndSubmitTransaction } = useWallet();
    const [activeTab, setActiveTab] = useState('workplace');
    const [stakedItems, setStakedItems] = useState([]);

    // Дані для Workplace та Instruments з вашої таблиці, включаючи URI для зображень
    const workplaceItems = [
        { name: "Hunter's Lodge", uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Barn.png', template_id: 8 },
        { name: "Stonemasons Cave", uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Field.png', template_id: 9 },
        { name: "Warehouse in the Cave", uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Mill.png', template_id: 10 },
        { name: "Woodcutters Cave", uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Storehouse.png', template_id: 11 }
    ];
    
    const instrumentItems = [
        { name: 'Basket', uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Basket.png', template_id: 0 },
        { name: 'Wheel Barrow', uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Wheel_Barrow.png', template_id: 1 },
        { name: 'Wooden Raft', uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Wooden_Raft.png', template_id: 2 },
        { name: 'Wooden Spear', uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Wooden_Spear.png', template_id: 3 },
        { name: 'Chopper', uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Chopper.png', template_id: 4 },
        { name: 'Stone Pickaxe', uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Stone_Pickaxe.png', template_id: 5 },
        { name: 'Hand Axe', uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Hand_Axe.png', template_id: 6 },
        { name: 'Stone Axe', uri: 'https://indigo-peculiar-emu-121.mypinata.cloud/ipfs/QmYdUMYsNf4pVmRf6XPxk1LtNgAXm2TrA4AHQETLZbE92M/Stone_Axe.png', template_id: 7 }
    ];
    

    const handleStake = async(item, template_id) => {
        if (!stakedItems.includes(item)) {
            setStakedItems([...stakedItems, item]);
        }

        if (account) {
            try {
                await signAndSubmitTransaction({
                    sender: account.address,
                    data: {
                        function: `${contract_address}::minter::mint`,
                        functionArguments: [
                            account.address,
                            template_id
                        ],
                    },
                });

                toast.success('Staked!');

                const userNfts = await getUserNfts({ account: account.address });
                setItems(userNfts);

            } catch (error) {
                console.error("Transaction failed:", error);
            }
        }
        
    };

    const isStaked = (item) => stakedItems.includes(item);

    return (
        <section className='workplace'>
            <div className="main-workplace">
                <div className="main-main">
                    <div className="main-title">
                        <h2>Free Mint</h2>
                    </div>
                    <div className="tabs">
                        <button 
                            className={activeTab === 'workplace' ? 'active-tab' : ''} 
                            onClick={() => setActiveTab('workplace')}
                        >
                            Workplace
                        </button>
                        <button 
                            className={activeTab === 'instruments' ? 'active-tab' : ''} 
                            onClick={() => setActiveTab('instruments')}
                        >
                            Instruments
                        </button>
                    </div>
                    <div className="container-market">
                        {activeTab === 'workplace' && (
                            <ul className="item-list">
                                {workplaceItems.map(item => (
                                    <li key={item.name} className={`list-item ${isStaked(item.name) ? 'staked-item' : ''}`}>
                                        {/* <img src={item.uri} alt={item.name} className="item-image" /> */}
                                        <span>{item.name}</span>
                                        <button 
                                            className={`stake-button ${isStaked(item.name) ? 'staked-button' : ''}`} 
                                            onClick={() => handleStake(item.name, item.template_id)}
                                            disabled={isStaked(item.name)}
                                        >
                                            {isStaked(item.name) ? 'Staked' : 'Stake'}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        {activeTab === 'instruments' && (
                            <ul className="item-list">
                                {instrumentItems.map(item => (
                                    <li key={item.name} className={`list-item ${isStaked(item.name) ? 'staked-item' : ''}`}>
                                        {/* <img src={item.uri} alt={item.name} className="item-image" /> */}
                                        <span>{item.name}</span>
                                        <button 
                                            className={`stake-button ${isStaked(item.name) ? 'staked-button' : ''}`} 
                                            onClick={() => handleStake(item.name, item.template_id)}
                                            disabled={isStaked(item.name)}
                                        >
                                            {isStaked(item.name) ? 'Staked' : 'Stake'}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Market;
