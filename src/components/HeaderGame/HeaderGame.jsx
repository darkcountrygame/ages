import React, {useEffect, useState} from 'react'
import './header.css'

import {Link} from 'react-router-dom'

import UserLogIn from './UserLogIn'
import { useApp } from "../../Data/AppContext";

import meat from  '../../images/market-items/meat.png'
import energy from  '../../images/market-items/energy.png'
import rock from '../../images/market-items/rock.png'
import wheel from  '../../images/market-items/wheel.png'
import wood from '../../images/market-items/wood.png'
import plus from '../../images/plus.png'
import { getResources } from '../../Services';
import { useWallet } from '@aptos-labs/wallet-adapter-react';


export default function Header() {
    const { account } = useWallet();
    const { waxBalance, rtpBalance, eraConf, totalSp } = useApp();
    const [resources, setResources] = useState({

    });


    useEffect(() => {
        const fetchResources = async () => {
            await getResources({ account })
                .then((data) => {
                    setResources(data)
                })
                .catch((error) => {
                    console.log(error);
                })
        };
        
        fetchResources();
    }, [account]);

    const findResourceAmount = (resource) => {
        return resources[resource] ?? 0;
    };

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
                    <div className="header-progress-bar-block">
                        <div className="contant-bar">
                            <div className="header-progress-bar">
                                <span>0</span>
                            </div>
                            <Link to={'/craft'}>
                                <img className={'plus'} src={plus} onClick={() => {}} alt=""/>
                            </Link>
                        </div>

                        <div className="progress-bar-info">
                            <p>{ totalSp.science_points ?? 0 } / {eraConf[1]?.cost_of_opening_era} SP</p>
                        </div>
                    </div>
                </div>
                <div className="header-items">
                    <ul className="header-items_list">
                        <li><img src={energy} alt="energy" /> <span>{findResourceAmount("energy")}</span></li>
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
