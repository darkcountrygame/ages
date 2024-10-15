import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import LOALogo from '../../images/legacy of ages logo.png'
import './main.css';

const MainPage = () => {
    const { connect } = useWallet();

    const handleLogin = async () => {
        try {
            await connect('Petra');
            console.log('Wallet connected');
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    return (
        <main className="main">
            <div className="main-btn">
                <div className="logo">
                    <img src={LOALogo} alt="" />
                </div>
                <button onClick={handleLogin} className="btn">
                    START PLAY
                </button>
            </div>
        </main>
    );
};

export default MainPage;
