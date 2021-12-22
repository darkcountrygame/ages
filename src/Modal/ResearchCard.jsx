import React from 'react';
import Popup from 'reactjs-popup';


import closeImg from '../images/close.png'
import houseImg from '../images/research-1.png'


import './modalCard.css'

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
          <div className="research-bg">
            <div className="research-bg_img">
              <img src={houseImg} alt="img" />
            </div>
            <div className="research-bg_info">
              <div className="research_title">
                <h3>Prehistoric age</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="actions" onClick={close}>
            <a href="/">OK</a>
        </div>
      </div>
    )}
  </Popup>
  
); 