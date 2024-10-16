import React from 'react';
import { useApp } from "../../Data/AppContext";
import { useWallet } from '@aptos-labs/wallet-adapter-react';

import AptosIcon from "../../images/AptosIcon.png";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const WaxLogo = ({ rtpBalance }) => {
    const history  = useHistory();
    const { account, disconnect } = useWallet();
    const { isAuthenticated, userLogoutHandler } = useApp();

    const handleLogout = () => {
        userLogoutHandler();
        history.push('/')
        disconnect();
       
    };

    console.log(rtpBalance);
    

    const handleLogin = () => {
        // Logic for login goes here
    };

    // Функція для скорочення адреси
    const shortenAddress = (address) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    return (
        <div className="header-user">
            <div className="money">
                {!isAuthenticated ? (
                    <p>
                        <img className='aptos_logo' src={AptosIcon} alt="wax" />
                        <span className="wax" onClick={handleLogin}>Log In</span>
                    </p>
                ) : (
                    <>
                        <div className="crypto">
                            <p><span className="rtp">{rtpBalance|| 0} APT</span></p>
                        </div>
                        <p>
                            <img className='aptos_logo' src={AptosIcon} alt="wax" />
                            <span className="wax login">
                                {account?.address ? shortenAddress(account.address) : 'Unknown User'}
                            </span>
                            <span className="logout" onClick={handleLogout}> / Log Out</span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default WaxLogo;
