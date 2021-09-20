const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const { uploadErrors } = require('../utils/errors.utils');
//Vérifie si le parametre passé en parametre existe déjà
const ObjectID = require('mongoose').Types.ObjectId;
// utilisation de "fs" pour interargir avec le syteme de fichiers
// fs est une dependance native de node qui permet de creer des fichiers,
// Incrémenter des éléments dans un fichier.
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);


module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error to get data : ' + err);
        }
    }).sort({ createdAt: -1 }); // Pour afficher toujours en ordre du plus recent au plus ancien
};

module.exports.createPost = async (req, res) => {

    // On traite d'abord le red.file
    let fileName;

    if (req.file !== null) {
        try {
            // On teste le format valide pour nos fichiers
            if (
                req.file.detectedMimeType !== "image/jpg" &&
                req.file.detectedMimeType !== "image/png" &&
                req.file.detectedMimeType !== "image/jpeg"
            ) {
                throw Error("invalid file");
            }
            // On teste la taille de l'image
            if (req.file.size > 500000) {
                throw Error("max size");
            }

        }catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json(err);
        }

        // On traite now le fichier en recupérant l'id de l'utlisateur et on rajoute le moment
        fileName = req.body.posterId + Date.now() + '.jpg';

        // On crée le fichier en question
        await pipeline(
            req.file.stream,
            // On fait passer le chemin pour créer le nouvezu fichier
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}`
            )
        );
    }

    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: []
    });

    // Incrémenter les données dans la base de données
    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
    //Enregistrement de la mise à jour
    const updatedRecord = {
        message: req.body.message
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Update error : ' + err);
            }
        }
    );
};

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err){
            res.send(docs);
        } else {
            console.log('Delete error : ' + err);
        }
    });
};

// On va ajouter l'id de la personne qui like un post dans le tableau "likers" du post
// On va injecter l'id du post liké dans le tableau "likes" de l'utilisateur
module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
    // On ajoute l'id de la personne qui a like un post dans le tableau
    try {

        // Recupération du message liké avec son id dans l'url
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                //ajout de l'id de la personne qui a liké dans le tableau "likers"
                //ajout de l'utilisateur dans le likers du post
                $addToSet: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) {
                    return res.status(400).send(err);
                }
            }
        );
        // On récupère l'id de l'utilisateur et non du post
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                //on ajoute dans la tableau "likes" de l'utilisateur l'id du post
                $addToSet: { likes: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) {
                    res.send(docs);
                }
                else {
                    return res.status(400).send(err);
                }
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try {
        // Ajout de l'utilisateur dans le like du post
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                //On retire du tableau
                $pull: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) {
                    return res.status(400).send(err);
                }
            }
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },
            (err, docs) => {
                if (!err) {
                    res.send(docs);
                }
                else {
                    return res.status(400).send(err);
                }
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    // Recupère l'id du post et dans la table commentaire on fait update du tableau de commentaire
    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                // On rajoute les commentaires à la suite des autres
                // On écrase pas le tableau, on garde le commentaire d'avant
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        // On recupère l'heure actuelle au moment du post
                        timeStamp: new Date().getTime()
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err){
                    return res.send(docs);
                } else {
                    return res.status(400).send(err);
                }
            }
        );
    }catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    //On cherche par id
    try {
        // on a identifie l'article auquel on veut editer le commentaire
        return PostModel.findById(
            req.params.id,
            (err, docs) => {
                // thecomment = à l'id du commentaire existent ce qui nous permettra de commenter
                // dans un commentaire existent
                const theComment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId)
                );
                if (!theComment){
                    return res.status(404).send('Comment not found');
                }
                theComment.text = req.body.text;
                return docs.save((err) => {
                    if (!err){
                        return res.status(200).send(docs);
                    }
                    return res.status(500).send(err);
                });
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }

};

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
    //On supprime le commentair ed'un poste et non le post
    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true },
            (err,docs) => {
                if (!err){
                    return res.send(docs);
                } else {
                    return res.status(400).send(err);
                }
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }

};