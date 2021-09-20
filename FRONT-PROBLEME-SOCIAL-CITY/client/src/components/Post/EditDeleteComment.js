import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
    // Checker si l'utilisateur est l'auteur sinon on ne peut pas éditer
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    // Stockage de l'edition du message
    const [text, setText] = useState("");
    // l'id de notre utilisateur en passant par le context au lieu du store.
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    // Fonction permettant d'editer notre message
    const handleEdit = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(editComment(postId, comment._id, text));
            // Une fois se fait on remet le texte à '' et le setEdit à false
            setText('');
            setEdit(false);
        }
    };

    // Supprimer le commentaire
    const handleDelete = () => {
        dispatch(deleteComment(postId, comment._id));
    };

    //const handleDelete = () => dispatch(deleteComment(postId, comment._id));

    useEffect(() => {
        // fonction qui verifie si c'est l'auteur alors on le passe à true.
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true);
            }
        };
        checkAuthor();
    }, [uid, comment.commenterId]);

    return (
        <div className="edit-comment">
            {/*cette affichage dependra de la valeur de isAuthor qui doit etre true pour que cette partie s'affiche*/}
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
            )}
            {/*Si les deux sont sur true alors on affiche le formulaire pour editer son commentaire*/}
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className="edit-comment-form">
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>
                        Editer
                    </label>
                    <br />
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                    />
                    <br />
                    <div className="btn">
                        <span onClick={() => {
                            if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                                handleDelete();
                            }
                        }}>
                            <img src="./img/icons/trash.svg" alt="delete" />
                        </span>
                        <input type="submit" value="changer votre commentaire" />
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;