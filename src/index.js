import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { App } from './Containers';
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";


const wallets  = [
    new PetraWallet(),
    new MartianWallet(),
]

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true} optInWallets={["Petra"]}>
        <App />
    </AptosWalletAdapterProvider>
);
