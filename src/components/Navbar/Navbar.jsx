import React, {useContext} from 'react'

import { Link } from 'react-router-dom'
import { UALContext } from "ual-reactjs-renderer";

import './Navbar.css'

import {MenuItems} from './MenuItems'

export default function Navbar() {

    const { showModal } = useContext(UALContext);


    const handleLogin = () => {
        showModal();
    };

    return (
        <nav className="NavbarItem">
            <div className="navbar-left">
                <h1 className="navbar-logo">Legacy Of Ages</h1>
                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}><Link to={item.url} className={item.cName}>{item.title}</Link></li>
                        )
                    })}
                </ul>
            </div>
            <div className="navbar-right">
                <button className="btn-play" onClick={handleLogin}>Play and Earn</button>
            </div>
        </nav>
    )
}
