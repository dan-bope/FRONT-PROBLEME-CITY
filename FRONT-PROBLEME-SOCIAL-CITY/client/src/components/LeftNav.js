import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="ico,s">
                <div className="icons-bis">
                    <NavLink to="/" exact activeClassName="active-left-nav">
                        <img src="./img/icons/accueil.png" alt="home"/>
                    </NavLink>
                    <br/>
                    {/*
                    <NavLink to="/trending" exact activeClassName="active-left-nav">
                        <img src="./img/icons/rocket3.png" alt="home"/>
                    </NavLink>
                    <br/>
                    */}
                    <NavLink to="/profil" exact activeClassName="active-left-nav">
                        <img src="./img/icons/profil.png" alt="home"/>
                    </NavLink>
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;