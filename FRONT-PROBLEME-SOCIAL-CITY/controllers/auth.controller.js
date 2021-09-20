const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const  maxAge = 3 * 24 * 60 * 60 * 1000 // 3 jours;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body;

    try {
        const user = await UserModel.create({pseudo, email, password });
        res.status(201).json({ user: user._id});
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(400).send({ errors })
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // On check dans la base de donnée si l'utilisateur existe
        const user = await UserModel.login(email, password);
        // Création du token
        const token = createToken(user._id);
        // On cree le cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = signInErrors(err);
        res.status(201).json({ errors });
    }
}

module.exports.logout = (req, res) => {
    // On retire le cookie à l'utilisateur
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}