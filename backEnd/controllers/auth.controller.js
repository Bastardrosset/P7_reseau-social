const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');  
const sanitize = require('express-mongo-sanitize');
const {signUpErrors, loginErrors} = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000// Token valable 3 jours


// Function creation du token utilisateur
const createToken = (id, isAdmin) => {
    return jwt.sign({id, isAdmin}, process.env.RANDOM_KEY_SECRET, {
        expiresIn: maxAge
    })
}

// Function de création de compte
module.exports.signUp = async (req, res) => { 
    // console.log(req.body)
    const {pseudo, email, password} = req.body;

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id})
    } catch (err) {
        // console.log(err)
        const errors = signUpErrors(err);
        res.status(400).send({ errors });
    }
}

// Function d'identification a un compte
module.exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id, user.isAdmin);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })//3eme parametre httpOnly déclare le cookie consultable que depuis uniquement notre serveur
        res.status(200).json({ message: 'Connexion réussi'})
    } catch (err) {
        console.log(err)
        const errors = loginErrors(err);
        res.status(401).send({ errors });
    }
 };

 // Function déconnection
 module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });// maxAge passe à 1 miniseconde
    res.redirect('/');
 }