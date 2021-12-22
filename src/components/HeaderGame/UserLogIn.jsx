import React, { useContext } from 'react';
// import { useNavigate } from "react-router-dom";

import { UALContext } from "ual-reactjs-renderer";
import { useApp } from "../../Data/AppContext";

import wax from "../../images/wax.png";

const WaxLogo = () => {
    // const history = useNavigate();

    const { showModal, logout } = useContext(UALContext);
    const { userData, isAuthenticated, userLogoutHandler } = useApp();
    console.log(userData)
    const userLogout = () => {
        logout();
        userLogoutHandler();
    }

    const handleLogin = () => {
        // history.push('/');
        showModal();
    };


    if (!isAuthenticated) {
        return (
            <div className="header-user">
                <div className="money">
                    <p><img src={wax} alt="wax" /><span className="wax" onClick={handleLogin}>Log In</span></p>
                </div>
            </div>
        )
    }

    return (
        <div className="header-user">
            <div className="money">
                <p><span className="rtp">100500 RTP</span>($111)</p>
                <p><img src={wax} alt="wax" /><span className="wax login">{ userData?.accountName } </span><span className="logout" onClick={userLogout}> / Log Out</span></p>
            </div>
        </div>
    )
}

export default WaxLogo;