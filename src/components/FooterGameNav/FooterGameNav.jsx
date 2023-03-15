import React, {useEffect, useState} from 'react';
import { navMenu } from './FooterGameNavLinks';
import { Link } from 'react-router-dom';

import './footer.css';

export default function Footer() {
    const [activeLink, setActiveLink] = useState(null);

    useEffect(() => {
        const currentUrl = window.location.pathname;
        navMenu.forEach((link) => {
            if (link.url === currentUrl) {
                setActiveLink(link.url);
            }
        });
    }, []);

    return (
        <div className="footer">
            <nav>

                    <div className="nav-list">
                        <ul>
                            {navMenu.map((link) => (
                                <React.Fragment key={link.url}>
                                    <Link to={link.url} className={activeLink === link.url && 'active'}>
                                        <li>
                                            <img src={link.icon} alt={link.title} />
                                            {link.title}
                                        </li>
                                    </Link>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>

            </nav>
        </div>
    );
}
