import React, {useState} from 'react';
import axios from "axios";
import SignInForm from "../Log/SignInForm";

const Mairup = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    // Gestion du formulaire
    const handleRegister = async (e) => {
        e.preventDefault();
        // Récupération des variables
        const terms = document.getElementById('terms');
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');
        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlPassword || !terms.checked){
            if (password !== controlPassword){
                passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
            }
            if (!terms.checked){
                termsError.innerHTML = "Veuillez valider les conditions générales";
            }
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors){
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm/>
                    <span>
                    </span>
                    <h4 className="success">Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <div className="textbox">
                        <div className="textbox">
                            <label htmlFor="pseudo">Pseudo</label>
                            <br/>
                            <i className="fa fa-user fa-lg fa-fw" aria-hidden="true">
                            </i>
                            <input
                                type="text"
                                name="pseudo"
                                id="pseudo"
                                onChange={(e) => setPseudo(e.target.value)}
                                value={pseudo}
                            />
                        </div>
                        <div className="pseudo error">
                        </div>
                        <br/>
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
                        <div className="textbox">
                            <label htmlFor="password-conf">Confirmer mot de passe</label>
                            <br/>
                            <i className="fa fa-lock" aria-hidden="true">
                            </i>{' '}
                            <input
                                type="password"
                                name="password"
                                id="password-conf"
                                onChange={(e) => setControlPassword(e.target.value)}
                                value={controlPassword}
                            />
                        </div>
                        <div className="password-confirm error">
                        </div>
                        <br/>
                        <input type="checkbox" id="terms"/>
                        <label htmlFor="terms">J'accepte les conditions
                            <a href="/" target="_blank" rel="noopener noreferrer"> conditions générales
                            </a>
                        </label>
                        <div className="terms error">
                        </div>
                        <br/>
                        <input type="submit" value="Valider inscription"/>
                    </div>
                </form>
            )}
        </>
    );
};

export default Mairup;