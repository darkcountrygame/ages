import React from 'react';
import Popup from 'reactjs-popup';
import { NavLink } from 'react-router-dom'


import cardIcon from '../images/market_art.png'
import closeImg from '../images/close.png'

import './unequip.css'

export default () => (
  <Popup
    trigger={<button>Equip</button>}
    modal
    nested
  >
    {close => (
      <div className="modal unequip">
          <img className="close" src={closeImg} alt="close" onClick={close} />
        <div className="header-modal"> Equip Card </div>
        <div className="content">
          <img src={cardIcon} alt="icon" />
          <p>You do not have a free card, choose in the store.</p>
        </div>
        <div className="actions" onClick={close}>
            <NavLink to='/market'>Market</NavLink>
        </div>
      </div>
    )}
  </Popup>

);