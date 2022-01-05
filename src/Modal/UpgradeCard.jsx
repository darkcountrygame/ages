import React, {useContext} from 'react';
import Popup from 'reactjs-popup';



import cardIcon from '../images/hunters_lodge.png'
import closeImg from '../images/close.png'
import meatIcon from '../images/market-items/meat.png'


import './upgrade.css'

import { upgradeTool } from "../Services";
import {UALContext} from "ual-reactjs-renderer";

export default ({disabled, selectedTool}) => {
  const { activeUser } = useContext(UALContext);

  const upgradeHandler = () => {
    upgradeTool({activeUser, selectedTool})
  }

  return (
      <Popup
          trigger={<button disabled={disabled}>Upgrade -12 RTP</button>}
          modal
          nested
      >
        {close => (
            <div className="upgrade">
              <img className="close" src={closeImg} alt="close" onClick={close}/>
              <div className="header-modal"> Upgrade to 2 LV</div>
              <div className="content">
                <div className="info-card">
                  <div className="info-card__img">
                    <div className="info-card__img-wrapper">
                      <div className="info-card__photo">
                        <img src={cardIcon} alt="cardIcon"/>
                      </div>
                    </div>
                  </div>
                  <div className="info-card__asset">
                    <ul>
                      <li>Asset Name</li>
                      <span>CardName</span>
                      <li>Asset ID</li>
                      <span>#{selectedTool}</span>
                      <li>Rarity</li>
                      <span>Common</span>
                      <li>Mint Number</li>
                      <span>1234 (3,000)</span>
                    </ul>
                  </div>
                  <div className="info-card__progress">
                    <p>Upgrade Progress</p>
                    <ul>
                      <li>1 LV Produces</li>
                      <div className="li-wrapper">
                        <img src={meatIcon} alt="meat"/> <p>100 / Hour</p>
                      </div>

                      <li>2 LV Produces</li>
                      <div className="li-wrapper">
                        <img src={meatIcon} alt="meat"/> <p>100 / Hour</p>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="actions" onClick={close}>
                <button onClick={upgradeHandler}>Upgrade -12 RTP</button>
              </div>
            </div>
        )}
      </Popup>

  );
}