import React from 'react';
import Popup from 'reactjs-popup';


import closeImg from '../images/close.png'


import UserItems from '../components/UserWorkplace/UserItems'

import './equipwp.css'


const EquipCard = ({ itemList, setSelectItem, stakeHandler, title }) => {

  // const stakeHandler = () => {
  //   stakeWp({ activeUser })
  // }

  return (


      <Popup
          trigger={<button onClick={stakeHandler}> { title } </button>}
          modal
          nested
      >
        {close => (
            <div className="modal equipwp">
              <img className="close" src={closeImg} alt="close" onClick={close}/>
              <div className="header-modal"> Equip Card </div>
              <div className="content">
                <div className="content-card-list">
                    {itemList.map( item => (item.schema.schema_name === 'workplace' ? <UserItems itemList={itemList} item={item} setSelectItem={setSelectItem}/>
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