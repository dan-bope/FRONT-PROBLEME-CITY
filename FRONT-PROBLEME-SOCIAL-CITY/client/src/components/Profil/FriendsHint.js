import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {isEmpty} from "../Utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    // Tableau qui permet de stocker tous les suggestions d'amis
    const [friendsHint, setFriendsHint] = useState([]);

    // listes de tous les gens avec qui on est pas amis


    useEffect(() => {
        const notFriendList = () => {
            let array = [];
            // Nous allons mapper tous les utilisateurs
            // Après nous allons voir les utilisateurs qui ne sont pas amis avec celui qui serf
            usersData.map((user) => {
                if (user._id !== userData._id && !user.followers.includes(userData._id)){
                    return array.push(user._id);
                }
            });
            // Pour eviter d'avoir l'impression qu'on nous proposes les memes personnes on va donc faire un random
            array.sort(() => 0.5 - Math.random());
            if (window.innerHeight > 780){
                array.length = 4;
            } else if (window.innerHeight > 720) {
                array.length = 3;
            } else if (window.innerHeight > 615) {
                array.length = 2;
            } else if (window.innerHeight > 540) {
                array.length = 1;
            } else {
                array.length = 0;
            }
            setFriendsHint(array);
        };

       if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)){
           notFriendList();
           setIsLoading(false);
           setPlayOnce(false);
       }
    }, [usersData, userData, playOnce]);
    return (
        <div className="get-friends-container">
            <h4>Suggestions pour vous</h4>
            {isLoading ? (
                <div className="icon">
                    <i className="fas fa-spinner fa-pulse">
                    </i>
                </div>
            ) : (
                <ul>
                    {friendsHint && friendsHint.map((user) => {
                        for (let i = 0; i < usersData.length; i++){
                            if (user === usersData[i]._id){
                                return (
                                    <li className="user-hint" key={user}>
                                        <img src={usersData[i].picture} alt="user-pic"/>
                                        <p>{usersData[i].pseudo}</p>
                                        <FollowHandler idToFollow={usersData[i]._id} type={"suggestion"}/>
                                    </li>
                                )
                            }
                        }
                    })}
                </ul>
            )}
        </div>
    );
};

export default FriendsHint;