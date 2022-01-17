import React from 'react';
import Popup from 'reactjs-popup';


import closeImg from '../images/close.png'


import UserItems from '../components/UserWorkplace/UserItems'

import './equip.css'


const EquipCard = ({ itemList, setSelectItem, stakeHandler, title }) => {

  // const stakeHandler = () => {
  //   stakeWp({ activeUser })
  // }


  return (


      <Popup
          trigger={<button className="add-workplace" onClick={stakeHandler}> { title } </button>}
          modal
          nested
      >
        {close => (
            <div className="modal equip">
              <img className="close" src={closeImg} alt="close" onClick={close}/>
              <div className="header-modal"> Equip Card </div>
              <div className="content">
                <div className="content-card-list">

                    {itemList.map( item => (item.schema.schema_name === 'workplace' ? <UserItems itemList={itemList} item={item} setSelectItem={setSelectItem}/>
                            :
                            console.log(item.schema.schema_name)
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