import React from 'react';
import Popup from 'reactjs-popup';


import closeImg from '../images/close.png'


import './inventory.css'

export default () => (

    <Popup
        trigger={<button>Sell</button>}
        modal
        nested
    >

        {close => (

            <div className="modal exchange">
                <img className="close" src={closeImg} alt="close" onClick={close} />
                <div className="header-modal"> Sell </div>
                <div className="content">
                    <p>You can exchange resources for tokens</p>
                    <input type="text" placeholder="Enter a number of resources" />
                </div>
                <div className="actions" onClick={close}>
                    <button>Sell</button>
                </div>
            </div>
        )}
    </Popup>

);