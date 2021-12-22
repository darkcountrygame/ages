import React, { useContext } from "react";
import { NavLink } from 'react-router-dom'
// import { UALContext } from "ual-reactjs-renderer";
// import { useApp } from "../../Data/AppContext";

import StartLogo from '../../images/start_logo.png'

import Navbar from '../../components/Navbar/Navbar'

import './main.css'





const MainPage = () => {
    // const { showModal } = useContext(UALContext);
    //
    // const {
    //     userData,
    //     isAuthenticated,
    // } = useApp();

   return(

       <main className="main">
           <Navbar />
           <div className="main-img"></div>
           <div className="main-up">
               <img src={StartLogo} alt="start-logo" />

               <div className="main-btn">
                   <NavLink to="/workpalces" className="btn">Start Play</NavLink>
               </div>
           </div>
       </main>
   )
}

export default MainPage;