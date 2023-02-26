import React from 'react';
import Popup from 'reactjs-popup';
import { NavLink } from 'react-router-dom'

import cardIcon from '../images/market_art.png'
import closeImg from '../images/close.png'

import './EquipTool.css'
import UserItems from "../components/UserWorkplace/UserItems";


const EquipTool = ({itemList}) => {

    return(
        <Popup
            trigger={<button>Equip</button>}
            modal
            nested
        >
          {close => (
              !itemList.length ?
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
                  :
                  <div className="equip-tool">
                      <img className="close" src={closeImg} alt="close" onClick={close}/>
                      <div className="header-modal"> Equip </div>
                      <div className="content">
                          <div className="card-list">
                                  {itemList.map( (item, index) => (item.schema.schema_name === 'tool' ?
                                          <UserItems itemList={itemList} item={item} index={index} />
                                          :
                                          false
                                  ))}
                          </div>
                          {/*<div className="content-card-list">*/}
                          {/*    {itemList.map( (item, index) => (item.schema.schema_name === 'tool' ?*/}
                          {/*            <UserItems itemList={itemList} item={item} index={index} />*/}
                          {/*            :*/}
                          {/*            false*/}
                          {/*    ))}*/}
                          {/*</div>*/}
                      </div>
                      <div className="equip_btn" onClick={close}>
                          <p> Equip </p>
                      </div>
                  </div>
          )}
        </Popup>
    )
}

export default EquipTool;


