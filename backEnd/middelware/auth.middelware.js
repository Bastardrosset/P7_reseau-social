const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });

const UserModel = require('../models/user.model');


// logique pour vérifier l'utilisateur
exports.checkUser = (req, res, next) => {
    // récupère le token via cookie-parser
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.RANDOM_KEY_SECRET, async (error, decodedToken) => {
            if (error) {
                res.locals.user = null;
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                // récupère l'Id utilisateur
                res.locals.user = user;
                console.log('cookie middelware checké')
                console.log(res.locals.user)
                console.log('decodedToken as' + decodedToken)
                next();
            }
        });
    } else {
        res.locals.user = null;
        console.log('no token')
        next();
    }
};

// on met en place la logique de connection pour le front
exports.requireAuth = (req, res, next) => {
    // on récupère le "token" via "cookie-parser"
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.RANDOM_KEY_SECRET, async (error, decodedToken) => {
            if (error) {
                console.log('requireAuth error')
                console.log(error);
                res.send(200).json('Connection non autorisée : ' + error)
            } else {
                console.log('requireAuth checké')
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log('Pas de token');
    }
};