const UserModel = require('../models/user.model');
// utilisation de "fs" pour interargir avec le syteme de fichiers
// fs est une dependance native de node qui permet de creer des fichiers,
// Incrémenter des éléments dans un fichier.
const fs = require('fs');
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors.utils');
const pipeline = promisify(require('stream').pipeline);


module.exports.uploadProfil = async (req, res) => {

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

    // On traite now le fichier
    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        // On fait passer le chemin pour créer le nouvezu fichier
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );

    // Now on met le chemin du fichier dans Mongodb
    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set : {picture: "./uploads/profil/" + fileName}},
            { new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if (!err){
                    return res.send(docs);
                } else {
                    return res.status(500).send({ message: err })
                }
            }
        )
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
