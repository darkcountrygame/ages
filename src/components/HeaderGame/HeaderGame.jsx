import React from 'react'
import './header.css'

import UserLogIn from './UserLogIn'


import meat from  '../../images/market-items/meat.png'
import rock from '../../images/market-items/rock.png'
import wheel from  '../../images/market-items/wheel.png'
import wood from '../../images/market-items/wood.png'
import wax from '../../images/wax.png'
import plus from '../../images/plus.png'

const modalAnchor = () => {
    console.log('click');
}



export default function Header() {
    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="header-stats">
                    <div className="header-stats__title">
                        <h2>Prehistoric age</h2>
                    </div>
                    <div className="header-stats__under">
                        <div className="header-stats__sp">
                            <span></span>
                            5 000 / 10 000
                        </div>
                        <div className="add">
                            <img src={plus} alt="plus" />
                        </div>
                    </div>
                </div>
                <div className="header-items">
                    <ul className="header-items_list">
                        <li><img src={meat} alt="meat" /> <span>25 000</span></li>
                        <li><img src={rock} alt="rock" /> <span>25 000</span></li>
                        <li><img src={wheel} alt="wheel" /> <span>25 000</span></li>
                        <li><img src={wood} alt="wood" /> <span>25 000</span></li>
                    </ul>
                </div>
                <UserLogIn />
            </div>
        </header>
    )
}
