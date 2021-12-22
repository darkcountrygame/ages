import React from 'react'
import '../Workplaces/Workplaces'
import './inventory.css'



import close from '../../images/close.png'
import meat from '../../images/market-items/meat.png'
import wood from '../../images/market-items/wood.png'
import rock from '../../images/market-items/rock.png'
import wheel from '../../images/market-items/wheel.png'
import meatBig from '../../images/food_art.png'
import woodBig from '../../images/wood_art.png'
import rockBig from '../../images/stone_art.png'
import whealBig from '../../images/miles_art.png'


import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'


export default function Inventory() {
    return (
        <section className='workplace'>
        <Header />
        <div className="main-workplace inventory">
        {/* <div className="main-wrapper"> */}
       
             <div className="main-main">
                 <div className="main-title">
                     <h2>Inventory</h2>
                 </div>
                 <div className="container">
                     <div className="close">
                         <img src={close} alt="close" />
                     </div>
                     <div className="main-main-wrapper">
                     <div className="main-main-contant">
                         <div className="main-main-list">
                             <div className="main-main-item">
                                 <div className="inventory-item__title">
                                     <h4>Food</h4>
                                 </div>
                                 <div className="inventory-img">
                                     <img src={meatBig} alt="img" />
                                 </div>
                                 <div className="inventory-info">
                                     <img src={meat} alt="img" />
                                     <span>25 000</span>
                                 </div>
                                 <div className="inventory-btn">
                                     <a href="#">Sell</a>
                                 </div>
                             </div>
                             <div className="main-main-item">
                                 <div className="inventory-item__title">
                                     <h4>Wood</h4>
                                 </div>
                                 <div className="inventory-img wood">
                                     <img src={woodBig} alt="img" />
                                 </div>
                                 <div className="inventory-info">
                                     <img src={wood} alt="img" />
                                     <span>25 000</span>
                                 </div>
                                 <div className="inventory-btn">
                                     <a href="#">Sell</a>
                                 </div>
                             </div>


                             <div className="main-main-item">
                                 <div className="inventory-item__title">
                                     <h4>Stone</h4>
                                 </div>
                                 <div className="inventory-img stone">
                                     <img src={rockBig} alt="img" />
                                 </div>
                                 <div className="inventory-info">
                                     <img src={rock} alt="img" />
                                     <span>25 000</span>
                                 </div>
                                 <div className="inventory-btn">
                                     <a href="#">Sell</a>
                                 </div>
                             </div>

                             <div className="main-main-item">
                                 <div className="inventory-item__title">
                                     <h4>Transport</h4>
                                 </div>
                                 <div className="inventory-img">
                                     <img src={whealBig} alt="img" />
                                 </div>
                                 <div className="inventory-info">
                                     <img src={wheel} alt="img" />
                                     <span>25 000</span>
                                 </div>
                                 <div className="inventory-btn">
                                     <a href="#">Sell</a>
                                 </div>
                             </div>


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
