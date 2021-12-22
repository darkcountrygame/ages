import React from 'react';
import Popup from 'reactjs-popup';

import cardIcon from '../images/spear.png'
import closeImg from '../images/close.png'
import meatIcon from '../images/market-items/meat.png'


import './upgrade.css'

export default () => (
  <Popup
    trigger={<button>Upgrade -12 RTP</button>}
    modal
    nested
  >
    {close => (
      <div className="modal upgrade">
          <img className="close" src={closeImg} alt="close" onClick={close} />
        <div className="header-modal"> Upgrade to 2 LV </div>
        <div className="content">
          <div className="info-card">
              <div className="info-card__img">
                  <div className="info-card__img-wrapper">
                      <div className="info-card__photo">
                         <img src={cardIcon} alt="cardIcon" />
                      </div>
                        <div className="info-card__text">
                            <h4>Spear</h4>
                            <p>CardName</p>
                        </div>
                  </div>
              </div>
              <div className="info-card__asset">
                  <ul>
                      <li>Asset Name</li><span>CardName</span>
                      <li>Asset ID</li><span>#1234567890</span>
                      <li>Rarity</li><span>Common</span>
                      <li>Mint Number</li><span>1234 (3,000)</span>
                  </ul>
              </div>
              <div className="info-card__progress">
                  <p>Upgrade Progress</p>
                  <ul>
                      <li>1 LV Produces</li>
                        <div className="li-wrapper">
                            <img src={meatIcon} alt="meat" /> <p>100 / Hour</p> 
                        </div>
                      
                      <li>2 LV Produces</li> 
                      <div className="li-wrapper">
                            <img src={meatIcon} alt="meat" /> <p>100 / Hour</p>
                      </div>
                  </ul>
              </div>
          </div>
        </div>
        <div className="actions" onClick={close}>
            <a href="/">Upgrade -12 RTP</a>
        </div>
      </div>
    )}
  </Popup>
  
); 