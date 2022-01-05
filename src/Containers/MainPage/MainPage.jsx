import React, { useContext } from "react";
import { UALContext } from "ual-reactjs-renderer";

import StartLogo from '../../images/start_logo.png'


import Navbar from '../../components/Navbar/Navbar'

import './main.css'





const MainPage = () => {

    const { showModal } = useContext(UALContext);


    const handleLogin = () => {
        showModal();
    };

   return(

       <main className="main">
           <Navbar />
           <div className="main-img"></div>
           <div className="main-up">
               <img src={StartLogo} alt="start-logo" />

               <div className="main-btn">
                   <button onClick={handleLogin} className="btn">Start Play</button>
               </div>
           </div>
       </main>
   )
}

export default MainPage;