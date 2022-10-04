 const jwt = require('jsonwebtoken');
 const UserModel = require('../models/user.model');


// Function check un ticket utilisateur à l'ID connecté 
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;// neccessite cookie-parser dans app.js
    if (token) {// verify methode de jwt verifie le token
        jwt.verify(token, process.env.RANDOM_KEY_SECRET, async (error, decodedToken) => {//retourne soit error, soit la réponse décodé
            if (error) {// si JWT ne décrypte pas la durée de vie du cookie de connection passe a 1 mini seconde
                res.locals.user = null;
                // res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                // console.log("decoded token " + decodedToken);
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                // console.log(res.locals.user);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

// Control le token de l'ID connecté avec le token créé lors de création ID
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.RANDOM_KEY_SECRET, async (error, decodedToken) => {
            if (error) {
                console.log(error);
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log('No token');
    }
}
