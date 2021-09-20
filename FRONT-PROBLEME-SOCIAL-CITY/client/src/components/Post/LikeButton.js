import React,{ useContext,useEffect, useState } from 'react';
import {UidContext} from "../AppContext";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import {likePost, unlikePost} from "../../actions/post.actions";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    };
    const unlike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    };

    useEffect(() => {
        // On teste l'id de notre utilisateur est dans les posts aimé
        if (post.likers.includes(uid)){
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [uid, post.likers, liked]);
    return (
        <div className="like-container">
            {/*si l'utilisateur n'est pas connecté*/}
            {uid === null && (
                <Popup
                    trigger={<img src="./img/icons/like-vide.png" alt="like" />}
                    position={["bottom center", "bottom right", "bottom left"]}
                    closeOnDocumentClick
                >
                    <div>Connectez-vous avant liker ce post !</div>
                </Popup>
            )}
            {/*Si l'utilisateur est connecté*/}
            {uid && liked === false && (
                <img src="./img/icons/like-vide.png" onClick={like} alt="like" />
            )}
            {/*si like est sur true*/}
            {uid && liked && (
                <img src="./img/icons/like.png" onClick={unlike} alt="unlike" />
            )}
            <span> <p></p> {post.likers.length} Likes </span>
        </div>
    );
};

export default LikeButton;