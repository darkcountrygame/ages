import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { App } from './Containers';

import { UALProvider } from "ual-reactjs-renderer";
import { waxChain, waxAuthenticators } from "./Config/wax.config";


ReactDOM.render(
    <UALProvider
        chains={[waxChain]}
        authenticators={waxAuthenticators}
        appName={'RTP'}
    >
        <App />
    </UALProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

