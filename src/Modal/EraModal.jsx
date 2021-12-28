import React from 'react';
import Popup from 'reactjs-popup';


import closeImg from '../images/close.png'
import leftImg from '../images/neolithic_illustration.png'
import itemsImg from '../images/hunters_lodge.png'

import './newera.css'


export default () => (
    <Popup
        trigger={<button>Advance to New Era</button>}
        modal
        nested
    >
        {close => (
            <div className="modal newera">
                <img className="close" src={closeImg} alt="close" onClick={close} />
                <div className="header-modal"> New Era </div>
                <div className="content">
                    <div className="era-wrapper">
                        <div className="era-left">
                            <div className="era-left__title">
                                <h3>Neolithic Age</h3>
                            </div>
                            <div className="era-left__img">
                                <img src={leftImg} alt="img"/>
                            </div>
                        </div>
                        <div className="era-right">
                            <div className="era-update__title">
                                <h4>Whats New: </h4>
                            </div>
                            <div className="era-right__update">
                                <div className="era-update__item">
                                    <img src={itemsImg} alt="img"/>
                                </div>
                                <div className="era-update__item">
                                    <img src={itemsImg} alt="img"/>
                                </div>
                                <div className="era-update__item">
                                    <img src={itemsImg} alt="img"/>
                                </div>
                                <div className="era-update__item">
                                    <img src={itemsImg} alt="img"/>
                                </div>
                                <div className="era-update__item">
                                    <img src={itemsImg} alt="img"/>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <button disabled={true}>Advance to New Era</button>
                </div>
            </div>
        )}
    </Popup>

);