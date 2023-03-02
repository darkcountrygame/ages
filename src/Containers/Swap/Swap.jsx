import React, {useEffect, useState} from 'react'
import {useApp} from "../../Data/AppContext";

import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'

import './Swap.css'


export default function Swap() {
    const { rtpBalance, resourcesList, poolConfig, eraConf } = useApp();
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(0);
    const [isInitialInputChange, setIsInitialInputChange] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedResourceAmount, setSelectedResourceAmount] = useState(0);


    const handleInputChange = (e) => {
        if (selectedOption) {
            setAmount(e.target.value);
        }
    };

    const calculateResult = () => {

        const res_multiplier = 1;
        const total_resources = poolConfig ? poolConfig.total_minted_resources : 1 ;
        const mined_tokens = poolConfig ? Number(poolConfig.total_minted_tokens.split(' ')[0]) : 0;

        if (amount === 0 || amount === '') {
            setResult(0);
        } else {
            const result = (amount * res_multiplier / total_resources) * mined_tokens;
            setResult(result);
        }
    };

    useEffect(() => {
        if (isInitialInputChange) {
            calculateResult();
        } else {
            setIsInitialInputChange(true);
        }
    }, [amount, calculateResult, isInitialInputChange]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        const selectedResource = resourcesList.find(
            (resource) => resource.resource === e.target.value
        );
        setSelectedResourceAmount(selectedResource?.amount || 0);
        setAmount('');
    };

    const handleInputBlur = () => {
        if (amount > selectedResourceAmount) {
            setAmount(selectedResourceAmount);
        }
    };

    const handleSwapClick = () => {
        alert('d')
    }

    const isSwapButtonDisabled = !amount.length || !selectedOption.length;

    return (
        <section className='workplace'>
            <Header />
            <div className="main-workplace swap">
                <div className="main-main">
                    <div className="main-title">
                        <h2>Swap</h2>
                    </div>
                    <div className="swap-container">
                        <div className="swap-block">
                            <div className="swiper">
                                <div className="swiper-field">
                                    <input
                                        placeholder={0}
                                        type="text"
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        value={amount}
                                        disabled={!selectedOption}
                                    />
                                    <div className={'options'}>
                                        <select className={'resource-block'} name="Select token" onChange={handleOptionChange} value={selectedOption}>
                                            <option disabled selected value="">Select token</option>
                                            {resourcesList && resourcesList.map(({resource}) => (
                                                <option key={resource} value={resource}>{resource}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="swiper-field">
                                    <p className={'result'}>{result ? result.toFixed(4) : 0}</p>
                                    <div className="token-block">
                                        <p>RTP</p>
                                        <p className={'balance'}>Balance: {rtpBalance}</p>
                                    </div>
                                </div>
                                <button className={`swap-btn ${isSwapButtonDisabled ? 'disabled' : ''}`} onClick={handleSwapClick} disabled={isSwapButtonDisabled}><p>Swap</p></button>
                            </div>
                            <div className="statistic">
                                <div className="statistic-title">
                                    <h4>Statistic:</h4>
                                </div>
                                <div className="statistic-field">
                                    <h5>Total amount of mined resources:</h5>
                                    <div className={'resource'}>
                                        <p>{poolConfig ? poolConfig.total_minted_resources : 0}</p>
                                    </div>
                                </div>
                                <div className="statistic-field">
                                    <h5>Total mined tokens:</h5>
                                    <p>{poolConfig ? poolConfig.total_minted_tokens : 0}</p>
                                </div>
                                <div className="statistic-field">
                                    <h5>Mining rate per second:</h5>
                                    <p>{eraConf.length && eraConf[0].token_mining_rate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );

}