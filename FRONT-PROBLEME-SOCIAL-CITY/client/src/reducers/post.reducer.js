import {
    DELETE_COMMENT,
    DELETE_POST,
    EDIT_COMMENT,
    GET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    UPDATE_POST
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId){
                    return {
                        ...post,
                        likers: [action.payload.userId, ...post.likers],
                    };
                }
                return post;
            });
        case UNLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: post.likers.filter((id) => id !== action.payload.userId)
                    }
                }
                return post;
            });
        case UPDATE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId){
                    return {
                        ...post,
                        message: action.payload.message,
                    };
                } else {
                    return post;
                }
            });
        case DELETE_POST:
            // Retourne tous les posts sauf le post dont l'id = à l'id du post sur le store
            return state.filter((post) => post._id !== action.payload.postId);
        case EDIT_COMMENT:
            return state.map((post) => {
                // On commence d'abord à trouver le post
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        // Ensuite on fait une recherche pour trouver le commentaire
                        // On selectionne le commentaire parmi tous les commentaires dans le store
                        comments: post.comments.map((comment) => {
                            // On retrouve le bon commentaire
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    // Une fois commentaire trouvé, on modifie le texte uniquement
                                    text: action.payload.text
                                };
                            } else {
                                return comment;
                            }
                        }),
                    };
                } else return post;
            });
        case DELETE_COMMENT:
            return state.map((post) => {
               // On identifie le post en question
               if (post._id === action.payload.postId){
                   return {
                       ...post,
                       // On re-identifie le commentaire à supprimer en utilisant filter qui renvoie le commentaire concerné
                       comments: post.comments.filter((comment) => comment._id !== action.payload.commentId)
                   }
               } else return post;
            });
        default:
            return state;
    }
}