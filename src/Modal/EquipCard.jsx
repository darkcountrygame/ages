import React from 'react';
import Popup from 'reactjs-popup';


import closeImg from '../images/close.png'


import UserItems from '../components/UserItems/UserItems'

import './equip.css'

const EquipCard = ({ itemList, setSelectItem }) => (



  <Popup
    trigger={<button> Equip </button>}
    modal
    nested
  >
    {close => (
      <div className="modal equip">
        <img className="close" src={closeImg} alt="close" onClick={close} />
        <div className="header-modal"> Equip Card </div>
        <div className="content">
                <div className="content-card-list">
                  {itemList.map( item =>  <UserItems itemList={itemList} item={item} setSelectItem={setSelectItem}/> )}
                </div>
        </div>
        <div className="actions" onClick={close}>
            <button>Equip</button>
        </div>
      </div>
    )}
  </Popup>
  
);

export default EquipCard