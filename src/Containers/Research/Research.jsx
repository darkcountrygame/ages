import React  from 'react'
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


    const { probabilityPoints, totalSp, spConfig } = useApp();


    function countdownRenderer({  hours, minutes, seconds, completed }) {
        if (completed)
            return <>0h 0m 0s</>;

        if ( minutes && seconds  == 0)
            return <>0h 0m 0s</>;


        return <>{ hours }h { minutes }m { seconds }s</>;
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
                           <div className="research-left">
                                <div className="research-left_img">
                                    <img src={researchLeft} alt="img" />
                                </div>
                                <div className="research-left__info">
                                    <ul>
                                        <li>Research duration:
                                            <span>
                                                <Countdown
                                                    date={(totalSp.last_time_research * 1000 - Date.now()) + Date.now()}
                                                renderer={countdownRenderer}
                                                />
                                            </span>
                                        </li>
                                        {probabilityPoints ?
                                                <li>Chance for success: <span>{spConfig.research_reward_rand + probabilityPoints}%</span></li>
                                                :
                                                <li>Chance for success: <span>{spConfig.research_reward_rand}%</span></li>
                                        }
                                        <li>Total science points: <span>{ totalSp.science_points ?? 0 }</span></li>
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
                                    { totalSp.science_points ?? 0 } / 10 000 SP
                                </div>
                                <div className="research-right__btn">
                                    <NewEra />
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