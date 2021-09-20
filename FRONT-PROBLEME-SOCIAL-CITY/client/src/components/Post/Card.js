import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {dateParser, isEmpty} from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";
import {updatePost} from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    // Au départ on affiche pas les commentaires
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector(state => state.usersReducer);
    const userData = useSelector(state => state.userReducer);
    const dispacth = useDispatch();

    const updateItem = async () => {
        //si le texte a été modifié
        if (textUpdate){
            dispacth(updatePost(post._id, textUpdate))
        }
        //Une fois le boutton validé setIsUpdate reprend sur false
        setIsUpdated(false);
    };

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin">
                </i>
            ) : (
                <>
                    <div className="card-left">
                        <img src={
                            !isEmpty(usersData[0]) &&
                            usersData.map((user) => {
                                if (user._id === post.posterId){
                                    return user.picture;
                                }else {
                                    return null;
                                }
                            })
                            .join('')
                        } alt="poster-pic"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {
                                        !isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user._id === post.posterId){
                                                return user.pseudo;
                                            }else {
                                                return null;
                                            }
                                        })
                                            .join('')
                                    }
                                </h3>
                                {post.posterId !== userData._id && (
                                    <FollowHandler idToFollow={post.posterId} type={'card'}/>
                                )}
                            </div>
                            <span>
                                {dateParser(post.createdAt)}
                            </span>
                        </div>
                        {isUpdated === false && <p>{post.message}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                >
                                </textarea>
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem}>
                                        Valider modification
                                    </button>
                                </div>
                            </div>
                        )}
                        {post.picture && (
                            <img src={post.picture} alt="card-pic" className="card-pic"/>
                        )}

                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                                gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            >
                            </iframe>
                        )}
                        {/*Nous allons éditer ou modifier le poste di l'id de user = à l'id du post*/}
                        {/*Si onclique sur le bouton, setIsUpdated passe à true pour permettre à l'user d'editer*/}
                        {userData._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit"/>
                                </div>
                                <DeleteCard id={post._id}/>
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                {/*Au clique du commentaire notre setShowComments obtient la valeur true et l'affecte à showComment*/}
                                <img
                                    onClick={() => setShowComments(!showComments)}
                                    src="./img/icons/commentaire.png"
                                    alt="comment"
                                />
                                <span>{post.comments.length} comments</span>
                            </div>
                            <LikeButton post={post}/>
                            <img src="./img/icons/partages.png" alt="share"/>
                        </div>
                        {/*Si le commentaire est true on le fait passer le post en props dans le component*/}
                        {showComments && <CardComments post={post}/>}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;