import React, { useEffect, useState } from 'react';
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {getUser} from "./actions/user.actions";

const App = () => {
    const [uid, setUid] = useState(null);
    // A chaque fois qu'on va lancer APP,
    // nous allons vérifier le token de l'utiliasateur
    const dispatch = useDispatch();

    useEffect(()=> {
       const fetchToken = async () => {
           await axios({
               method: "get",
               //Nous permet de récupérer l'id de l'utilisateur connecté
               url: `${process.env.REACT_APP_API_URL}jwtid`,
               withCredentials: true,
           })
               .then((res) => {
                   console.log(res);
                   setUid(res.data);
               })
               .catch((err) => console.log("No token"));
       };
       fetchToken();

        if (uid){
            dispatch(getUser(uid))
        }
    },[uid, dispatch]);


    return (
        <UidContext.Provider value={uid}>
            <Routes />
        </UidContext.Provider>
    );
};

export default App;