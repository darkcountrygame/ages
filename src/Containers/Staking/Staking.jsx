import React, { useState } from 'react';
import { useApp } from "../../Data/AppContext";
import Footer from '../../components/FooterGameNav/FooterGameNav';
import UserTool from '../../components/UserTool/UserTool';
import './staking.css';
import { contract_address, getAptosStakedWP, getUserNfts } from '../../Services';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { toast } from 'react-toastify';

const Staking = () => {
  const { account, signAndSubmitTransaction } = useWallet();
  const { itemList, setItems, stakedItemList, setStakedItems } = useApp();

  const ADD_ASSET = 'Add Asset';
  const REMOVE_ASSET = 'Remove Asset';

  const [selectedWP, setSelectedWP] = useState(null);
  const [selectedTab, setSelectedTab] = useState(ADD_ASSET);
  const [loading, setLoading] = useState(false);

  const handleClick = (tabName) => setSelectedTab(tabName);

  const handleStake = async () => {
    if (!selectedWP) return toast.error("Please select an item to stake.");
  
    if (account) {
      try {
        setLoading(true);

        await signAndSubmitTransaction({
          sender: account.address,
          data: {
            function: `${contract_address}::farm::unstake_worksite`,
            functionArguments: [selectedWP.token_name],
          },
        });
  
        setItems(itemList.filter((item) => item.token_name !== selectedWP.token_name));
        toast.success("Success staked!");
  
        /// Retrieve staked items
        const stakedItems = await getAptosStakedWP({ account });
        console.log(stakedItems);
        
        setStakedItems(stakedItems);
      } catch (error) {
        toast.error(error.message || error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  const handleUnStake = async () => {
    if (!selectedWP) return toast.error("Please select an item to unstake.");
    if (account) {
      try {
        setLoading(true);
        await signAndSubmitTransaction({
          sender: account.address,
          data: {
            function: `${contract_address}::farm::unstake_worksite`,
            functionArguments: [selectedWP.token_name],
          },
        });
  
        setStakedItems(stakedItemList.filter((item) => item.token_name !== selectedWP.token_name));
        const userNfts = await getUserNfts({ account: account.address });
        setItems(userNfts);
        toast.success("Success unstaked!");
      } catch (error) {
        toast.error(error.message || error);
      } finally {
        setLoading(false);
      }
    }
 
  };

  const renderToolList = (items, filter) =>
    items.length ? (
      items
        .filter((nft) => !filter || nft.token_properties_mutated_v1?.hasOwnProperty('Slots'))
        .map((item, index) => (
          <UserTool
            key={index}
            item={item}
            setSelectTool={setSelectedWP}
            selectedTool={selectedWP}
          />
        ))
    ) : (
      <p className="no-workplaces">No worksites</p>
    );

  return (
    <section className="workplace">
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
            </div>

            <div className="main-main-content">
              {selectedTab === ADD_ASSET && <div className="stake-list">{renderToolList(itemList, true)}</div>}
              {selectedTab === REMOVE_ASSET && <div className="stake-list">{renderToolList(stakedItemList, false)}</div>}
            </div>

            <div className="stake-btn">
              {selectedTab === ADD_ASSET && (
                <button onClick={handleStake} disabled={loading}>
                  {loading ? 'Staking...' : 'Stake'}
                </button>
              )}
              {selectedTab === REMOVE_ASSET && (
                <button onClick={handleUnStake} disabled={loading}>
                  {loading ? 'Unstaking...' : 'Unstake'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Staking;
