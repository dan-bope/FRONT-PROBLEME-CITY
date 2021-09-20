import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty, timestampParser} from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import {addComment, getPosts} from "../../actions/post.actions";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({ post }) => {
    // pour stocker nos commentaires
    const [text, setText] = useState('');
    const usersData = useSelector(state => state.usersReducer);
    const userData = useSelector(state => state.userReducer);
    const dispacth = useDispatch();

    // pour faire partir tous les commentaires.
    const handleComment = (e) => {
        e.preventDefault();

        if (text){
            dispacth(addComment(post._id, userData._id, text, userData.pseudo))
            // Alors on ira chercher tous les posts pour récupérer l'id unique du nouveau post
                .then(() => dispacth(getPosts()))
                .then(() => setText(''));
        }
    };
    return (
        <div className="comments-container">
            {/*On va lister un à un les commentaires*/}
            {post.comments.map((comment) => {

                return (
                    /*Si l'id cdu commentaire egal à l'id de la personne qui surf sur la page alors*/
                    <div className={comment.commenterId === userData._id ?
                    "comment-container client" : "comment-container"} key={comment._id}>
                        <div className="left-part">
                            <img
                                src={
                                    !isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user._id === comment.commenterId){
                                            return user.picture;
                                        }else {
                                            return null;
                                        }
                                    })
                                        .join('')
                                } alt="commenter-pic"
                            />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenterPseudo}</h3>
                                    {/*On ajoute une condition pour ne pas se suivre soi-meme*/}
                                    {comment.commenterId !== userData._id && (
                                        <FollowHandler
                                            idToFollow={comment.commenterId}
                                            type={'card'}
                                        />
                                    )}
                                </div>
                                {/*Affiche la date du commentaire*/}
                                <span>
                                    {timestampParser(comment.timestamp)}
                                </span>
                            </div>
                            {/*Affiche le commentaire*/}
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id}/>
                        </div>
                    </div>
                )
            })}
            {/*On crée aussi le formulaire permettant aux users de commenter aussi*/}
            {/*Si on dispose de la userData._id c'est à dire si jamais l'utilisateur est connecté*/}
            {/*Alors on lui presente le formulaire : au user connecté*/}
            {userData._id && (
                <form action="" onSubmit={handleComment} className="comment-form">
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text} placeholder="Vous pouvez commenter"
                    />
                    <br/>
                    <input type="submit" value="Envoyer"/>
                </form>
            )}
        </div>
    );
};

export default CardComments;