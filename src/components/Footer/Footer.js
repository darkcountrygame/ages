import React from 'react';

import logo from '../../images/RUSH_footer.png'
import TelegramIcon from '../../images/telegram.png'
import TwitterIcon from '../../images/twitter.png'
import copyr from '../../images/copyright.png'


import './Footer.scss';


const Footer = () => {

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-container_logo">
                    <img src={logo} alt=""/>
                </div>
                <div className="footer-container_center">
                    <button className={'footer-container_start-btn'}>
                        JOIN EARLY
                    </button>
                    <div className="copy-r">
                        <img src={copyr} alt=""/>
                        <p>Dapplica, 2023</p>
                    </div>
                </div>

                <div className="footer-container_social-media">
                    <img src={TelegramIcon} alt=""/>
                    <img src={TwitterIcon} alt=""/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;