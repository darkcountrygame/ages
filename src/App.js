import React from 'react';
import Fullpage, { FullPageSections, FullpageSection } from '@ap.cx/react-fullpage';

import Main from "./pages/Main/Main";
import Features from "./pages/Features/Features";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import RoadMap from "./pages/RoadMap/RoadMap";
import Tokenomics from "./pages/Tokenomics/Tokenomics";
import NFTs from "./pages/NFTs/NFTs";
import Footer from "./components/Footer/Footer";

import {sectionsStyles} from './pages/sectionsStyles'

import './App.scss';

const App = () => {
    return (
        <>
            <Fullpage>
                <FullPageSections>
                    <FullpageSection style={sectionsStyles.section1}>
                        <Main />
                    </FullpageSection>
                    <FullpageSection style={sectionsStyles.section2}>
                        <div style={sectionsStyles.section2Before}>
                            <Features />
                        </div>
                    </FullpageSection>
                    <FullpageSection style={sectionsStyles.section3}>
                        <div style={sectionsStyles.section3Before}>
                            <HowItWorks />
                        </div>
                    </FullpageSection>
                    <FullpageSection style={sectionsStyles.section4}>
                        <div style={sectionsStyles.section3Before}>
                            <RoadMap />
                        </div>
                    </FullpageSection>
                    <FullpageSection style={sectionsStyles.section5}>
                        <div style={sectionsStyles.section5Before}>
                            <Tokenomics />
                        </div>
                    </FullpageSection>
                    <FullpageSection style={sectionsStyles.section6}>
                        <NFTs />
                        <Footer />
                    </FullpageSection>
                </FullPageSections>
            </Fullpage>
        </>
    );
};

export default App;