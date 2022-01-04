import React, {useContext, useState} from 'react';
import Popup from 'reactjs-popup';
import { useApp } from "../Data/AppContext";
import { UALContext } from "ual-reactjs-renderer";


import closeImg from '../images/close.png'


import './inventory.css'

import {exchangeResources, fetchResources} from "../Services";


export default ({ img, resource }) => {
    const {
        setResources
    } = useApp();

    const { activeUser } = useContext(UALContext);

    const [numberResources, setNumberResources] = useState('')

    const exchangeHandler = () => {
        exchangeResources( {activeUser, resource , count: +numberResources} )
            .then(() => {
                fetchResources({ account: activeUser.accountName })
                    .then(resource => setResources(resource))
                    .catch(e => console.log(e));


                // toast.success('Claimed');
            })
            // .catch(e => toast.error(e.message))
            .catch(e => console.error(e))
    }

    console.log(numberResources)

    return (
        <Popup
            trigger={<button>Sell</button>}
            modal
            nested
        >

            {close => (

                <div className="modal exchange">
                    <img className="close" src={closeImg} alt="close" onClick={close}/>
                    <div className="header-modal"> Sell </div>
                    <div className="content">
                        <img src={img} alt="img" />
                        <p>You can exchange resources for tokens</p>
                        <input type="number" placeholder="Number of resources" value={numberResources} onChange={(event) => setNumberResources(event.target.value)} />
                    </div>
                    <div className="actions" onClick={close}>
                        <button onClick={exchangeHandler}>Sell</button>
                    </div>
                </div>
            )}
        </Popup>
    );
}