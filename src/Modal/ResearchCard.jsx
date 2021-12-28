import React from 'react';
import Popup from 'reactjs-popup';


import closeImg from '../images/close.png'
import leftImg from '../images/prehistoric_illustration_.png'


import './research.css'

export default () => (
  <Popup
    trigger={<button>Research 123 RTP</button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
          <img className="close" src={closeImg} alt="close" onClick={close} />
        <div className="header-modal"> Research +10 SP </div>
        <div className="content">
          <div className="research-wrapper">
            <div className="research-left-img-modal">
              <img src={leftImg} alt="img"/>
            </div>
            <div className="research-right-modal">
              <div className="research-right-modal__header">
                <h3>Prehistoric Age</h3>
              </div>
                <p>5 000 / 10 000 SP</p>
            </div>
          </div>
        </div>
        <div className="actions" onClick={close}>
            <button>OK</button>
        </div>
      </div>
    )}
  </Popup>
  
); 