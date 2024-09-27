import React from 'react';


import './NavBar.scss';

const NavBar = () => {

    return (
        <div className="navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Features</a></li>
                <li><a href="/">How it works</a></li>
                <li><a href="/">Roadmap</a></li>
                {/* <li><a href="/tokenomics">Tokenomics</a></li> */}
                <li><a href="/">NFTs</a></li>
            </ul>
        </div>
    );
};

export default NavBar;
