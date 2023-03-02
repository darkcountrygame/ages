import React, {useContext} from 'react';
import Popup from 'reactjs-popup';
import { useApp } from "../Data/AppContext";
import { UALContext } from "ual-reactjs-renderer";
import { toast } from 'react-toastify';



import closeImg from '../images/close.png'
import leftImg from '../images/prehistoric_illustration_.png'


import './research.css'

import { claimSciencePoints } from "../Services";


export default () => {
  const { resourcesList, spConfig } = useApp();
  const { activeUser } = useContext(UALContext);

  const pointsHandler = () => {
          claimSciencePoints( {activeUser, price: spConfig?.research_price} )
              .then(() => {
                  toast.success('Success');
              })
              .catch((e) => toast.error(e.message))
  }



  return(
      <Popup
          trigger={<button>Research {Number(spConfig?.research_price?.split(' ')[0])/1} RTP</button>}
          modal
          nested
      >
        {close => (
            <div className="modal research">
              <img className="close" src={closeImg} alt="close" onClick={close}/>
              <div className="header-modal"> Research +10 SP</div>
              <div className="content">
                <div className="research-wrapper">
                  <div className="research-left-img-modal">
                    <img src={leftImg} alt="img"/>
                  </div>
                  <div className="research-right-modal">
                    <div className="research-right-modal__header">
                      <h3>Prehistoric Age</h3>
                    </div>
                    <p>{resourcesList.science_points} / 10 000 SP</p>
                  </div>
                </div>
              </div>
              <div className="actions">
                <button onClick={pointsHandler}>OK</button>
              </div>
            </div>

        )}
      </Popup>

  );
}