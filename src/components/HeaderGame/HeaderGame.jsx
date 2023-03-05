import React, {useState} from 'react'
import './header.css'

import UserLogIn from './UserLogIn'
import { useApp } from "../../Data/AppContext";

import meat from  '../../images/market-items/meat.png'
import rock from '../../images/market-items/rock.png'
import wheel from  '../../images/market-items/wheel.png'
import wood from '../../images/market-items/wood.png'
import plus from '../../images/plus.png'


export default function Header() {
    const { waxBalance, rtpBalance, resourcesList, eraConf } = useApp();



    const findResourceAmount = (resource) => {

        if (resourcesList.length){
            const foundResource = resourcesList.find(
                (res) => res.resource === resource
            );
            return foundResource?.amount || 0;
        }else {
            return 0
        }

    };


    //
    // useEffect(() => {
    //     const lastOwned = eraConf.filter(item => item.owner !== 'none' ).pop() || eraConf[0];
    //     const index = eraConf.findIndex(item => item === lastOwned);
    //     const nextIndex = index + 1 < eraConf.length ? index + 1 : 0;
    //     const nextItem = eraConf[nextIndex];
    //     const newArray = [lastOwned, nextItem];
    //
    //     setUsersCurrentEra(newArray);
    // }, [eraConf]);



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
                <div className="header-stats-bg"></div>
                <div className="header-stats">

                    <div className="header-stats__title">
                        {eraConf && (
                            <h2>{eraConf[0]?.title}</h2>
                        )}
                    </div>
                    <div className="header-stats__under">
                        <div className="header-stats__sp">
                            <span></span>
                            0 / {eraConf[1]?.cost_of_opening_era}
                        </div>
                        <div className="add">
                            <img src={plus} alt="plus" />
                        </div>
                    </div>
                </div>
                <div className="header-items">
                    <ul className="header-items_list">
                        <li><img src={meat} alt="meat" /> <span>{findResourceAmount("food")}</span></li>
                        <li><img src={rock} alt="rock" /><span>{findResourceAmount("stone")}</span></li>
                        <li><img src={wood} alt="wood" /><span>{findResourceAmount("wood")}</span></li>
                        <li><img src={wheel} alt="miles" /><span>{findResourceAmount("miles")}</span></li>
                    </ul>
                </div>
                <UserLogIn waxBalance={waxBalance} rtpBalance={rtpBalance} />
            </div>
        </header>
    )

}
