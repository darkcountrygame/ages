import React , { useState, useEffect } from 'react'
import { useApp } from "../../Data/AppContext";
import Countdown from "react-countdown";

import '../Workplaces/workplaces.css'
import './research.css'



import researchLeft from '../../images/prehistoric_illustration_.png'
import researchRight from '../../images/neolithic_illustration.png'
import infoIcon from '../../images/info_btn.png'


import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'
import ResearchCard from '../../Modal/ResearchCard'
import NewEra from '../../Modal/EraModal'
import TostifyMessage from '../../components/Messages/Tostify'

export default function Research() {
    const { resourcesList, probabilityGetPoints } = useApp();
    const [timeLeftForResearch, setTimeLeftForResearch] = useState(resourcesList
        ? resourcesList.last_time_research * 1000 + (60 * 60 * 24 * 1000)
        : 0
    );

    useEffect(() => {
        if (new Date().getTime() > timeLeftForResearch) {
            const todaySeconds = new Date().getTime() / 1000;
            const lastClaimTimeSeconds = timeLeftForResearch / 1000;

            const daysDifference = (todaySeconds / 86400) - (lastClaimTimeSeconds / 86400);
            const nextDay = Math.ceil(daysDifference);

            const daysLeftToReward = nextDay - daysDifference;

            setTimeLeftForResearch(new Date().getTime() + (daysLeftToReward * 24 * 60 * 60 * 1000));
        }
    }, [timeLeftForResearch]);

    function countdownRenderer({  hours, minutes, seconds, completed }) {
        if (completed)
            return <>0d 0h 0m</>;


        return <>{ hours }h { minutes }m {seconds}s</>;
    }

    return (
        <section className='workplace'>
            <Header />
            <div className="main-workplace research">

                <div className="main-main">
                    <div className="main-title">
                        <h2>Research</h2>
                    </div>
                    <div className="container">
                        {/*<div className="close">*/}
                        {/*    <img src={close} alt="close" />*/}
                        {/*</div>*/}
                        <div className="research-wrapper">
                           <div className="research-left">
                                <div className="research-left_img">
                                    <img src={researchLeft} alt="img" />
                                </div>
                                <div className="research-left__info">
                                    <ul>
                                        <li>Research duration:
                                            <span>
                                                <Countdown
                                                date={ new Date(resourcesList.last_time_research * 1000 + (60 * 60 * 24 * 1000)) }
                                                renderer={countdownRenderer}
                                                />
                                            </span>
                                        </li>
                                        <li>Chance for success: <span>10%</span></li>
                                        <li>Total science points: <span>{ resourcesList.science_points }</span></li>
                                    </ul>
                                </div>
                                <div className="research-left__btn">
                                    <ResearchCard />
                                </div>
                                
                           </div>
                           <div className="research-right">
                                <div className="research-right__title">
                                    <img src={infoIcon} alt="info" />
                                    <h3>Neolithic Age</h3>
                                </div>
                                <div className="research-right__img">
                                    <img src={researchRight} alt="img" />
                                </div>
                                <div className="research-right__info">
                                    {resourcesList.science_points} / 10 000 SP
                                </div>
                                <div className="research-right__btn">
                                    <NewEra />
                                </div>
                           </div>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
            <TostifyMessage />
        </section>
    )
}