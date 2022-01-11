import React from 'react';
import Popup from 'reactjs-popup';


import closeImg from '../images/close.png'


import UserItems from '../components/UserWorkplace/UserItems'

import './equip.css'


const EquipCard = ({ itemList, setSelectItem, stakeHandler }) => {

  // const stakeHandler = () => {
  //   stakeWp({ activeUser })
  // }

  return (


      <Popup
          trigger={<button onClick={stakeHandler}> Equip </button>}
          modal
          nested
      >
        {close => (
            <div className="modal equip">
              <img className="close" src={closeImg} alt="close" onClick={close}/>
              <div className="header-modal"> Equip Card</div>
              <div className="content">
                <div className="content-card-list">
                  {itemList.map(item => (item.schema.schema_name === 'tool' ?
                          <UserItems itemList={itemList} item={item} setSelectItem={setSelectItem}/>
                          :
                          false
                  ))}
                </div>
              </div>
              <div className="actions" onClick={close}>
                <button onClick={stakeHandler}>Equip</button>
              </div>
            </div>
        )}
      </Popup>

  );
}

export default EquipCard