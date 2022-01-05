import React from 'react'
import './inventory.css'
import { useApp } from "../../Data/AppContext";



import meat from '../../images/market-items/meat.png'
import wood from '../../images/market-items/wood.png'
import rock from '../../images/market-items/rock.png'
import wheel from '../../images/market-items/wheel.png'
import meatBig from '../../images/food_art.png'
import woodBig from '../../images/wood_art.png'
import rockBig from '../../images/stone_art.png'
import wheelBig from '../../images/miles_art.png'


import Header from '../../components/HeaderGame/HeaderGame'
import Footer from '../../components/FooterGameNav/FooterGameNav'
import InventoryModal from '../../Modal/InventoryModal'


export default function Inventory() {

    const { resourcesList } = useApp();



    return (
        <section className='workplace'>
        <Header />
        <div className="main-workplace inventory">

             <div className="main-main">
                 <div className="main-title">
                     <h2>Market</h2>
                 </div>
                 <div className="container">
                     <div className="main-main-wrapper">
                     <div className="main-main-contant">
                         <div className="main-main-list">
                            
                            <div className="inventory-item">
                                <div className="inventory-item__title">
                                    <h4>Food</h4>
                                </div>
                                <div className="inventory-item__img">
                                    <img src={meatBig} alt="food" />
                                </div>
                                <div className="inventory-item__info">
                                    <img src={meat} alt="food" />
                                    <span>{ resourcesList.food }</span>
                                </div>
                                <div className="inventory-item__btn">
                                    <InventoryModal img={meat} resource={'food'} />
                                </div>
                            </div>

                            <div className="inventory-item">
                                <div className="inventory-item__title">
                                    <h4>Wood</h4>
                                </div>
                                <div className="inventory-item__img">
                                    <img src={woodBig} alt="food" />
                                </div>
                                <div className="inventory-item__info">
                                    <img src={wood} alt="food" />
                                    <span>{ resourcesList.wood }</span>
                                </div>
                                <div className="inventory-item__btn">
                                    <InventoryModal img={wood} resource={'wood'} />
                                </div>
                            </div>

                            <div className="inventory-item">
                                <div className="inventory-item__title">
                                    <h4>Stone</h4>
                                </div>
                                <div className="inventory-item__img">
                                    <img src={rockBig} alt="food" />
                                </div>
                                <div className="inventory-item__info">
                                    <img src={rock} alt="food" />
                                    <span>{ resourcesList.stone }</span>
                                </div>
                                <div className="inventory-item__btn">
                                    <InventoryModal img={rock} resource={'stone'} />
                                </div>
                            </div>

                            <div className="inventory-item">
                                <div className="inventory-item__title">
                                    <h4>Miles</h4>
                                </div>
                                <div className="inventory-item__img">
                                    <img src={wheelBig} alt="food" />
                                </div>
                                <div className="inventory-item__info">
                                    <img src={wheel} alt="food" />
                                    <span>{ resourcesList.miles }</span>
                                </div>
                                <div className="inventory-item__btn">
                                    <InventoryModal img={wheel} resource={'miles'} />
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
                 </div>
             </div>
        
    </div>
    <Footer />
    </section>
    )
}
