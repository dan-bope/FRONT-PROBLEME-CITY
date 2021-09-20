import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
    // Si l'utilisateur est connecté notre variable uid aura l'id de l'utilisateur
    const uid = useContext(UidContext);

    return (
        <div className="profil-page">
            {uid ? (
                <UpdateProfil/>
            ) : (
            <div className="log-container">
                <Log signin={false} signup={true}/>
                <div className="img-container">
                    <img src="./img/bodylogo1.png" alt="img-log"/>
                </div>
            </div>
            )}
        </div>
    );
};

export default Profil;