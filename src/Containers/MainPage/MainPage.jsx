import React, { useContext } from "react";
import { UALContext } from "ual-reactjs-renderer";

import './main.css'


const MainPage = () => {

    const { showModal } = useContext(UALContext);


    const handleLogin = () => {
        showModal();
    };

   return(

       <main className="main">
              <div className="main-btn">
                  <button onClick={handleLogin} className="btn">START PLAY</button>
              </div>
       </main>
   )
}

export default MainPage;