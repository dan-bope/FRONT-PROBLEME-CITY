import React, {useState} from 'react';
import axios from "axios";

const Mairin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        // On prévient le comportement par defaut
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            // On lui passe une méthode
            method: "post",
            // l'url à laquel on lui fait le post
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            // On lui fait passer les valeurs
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                console.log(res)
                // resultat de la requete s'il y a erreur
                if (res.data.errors){
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    // s'il ,'ya pas d'erreur on se dirige vers l'accueil c'est à dire /
                    // On présentera un token pour signifier qu'on est connecté
                    window.location = '/trending';
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <div className="textbox">
                <div className="textbox">
                    <label htmlFor="email">Email</label>
                    <br/>
                    <i className="fa fa-envelope" aria-hidden="true">
                    </i>{' '}
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="email error">
                </div>
                <br/>
                <div className="textbox">
                    <label htmlFor="password">Mot de passe</label>
                    <br/>
                    <i className="fa fa-lock" aria-hidden="true">
                    </i>{' '}
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="password error">
                </div>
                <br/>
                <br/>
                <input type="submit" value="Se connecter"/>
            </div>
        </form>
    );
};

export default Mairin;