import React from 'react';
import './Navigation.css';
import ManaratPhoto from './../../assets/Manarat.jpg'

const Navigation = () => {


    return (
        <div >
            <div className="nav br3 ">
                <input type="checkbox" id="nav-check" />
                <div className="nav-header">
                    <div className="nav-title  br4 bb bw1">
                        {/* logo */}
                        <img style={{ borderRadius: '0.7rem', border: '2px solid gold' }} src={ManaratPhoto} height='100%' width='100%' alt="" />
                    </div>
                </div>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>

                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#coktails">Cocktails</a>
                    <a href="#playgame">Play Game</a>
                    <a href="#login">Log In</a>


                </div>
            </div>

        </div>
    );

}
export default Navigation;
