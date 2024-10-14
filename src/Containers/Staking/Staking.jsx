import React, { useState } from 'react';
import { useApp } from "../../Data/AppContext";
import Footer from '../../components/FooterGameNav/FooterGameNav';
import UserTool from '../../components/UserTool/UserTool';
import './staking.css';
import { contract_address } from '../../Services';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { toast } from 'react-toastify';

export default function Staking() {
    const {account, signAndSubmitTransaction} = useWallet();
    const { itemList, stakedItemList } = useApp();

    const ADD_ASSET = 'Add Asset';
    const REMOVE_ASSET = 'Remove Asset';

    const [selectedWP, setSelectedWP] = useState('#33');
    const [selectedTab, setSelectedTab] = useState(ADD_ASSET);
    const [loading, setLoading] = useState(false);

    console.log(selectedWP);
    console.log(loading);
    
    

    const handleClick = (tabName) => setSelectedTab(tabName);

    const handleStake = async () => {
        try {
            setLoading(true);
            await signAndSubmitTransaction({
                sender: account.address,
                data: {
                  function: `${contract_address}::farm::stake_worksite`,
                  functionArguments: [selectedWP.token_name],
                },
            });
            toast.success("Success staked!");
           
           
          } catch (error) {
            toast.error(error.message || error);
          } finally {
            setLoading(false)
          }
    };

    const handleUnStake = async () => {
        try {
            setLoading(true);
            await signAndSubmitTransaction({
                sender: account.address,
                data: {
                  function: `${contract_address}::farm::unstake_worksite`,
                  functionArguments: [selectedWP.token_name],
                },
            });
            toast.success("Success unstaked!");
           
           
          } catch (error) {
            toast.error(error.message || error);
          } finally {
            setLoading(false)
          }
    };
    

    const renderToolList = (items, filter) => (
        items.length ? (
            items
                .filter(nft => !filter || (nft.token_properties_mutated_v1 && nft.token_properties_mutated_v1.hasOwnProperty('Slots'))) // Apply filter only if filter = true
                .map((item, index) => (
                    <UserTool
                        key={index}
                        item={item}
                        setSelectTool={setSelectedWP}
                        selectedTool={selectedWP}
                        index={index}
                    />
                ))
        ) : (
            <p className="no-workplaces">No worksides</p>
        )
    );
    
    

    return (
        <section className="workplace">
            <div className="main-workplace stake">
                <div className="main-main">
                    <div className="main-title">
                        <h2>Inventory</h2>
                    </div>
                    <div
                        className={`add ${selectedTab === ADD_ASSET ? 'active' : ''}`}
                        onClick={() => handleClick(ADD_ASSET)}
                    >
                        <p>{ADD_ASSET}</p>
                    </div>
                    <div
                        className={`remove ${selectedTab === REMOVE_ASSET ? 'active' : ''}`}
                        onClick={() => handleClick(REMOVE_ASSET)}
                    >
                        <p>{REMOVE_ASSET}</p>
                    </div>

                    <div className="container">
                        <div className="header-stake">
                            <div className="header-stake__wrapper">
                                <div className="filter">
                                    <select>
                                        <option>Hunters Lodge</option>
                                    </select>
                                    <select>
                                        <option>Rarity Filter</option>
                                    </select>
                                    <select>
                                        <option>Level</option>
                                    </select>
                                    <select>
                                        <option>Sort by</option>
                                    </select>
                                </div>
                                <div className="btn">
                                    {/* Uncomment this line if you have a market redirection logic */}
                                    {/* <button onClick={redirectMarket}>Go to Market</button> */}
                                </div>
                            </div>
                        </div>

                        <div className="main-main-content">
                            {selectedTab === ADD_ASSET && (
                                <div className="stake-list">
                                    {renderToolList(itemList,  true)}
                                </div>
                            )}

                            {selectedTab === REMOVE_ASSET && (
                                <div className="stake-list">
                                    {renderToolList(stakedItemList,  false)}
                                </div>
                            )}
                            {/* <span className="alert">*Removed items will be available after 3 days</span> */}
                        </div>

                        <div className="stake-btn">
                            {selectedTab === ADD_ASSET && (
                                <button onClick={handleStake}>
                                    Stake
                                </button>
                            )}

                            {selectedTab === REMOVE_ASSET && (
                                <button onClick={handleUnStake}>
                                    Unstake
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}
