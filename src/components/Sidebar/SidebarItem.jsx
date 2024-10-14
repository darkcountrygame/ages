import React from "react";
import './sidebar.css';
import { Link } from 'react-router-dom';

export default function Sidebar({ item, index, setSelectedWorkPlace, selectedWorkPlace }) {

    const isActive = selectedWorkPlace.token_name === item.token_name;

    return (
        <div key={index}>
            <Link to={`/workplace/${item.token_name.replace('#', '')}`}>
                <div 
                    className={`main-workplace-sidebar__item ${isActive ? 'wp-active' : ''}`} 
                    onClick={() => setSelectedWorkPlace(item)}
                >
                    {item && <img src={item.token_uri} alt="img" />}
                </div>
            </Link>
        </div>
    );
}
