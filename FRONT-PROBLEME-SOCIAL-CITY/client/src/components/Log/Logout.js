import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefined"){
            cookie.remove(key, { expires: 1});
        }
    };

    const logout = async () => {
        await axios({
            method: 'get',
            // On rétire le cookie en back
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err))
        //On le retire aussi en front en supprimant la clé Jwt
        // Intérogeons la page pour vérifier si le cookie est encore present
        window.location = "/";
    };
    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout"/>
        </li>
    );
};

export default Logout;