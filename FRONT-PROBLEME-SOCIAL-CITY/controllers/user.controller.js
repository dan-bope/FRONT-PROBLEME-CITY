const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
    //console.log(req.params);
    // on teste si l'id est valide dans la base de données
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('ID unknown : ' + err);
        }
    }).select('-password');
};

module.exports.updateUser = async (req, res) => {
    // on teste si l'id est valide dans la base de données
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    // On trouve l'élément et on le met à jour
    try {
        await UserModel.findOneAndUpdate(
            // On trouve l'id
            {_id: req.params.id},
            // On modifie
            {
                $set: {
                    bio: req.body.bio
                }
            },
            // Parametre de put obligatoire
            { new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                }
                if (err) {
                    return res.status(500).send({ message: err})
                }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};

module.exports.deleteUser = async (req, res) => {
    // on teste si l'id est valide dans la base de données
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    try {
        await UserModel.remove({ _id: req.params.id}).exec();
        res.status(200).json({ message: "Successfully deleted. "});
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};

module.exports.follow = async (req, res) => {
    // on teste si l'id est valide dans la base de données
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    try {
        //add to the follower list
        await UserModel.findByIdAndUpdate(
            //l'id de celui qui veut suivre
            req.params.id,
            //id de celui qui est suivi
            { $addToSet: { following: req.body.idToFollow }},
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) {
                    res.status(201).json(docs);
                }
                else {
                    return res.status(400).json(err);
                }
            }
        );
        // add to following list
        await UserModel.findByIdAndUpdate(
            // id de la personne qui est suivi
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id }},
            { new: true, upsert: true },
            (err, docs) => {
                if (err) {
                    return res.status(400).json(err);
                }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};

module.exports.unfollow = async (req, res) => {
    // on teste si l'id est valide dans la base de données
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnFollow)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }
    try {
        //add to the follower list
        await UserModel.findByIdAndUpdate(
            //l'id de celui qui veut suivre
            req.params.id,
            //id de celui qui est suivi
            { $pull: { following: req.body.idToUnFollow }},
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) {
                    res.status(201).json(docs);
                }
                else {
                    return res.status(400).json(err);
                }
            }
        );
        // add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id }},
            { new: true, upsert: true },
            (err, docs) => {
                if (err) {
                    return res.status(400).json(err);
                }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};

