import React from "react";
import { useHistory } from "react-router-dom";

import './main.css';

const MainPage = () => {
    const history = useHistory();

    const handleLogin = () => {
        history.push('/workplaces');
    };

    return (
        <main className="main">
            <div className="main-btn">
                <button onClick={handleLogin} className="btn">START PLAY</button>
            </div>
        </main>
    );
}

export default MainPage;
