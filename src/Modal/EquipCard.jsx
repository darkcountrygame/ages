import React from 'react';
import Popup from 'reactjs-popup';


import closeImg from '../images/close.png'
import add from '../images/add.png'


import UserItems from '../components/UserWorkplace/UserItems'

import './equip.css'


const EquipCard = ({ itemList, setSelectItem, stakeHandler }) => {

  return (

    <Popup
      trigger={<button className="add-workplace" onClick={stakeHandler}> <img src={add} alt="add" /> </button>}
      modal
      nested
    >
      {close => (
        <div className="modal equip">
          <img className="close" src={closeImg} alt="close" onClick={close} />
          <div className="header-modal"> Equip Workplace </div>
          <div className="content">
            <div className="content-card-list">

              {itemList
                .filter(nft => !nft.token_properties_mutated_v1?.hasOwnProperty('Slots'))
                .map((item, index) => <UserItems itemList={itemList} item={item} setSelectItem={setSelectItem} index={index} />
                )}

            </div>
          </div>
          <div className="actions" onClick={close}>
            <button onClick={stakeHandler}> Equip </button>
          </div>
        </div>
      )}
    </Popup>

  );
}

export default EquipCard