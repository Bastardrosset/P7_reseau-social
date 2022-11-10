const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });

const UserModel = require('../models/user.model');

module.exports = (req, res, next) => {
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
        res.status(401).send({message: "Token invalid" });
    }
  };
