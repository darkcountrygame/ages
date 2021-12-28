import React from 'react';
import Popup from 'reactjs-popup';

import cardIcon from '../images/unlock.png'
import closeImg from '../images/close.png'


import './unlock.css'

export default () => (
  <Popup
    trigger={<button>Unlock</button>}
    modal
    nested
  >
    {close => (
      <div className="modal unlock">
          <img className="close" src={closeImg} alt="close" onClick={close} />
        <div className="header-modal"> Unlock </div>
        <div className="content">
          <img src={cardIcon} alt="icon" />
          <p>Open a cell to speed up progress</p>
        </div>
        <div className="actions" onClick={close}>
            <button >Unlock -120 RTP</button>
        </div>
      </div>
    )}
  </Popup>
  
); 