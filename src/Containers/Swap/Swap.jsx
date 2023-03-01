import React, {useEffect, useState} from 'react'
import {useApp} from "../../Data/AppContext";

import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'

import './Swap.css'


export default function Swap() {

    const { rtpBalance } = useApp();

    const [amount, setAmount] = useState('')
    const [result, setResult] = useState(0)
    const [isInitialInputChange, setIsInitialInputChange] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null)

    const handleInputChange = (e) => {
        setAmount(e.target.value);
    }

    const calculateResult = () => {
        const res_multiplier = 1;
        const total_resources = 2090;
        const mined_tokens = 139.8852;

        if (amount === 0 || amount === '') {
            setResult(0);
        } else {
            const result = (amount * res_multiplier / total_resources) * mined_tokens;
            setResult(result);
        }
    }

    useEffect(() => {
        if (isInitialInputChange) {
            calculateResult();
        } else {
            setIsInitialInputChange(true);
        }
    }, [amount]);


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
                                <input placeholder={0} type="text" onChange={handleInputChange} />
                                <div className={'options'}>
                                    <select className={'resource-block'} name="Select token">
                                        <option disabled selected value="">Select token</option>
                                        <option value="value1">food</option>
                                        <option value="value2" selected>stone</option>
                                        <option value="value3">wood</option>
                                        <option value="value3">wheel</option>
                                    </select>
                                    <p className={'balance'}>{selectedOption}</p>
                                </div>
                            </div>
                            <div className="swiper-field">
                                <p className={'result'}>{result}</p>
                                <div className="token-block">
                                     <p>RTP</p>
                                    <p className={'balance'}>Balance: {rtpBalance}</p>
                                </div>
                            </div>
                            <div className="swap-btn"><p>Swap</p></div>
                        </div>
                        <div className="statistic">
                            <div className="statistic-title">
                                <h4>Statistic:</h4>
                            </div>
                            <div className="statistic-field">
                                <h5>Total amount of mined resources:</h5>
                                <div className={'resource'}>
                                    <p>870,753,890</p>
                                </div>
                            </div>
                            <div className="statistic-field">
                                <h5>Total mined tokens:</h5>
                                    <p>9,753,890 RTP</p>
                            </div>
                            <div className="statistic-field">
                                <h5>Mining rate per second:</h5>
                                    <p>1,890 RTP</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}