import React from 'react';
import Popup from 'reactjs-popup';

import cardIcon from '../images/card.png'
import closeImg from '../images/close.png'


import './modalCard.css'

export default () => (
  <Popup
    trigger={<a href="#">Unequip</a>}
    modal
    nested
  >
    {close => (
      <div className="modal">
          <img className="close" src={closeImg} alt="close" onClick={close} />
        <div className="header-modal"> Equip Card </div>
        <div className="content">
          <img src={cardIcon} alt="icon" />
          <p>You do not have a free card, choose in the store.</p>
        </div>
        <div className="actions" onClick={close}>
            <a href="/">Market</a>
        </div>
      </div>
    )}
  </Popup>
  
);