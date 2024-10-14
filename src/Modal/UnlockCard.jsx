import React from 'react';
import Popup from 'reactjs-popup';
import { useApp } from "../Data/AppContext";


import cardIcon from '../images/unlock.png'
import closeImg from '../images/close.png'


import './unlock.css'


// eslint-disable-next-line import/no-anonymous-default-export
export default ({wpID}) => {

    const {
        wpConfig,
    } = useApp();

    // const { activeUser } = useContext(UALContext);

    const handleUnLock = () => {
       
    }


  return (
      <Popup
          trigger={<button>Unlock</button>}
          modal
          nested
      >
        {close => (
            <div className="modal unlock">
              <img className="close" src={closeImg} alt="close" onClick={close}/>
              <div className="header-modal"> Unlock</div>
              <div className="content">
                <img src={cardIcon} alt="icon"/>
                <p>Open a cell to speed up progress</p>
              </div>
              <div className="actions" onClick={handleUnLock}>
                  <button>
                      {!wpConfig || !wpConfig.length || !wpConfig[0].price_unlock_slot
                          ? '100 LOA'
                          : Math.floor(+wpConfig[0].price_unlock_slot.split(' ')[0]) + ' LOA'}
                  </button>
              </div>
            </div>
        )}
      </Popup>
  );
}