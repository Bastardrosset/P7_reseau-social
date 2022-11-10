const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 60 * 60 * 1000; // expire au bout de 3h.

require('dotenv').config({path: '../config/.env'})


// Function creation du token utilisateur
const createToken = (id) => {
    return jwt.sign(
        {id}, 
        process.env.RANDOM_KEY_SECRET, 
        { expiresIn: maxAge }
    );
};

// Function de création de compte
module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body.values;

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).send({ user: user._id  });
    } catch (error) {
        res.status(400).send({ error });
    };
};

// Function d'identification a un compte
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body.values;
console.log('user avant try signIn')
    try {
        const user = await UserModel.login(email, password);
console.log('user login', user)

        // stock _id utilisateur dans "token"
        const token = createToken(user._id);
console.log('user signIn createtoken', token)

        // ajout le token dans le cookie
        res.cookie('jwt', token, { httpOnly: true,  maxAge: maxAge }); 
console.log('user signIn res cookie', res.cookie)
//3eme parametre httpOnly déclare le cookie consultable que depuis uniquement notre serveur
        res.status(200).json({ user: user._id });
console.log('res status signIn', res.status)

    } catch (error) {
        res.status(401).send({ error });
console.log('error signIn', res.status)

    };
};

// Function déconnection
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); // maxAge passe à 1 miniseconde
    res.redirect('/home');
};