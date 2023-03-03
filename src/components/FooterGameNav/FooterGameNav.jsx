import React from 'react';
import { navMenu } from './FooterGameNavLinks';
import { Link } from 'react-router-dom';

import './footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <nav>
                <div className="container">
                    <div className="nav-list">
                        <ul>
                            {navMenu.map((link) => (
                                <React.Fragment key={link.url}>
                                    <Link to={link.url}>
                                        <li>
                                            <img src={link.icon} alt={link.title} />
                                            {link.title}
                                        </li>
                                    </Link>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
