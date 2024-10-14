import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { NavLink } from 'react-router-dom';

import cardIcon from '../images/market_art.png';
import closeImg from '../images/close.png';

import UserItems from "../components/UserWorkplace/UserItems";

import './EquipTool.css';

const EquipTool = ({ stakeHandler, itemList, wp }) => {
    const [toolSelected, setToolSelected] = useState(null);


    return (
        <Popup
            trigger={<button>Equip</button>}
            modal
            nested
        >
            {close => (
                !itemList.length ? (
                    <div className="equip-tool">
                        <img className="close" src={closeImg} alt="close" onClick={close} />
                        <div className="header-modal"> Equip Card </div>
                        <div className="content">
                            <img src={cardIcon} alt="icon" />
                            <p>You do not have a free card, choose in the store.</p>
                        </div>
                        <div className="actions" onClick={close}>
                            <div className="green-btn">
                                <NavLink to='/market'>Market</NavLink>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="equip-tool">
                        <img className="close" src={closeImg} alt="close" onClick={close} />
                        <div className="header-modal"> Equip </div>
                        <div className="content">
                            <div className="card-list">
                                {itemList
                                 .filter(nft => !nft.token_properties_mutated_v1?.hasOwnProperty('Slots'))
                                 .filter(item => wp.res[0].resource_type === item.token_properties_mutated_v1["Resource Type"])
                                .map((item, index) => (
                                    
                                        <UserItems
                                            key={index}
                                            itemList={itemList}
                                            item={item}
                                            index={index}
                                            setToolSelected={setToolSelected}
                                            toolSelected={toolSelected}
                                        />
                                    
                                ))}
                            </div>
                        </div>
                        <div className="equip_btn" onClick={() => stakeHandler(toolSelected)}>
                            <p>Equip</p>
                        </div>
                    </div>
                )
            )}
        </Popup>
    );
};

export default EquipTool;
