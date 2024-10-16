import React, {useEffect, useState} from 'react'
import { useApp } from "../../Data/AppContext";
import Countdown from "react-countdown";

import './research.css'



import researchLeft from '../../images/prehistoric_illustration_.png'
import researchRight from '../../images/neolithic_illustration.png'
import infoIcon from '../../images/info_btn.png'


import Footer from '../../components/FooterGameNav/FooterGameNav'
import ResearchCard from '../../Modal/ResearchCard'
import NewEra from '../../Modal/EraModal'
import TostifyMessage from '../../components/Messages/Tostify'

export default function Research() {


    const { probabilityPoints, totalSp, spConfig, eraConf } = useApp();
    const [countdownCompleted, setCountdownCompleted] = useState(false);
    const [countdownKey, setCountdownKey] = useState(0);
    const [isNewEraAvailable, setIsNewEraAvailable] = useState(true)
    const [spPercentage, setSpPercentage] = useState('0%')

    function countdownRenderer({  hours, minutes, seconds, completed }) {
        if (completed) {
            setCountdownCompleted(false);
            return <>0h 0m 0s</>;
        }

        if ( minutes && seconds  === 0)
            return <>0h 0m 0s</>;

        setCountdownCompleted(true);
        return <>{ hours }h { minutes }m { seconds }s</>;
    }

    
    useEffect(() => {
        const calculateProgressPercentage = () => {
            console.log(totalSp.science_points ?? 0)
            const percentage = (totalSp.science_points * 100 / eraConf[1]?.cost_of_opening_era);
            setSpPercentage(`${percentage}%`);
        }
        
        calculateProgressPercentage()
    },[eraConf, totalSp.science_points])
   

    useEffect(() => {
        if (totalSp.science_points <= eraConf[1]?.cost_of_opening_era) {
            setIsNewEraAvailable(true)
        } else {
            setIsNewEraAvailable(false)
        }
    }, [totalSp, eraConf])

    return (
        <section className='workplace'>
            {/*<Header />*/}
            <div className="main-workplace research">

                <div className="main-main">
                    <div className="main-title">
                        <h2>Craft</h2>
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
                                                  key={countdownKey}
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
                               <div className={`research-left__btn ${countdownCompleted ? 'completed' : ''}`}>
                                   <ResearchCard
                                       countdownCompleted={countdownCompleted}
                                       setCountdownCompleted={setCountdownCompleted}
                                       setCountdownKey={setCountdownKey}
                                   />
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
                               <div className="progress-bar-block">
                                   <div className="progress-bar">
                                       <span style={{width: spPercentage}}></span>
                                   </div>
                                   <div className="research-right__info">
                                       <p>
                                           { totalSp.science_points ?? 0 } / {eraConf[1]?.cost_of_opening_era} SP
                                       </p>
                                   </div>
                               </div>
                                <div className="research-right__btn">
                                    <NewEra isNewEraAvailable={isNewEraAvailable} />
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