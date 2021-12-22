import React from 'react'

import '../Workplaces/workplaces.css'
import './research.css'



import close from '../../images/close.png'
import researchLeft from '../../images/prehistoric_illustration_.png'
import researchRight from '../../images/neolithic_illustration.png'
import infoIcon from '../../images/info_btn.png'


import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'
import ResearchCard from '../../Modal/ResearchCard'

export default function Research() {
    return (
        <section className='workplace'>
            <Header />
            <div className="main-workplace research">
                {/* <div className="main-wrapper"> */}

                <div className="main-main">
                    <div className="main-title">
                        <h2>Research</h2>
                    </div>
                    <div className="container">
                        <div className="close">
                            <img src={close} alt="close" />
                        </div>
                        <div className="research-wrapper">
                            <div className="research-left">
                                <div className="research-img">
                                    <img src={researchLeft} alt="img" />
                                </div>
                                <div className="research-info">
                                    <ul>
                                        <li>Research duration: 24 H</li>
                                        <li>Chance for success: 10%</li>
                                        <li>Total science points: 10</li>
                                    </ul>
                                </div>
                                <div className="research-btn">
                                    <ResearchCard />
                                </div>
                            </div>
                            <div className="research-right">
                                <div className="research_r_title">
                                    <h3>Copper Age</h3>
                                    <img src={infoIcon} alt="info" />
                                </div>
                                <div className="research_r_img">
                                    <img src={researchRight} alt="img" />
                                </div>
                                <div className="research_r_stats">
                                    <span>5 000 / 10 000 SP</span>
                                </div>
                                <div className="research_r_btn">
                                    <button disabled>Advance to New Era</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* </div> */}

            </div>
            <Footer />
        </section>
    )
}