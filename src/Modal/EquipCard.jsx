import React from 'react';
import Popup from 'reactjs-popup';

import arrowIcon from '../images/arrow.png'
import closeImg from '../images/close.png'


import './equip.css'

export default () => (
  <Popup
    trigger={<a href="#"> Equip </a>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <img className="close" src={closeImg} alt="close" onClick={close} />
        <div className="header-modal"> Equip Card </div>
        <div className="content">
            <div className="content-wrapper">
                <div className="content-card-list">
                    <div className="card-item">
                        <div className="card-item__wrapper">
                            <div className="card-item__img">
                                <img src={arrowIcon} alt="arrow" />
                            </div>
                            <div className="card-item__content">
                                <h4>Spear</h4>
                                <p>CardName</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-item">
                        <div className="card-item__wrapper">
                            <div className="card-item__img">
                                <img src={arrowIcon} alt="arrow" />
                            </div>
                            <div className="card-item__content">
                                <h4>Spear</h4>
                                <p>CardName</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-item">
                        <div className="card-item__wrapper">
                            <div className="card-item__img">
                                <img src={arrowIcon} alt="arrow" />
                            </div>
                            <div className="card-item__content">
                                <h4>Spear</h4>
                                <p>CardName</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-item">
                        <div className="card-item__wrapper">
                            <div className="card-item__img">
                                <img src={arrowIcon} alt="arrow" />
                            </div>
                            <div className="card-item__content">
                                <h4>Spear</h4>
                                <p>CardName</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="actions" onClick={close}>
            <a href="/">Equip</a>
        </div>
      </div>
    )}
  </Popup>
  
);