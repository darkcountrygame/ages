import React, {useContext} from 'react';
import Popup from 'reactjs-popup';
import { UALContext } from "ual-reactjs-renderer";
import { toast } from "react-toastify";

import closeImg from '../images/close.png'
import leftImg from '../images/neolithic_illustration.png'
import itemsImg from '../images/hunters_lodge.png'

import { newEra } from '../Services'

import './newera.css'



export default () => {
    const { activeUser } = useContext(UALContext);

    const newEraHandler = () => {
        newEra({ activeUser })
            .then(() => {
                toast.success('Success')
            })
            .catch((e) => {
                toast.error(e.message)
            })

    }

    return (
        <Popup
            trigger={<button>Advance to New Era</button>}
            modal
            nested
            className={'new-era-popup'}
        >
            {close => (
                <div className="modal newera">
                    <img className="close" src={closeImg} alt="close" onClick={close}/>
                    <div className="header-modal"> New Era </div>
                    <div className="content-era">
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
                        <button onClick={newEraHandler}>Advance to New Era</button>
                    </div>
                </div>
            )}
        </Popup>

    );
}