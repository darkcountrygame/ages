import React, {useContext} from 'react';
import Popup from 'reactjs-popup';
import { useApp } from "../Data/AppContext";
import { UALContext } from "ual-reactjs-renderer";
import { toast } from 'react-toastify';



import closeImg from '../images/close.png'
import leftImg from '../images/prehistoric_illustration_.png'


import './research.css'

import { claimSciencePoints } from "../Services";


// eslint-disable-next-line import/no-anonymous-default-export
export default ({countdownCompleted, setCountdownCompleted, setCountdownKey}) => {
  const { spConfig, totalSp, eraConf } = useApp();
  const { activeUser } = useContext(UALContext);

  const pointsHandler = (close) => {
          claimSciencePoints( {activeUser, price: spConfig?.research_price} )
              .then(() => {
                  setCountdownCompleted(false)
                  close()
                  setCountdownKey(prevKey => prevKey + 1);
                  toast.success('Success');
              })
              .catch((e) => toast.error(e.message))
  }



  return(
      <Popup
          trigger={<button disabled={countdownCompleted}>Research {Number(spConfig?.research_price?.split(' ')[0])} RTP</button>}
          modal
          nested
          className={'research-card'}
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
                        {eraConf && (
                            <h3>{eraConf[0]?.title}</h3>
                        )}
                    </div>
                    <p>{ totalSp.science_points ?? 0 } / {eraConf[1]?.cost_of_opening_era}</p>
                  </div>
                </div>
              </div>
              <div className="actions">
                <button onClick={() => pointsHandler(close)}>OK</button>
              </div>
            </div>

        )}
      </Popup>

  );
}