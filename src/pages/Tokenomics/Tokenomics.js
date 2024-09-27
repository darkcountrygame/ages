import React from 'react';
import NavBar from "../../components/NavBar/NavBar";


import startScreen from '../../images/screens/start.jpg';
import inventoryScreen from '../../images/screens/Inventory.jpg';
import upgrade1Screen from '../../images/screens/Upgrade1.jpg';
import upgrade2Screen from '../../images/screens/Upgrade2.jpg';
import workplaces_miningScreen from '../../images/screens/workplaces_mining.jpg';

import './Tokenomics.scss';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const Tokenomics = () => {


    return (
        <div className="screens_container">
            <NavBar />
            <div className="screens_content">
                <Carousel>
                    <div>
                        <img src={startScreen} alt="Start Screen" />
                    </div>
                    <div>
                        <img src={inventoryScreen} alt="Inventory Screen" />
                    </div>
                    <div>
                        <img src={upgrade1Screen} alt="Upgrade 1 Screen" />
                    </div>
                    <div>
                        <img src={upgrade2Screen} alt="Upgrade 1 Screen" />
                    </div>
                    <div>
                        <img src={workplaces_miningScreen} alt="Upgrade 1 Screen" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Tokenomics;
