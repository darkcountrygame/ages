import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

import {MenuItems} from './MenuItems'

export default function Navbar() {
    return (
        <nav className="NavbarItem">
            <div className="navbar-left">
                <h1 className="navbar-logo">Rush to Prosperity</h1>
                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}><Link to={item.url} className={item.cName}>{item.title}</Link></li>
                        )
                    })}
                </ul>
            </div>
            <div className="navbar-right">
                <Link to="/workplaces" className="btn-play">Play and Earn</Link>
            </div>
        </nav>
    )
}
