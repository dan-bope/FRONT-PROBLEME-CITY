import React, { useState } from 'react';
import Mairin from "./Mairin";
import Mairup from "./Mairup";

const Logbis = (props) => {
    // Model d'inscription
    const [signUpModal, setSignUpModal] = useState(props.signup);
    // Model de connexion
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register"){
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login"){
            setSignUpModal(false);
            setSignInModal(true);
        }
    };

    return (
        <div className="connection-from">
            <div className="form-container">
                <ul>
                    <li onClick={handleModals}
                        id="register"
                        className={signUpModal ? "active-btn" : null}
                    >
                        S'inscrire
                    </li>
                    <li onClick={handleModals}
                        id="login"
                        className={signInModal ? "active-btn" : null}
                    >
                        Se connecter
                    </li>
                </ul>
                {signUpModal && <Mairup/>}
                {signInModal && <Mairin/>}
            </div>
        </div>
    );
};

export default Logbis;