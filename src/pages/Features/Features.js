import React, { useState, useEffect } from 'react';

import './Features.scss';
import NavBar from "../../components/NavBar/NavBar";

const Features = () => {
    const [mainImg, setMainImg] = useState('features_container_main_img');
    const images = [
        'features_container_main_img',
        'features_2_container_main_img',
        'features_3_container_main_img',
        'features_4_container_main_img',
        'features_5_container_main_img'
    ];
    const delay = 2000; // 2 seconds

    useEffect(() => {
        const interval = setInterval(() => {
            const currentIndex = images.indexOf(mainImg);
            const nextIndex = (currentIndex + 1) % images.length;
            setMainImg(images[nextIndex]);
        }, delay);
        return () => clearInterval(interval);
    }, [mainImg]);

    return (
        <div className="features_container">
            <NavBar />
            <div className="features_container_content">
                <div className={mainImg}></div>
                <div className="features_1">
                    <div className="features_1_text">
                        <h5>Workplaces</h5>
                        <p>Game starts in the Prehistoric era, where 4 basic workplaces are available</p>
                    </div>
                </div>
                <div className="features_2">
                    <div className="features_2_text">
                        <h5>Tools</h5>
                        <p>Players can equip tools to increase workplace efficiency. Tools can be upgraded to increase their productivity</p>
                    </div>
                </div>
                <div className="features_3">
                    <div className="features_3_text">
                        <h5>Crafting</h5>
                        <p>You can craft items and tools via spending resources in the game</p>
                    </div>
                </div>
                <div className="features_4">
                    <div className="features_4_text">
                        <h5>Durability</h5>
                        <p>Each item has own durability, so the more you are using, the more it's durability drops, but you can repair your tools</p>
                    </div>
                </div>
                <div className="features_5">
                    <div className="features_5_text">
                        <h5>Energy</h5>
                        <p>User or account has certain energy that has to be charged by using meat resource</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
