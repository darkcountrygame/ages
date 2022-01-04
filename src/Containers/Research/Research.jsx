import React from 'react'
import { useApp } from "../../Data/AppContext";

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
    const {
        resourcesList,
    } = useApp();

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
                                        <li>Research duration: <span>24H</span></li>
                                        <li>Chance for success: <span>10%</span></li>
                                        <li>Total science points: <span>10</span></li>
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