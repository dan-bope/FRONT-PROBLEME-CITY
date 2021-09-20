import React from 'react';
import Logbis from "../components/Logbis";




const ProfilMairie = () => {

    return (
        <div className="profil-page">
                <div className="log-container">
                    <Logbis  mairin={false} mairup={true}/>
                    <div className="img-container">
                        <img src="./img/pli-social3.png" alt="img-log"/>
                    </div>
                </div>
        </div>
    );
};

export default ProfilMairie;