import React, {useEffect} from 'react'
import './header.css'

import UserLogIn from './UserLogIn'
import { UALContext } from "ual-reactjs-renderer";
import { useApp } from "../../Data/AppContext";

import meat from  '../../images/market-items/meat.png'
import rock from '../../images/market-items/rock.png'
import wheel from  '../../images/market-items/wheel.png'
import wood from '../../images/market-items/wood.png'
import plus from '../../images/plus.png'


export default function Header() {

    const { waxBalance, rtpBalance, isAuthenticated, resourcesList, eraConf } = useApp();

   useEffect(() => {
       console.log(eraConf)
   }, [eraConf])

    // if(!isAuthenticated) {
    //     return (
    //         <header className="header">
    //             <div className="header-wrapper">
    //                 <div className="header-stats">
    //                     <div className="header-stats__title">
    //                         <h2>Prehistoric age</h2>
    //                     </div>
    //                     <div className="header-stats__under">
    //                         <div className="header-stats__sp">
    //                             <span></span>
    //                             { resourcesList.science_points } / 10 000
    //                         </div>
    //                         <div className="add">
    //                             <img src={plus} alt="plus" />
    //                         </div>
    //                     </div>
    //                 </div>
    //
    //                 <UserLogIn waxBalance={waxBalance} rtpBalance={rtpBalance} />
    //             </div>
    //         </header>
    //     )
    // }

    return(
        <header className="header">
            <div className="header-wrapper">
                <div className="header-stats">
                    <div className="header-stats__title">
                        <h2>Prehistoric age</h2>  {/*{ eraConf.map( era => era.title) }*/}
                    </div>
                    <div className="header-stats__under">
                        <div className="header-stats__sp">
                            <span></span>
                            { resourcesList.science_points } / 10 000
                        </div>
                        <div className="add">
                            <img src={plus} alt="plus" />
                        </div>
                    </div>
                </div>
                <div className="header-items">
                    <ul className="header-items_list">
                        <li><img src={meat} alt="meat" /> <span>{ resourcesList.food }</span></li>
                        <li><img src={rock} alt="rock" /> <span>{ resourcesList.stone }</span></li>
                        <li><img src={wood} alt="wood" /> <span>{ resourcesList.wood }</span></li>
                        <li><img src={wheel} alt="miles" /> <span>{ resourcesList.miles }</span></li>
                    </ul>
                </div>
                <UserLogIn waxBalance={waxBalance} rtpBalance={rtpBalance} />
            </div>
        </header>
    )

}
