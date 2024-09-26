import React, {useContext, useEffect, useState} from 'react'
import {useApp} from "../../Data/AppContext";
import {toast} from "react-toastify";

import Footer from '../../components/FooterGameNav/FooterGameNav'

import {exchangeResources, fetchResources} from "../../Services";
import {UALContext} from "ual-reactjs-renderer";

import './Swap.css'




export default function Swap() {
    const { activeUser } = useContext(UALContext);
    const { rtpBalance, resourcesList, poolConfig, eraConf, setResources } = useApp();

    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(0);
    const [totalToken, setTotalToken] = useState(0);
    const [isInitialInputChange, setIsInitialInputChange] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedResourceAmount, setSelectedResourceAmount] = useState(0);
    const [selectedResource, setSelectedResource] = useState('')
    const [selectedResourceValue, setSelectedResourceValue] = useState('')


    const handleInputChange = (e) => {
        if (selectedOption) {
            setAmount(e.target.value);
        }
    };



    useEffect(() => {
        if (isInitialInputChange) {
            handleRefreshPool();
        } else {
            setIsInitialInputChange(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, isInitialInputChange]);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setSelectedResource(e.target.value)
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
        exchangeResources({activeUser, resource: selectedOption, count: amount})
            .then(() => {
                fetchResources({ account: activeUser.accountName })
                    .then(resource => setResources(resource))
                    .catch(e => console.log(e));


                toast.success('Exchanged');
            })
            .catch(e => toast.error(e.message))

    }

    const handleRefreshPool = (
        resourceAmount = amount,
        resourceMultiplier = 1,
        totalResources = poolConfig ? poolConfig.total_minted_resources : 1 ,
        totalTokens = poolConfig ? Number(poolConfig.total_minted_tokens?.split(' ')[0]) : 0,
        lastUpdate = 1678534452,
        tokenMiningRate = 0.001) => {

        const currentTime = Math.floor(Date.now() / 1000);
        const newTotalTokens = totalTokens + ((currentTime - lastUpdate) * tokenMiningRate);
        let resultSwap = ((resourceAmount * resourceMultiplier) / totalResources) * newTotalTokens
        setResult(resultSwap)
        setAmount(amount)
        setTotalToken(newTotalTokens)
    }


    const isSwapButtonDisabled = !amount.length && !selectedOption.length;


    useEffect(() => {
        if (Array.isArray(resourcesList)) {
            const selectedResourceObject = resourcesList.find(resource => resource.resource === selectedResource);
            const res = selectedResourceObject ? selectedResourceObject.amount : '';
            setSelectedResourceValue(res)
        }
    }, [resourcesList, selectedResource])


    return (
        <section className='workplace'>
            {/*<Header />*/}
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
                                            {Array.isArray(resourcesList) && resourcesList.map(({resource}) => (
                                                <option key={resource} value={resource}>{resource}</option>
                                            ))}
                                        </select>
                                        {selectedResource &&
                                            <p onClick={() => setAmount(selectedResourceValue)} className={'resource-amount'}>Amount: {selectedResourceValue}</p>
                                        }
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
                                    <p>{totalToken.toFixed(4)} RTP</p>
                                </div>
                                <div className="statistic-field">
                                    <h5>Mining rate per second:</h5>
                                    <p>{eraConf.length && eraConf[0].token_mining_rate}</p>
                                </div>

                                <button className={`swap-btn`} onClick={() => handleRefreshPool()}><p>Refresh</p></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );

}