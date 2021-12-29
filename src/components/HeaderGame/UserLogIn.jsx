import React, { useContext } from 'react';
// import { useNavigate } from "react-router-dom";

import { UALContext } from "ual-reactjs-renderer";
import { useApp } from "../../Data/AppContext";

import wax from "../../images/wax.png";

const WaxLogo = ({waxBalance, rtpBalance}) => {
    // const history = useNavigate();
    // console.log(rtpBalance)
    const { showModal, logout } = useContext(UALContext);
    const { userData, isAuthenticated, userLogoutHandler } = useApp();

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
                <div className="crypto">
                    <p><span className="rtp">{ Number(rtpBalance.toString().replace(' RTP', '')).toFixed(4) } RTP</span>
                        ($0)
                    </p>
                    <p><span className="rtp">{ Number(waxBalance.toString().replace(' WAX', '')).toFixed(4) } WAX</span>
                        ($0)
                    </p>
                </div>
                <p><img src={wax} alt="wax" /><span className="wax login">{ userData?.accountName } </span><span className="logout" onClick={userLogout}> / Log Out</span></p>
            </div>
        </div>
    )
}

export default WaxLogo;