import React from 'react'
import { navMenu } from './FooterGameNavLinks'
import { Link } from "react-router-dom";
// import Inventory from '../../Containers/Inventory/Inventory'
// import Workpalces from '../../Containers/Workplaces/Workplaces'

import './footer.css'

export default function Footer() {


    return (
        <div className="footer">
            <nav>
                <div className="container">
                    <div className="nav-list">
                        <ul>
                            {
                                navMenu.map( link => (
                                    <li>
                                        <img src={link.icon} alt={link.title} />
                                        <Link to={link.url}>{link.title}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}
