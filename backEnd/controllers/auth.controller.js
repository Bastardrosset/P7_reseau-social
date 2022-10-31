const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000 // Token valable 3 jours


// Function creation du token utilisateur
const createToken = (id, isAdmin) => {
    return jwt.sign({
        id,
        isAdmin
    }, process.env.RANDOM_KEY_SECRET, {
        expiresIn: maxAge
    })
}

// Function de création de compte
module.exports.signUp = async (req, res) => {
    const {
        pseudo,
        email,
        password
    } = req.body.values;

    try {
        const user = await UserModel.create({
            pseudo,
            email,
            password
        });
        res.status(201).json({
            user: user._id
        })
    } catch (error) {
        res.status(400).send({
            error
        });
    }
}

// Function d'identification a un compte
module.exports.login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    console.log("values", email, password)

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id, user.isAdmin);
        res.status(200).json({
            userId: user._id,
            token: token
        });
    } catch (error) {
        res.status(401).send({
            error
        });
    }
};

// Function déconnection
module.exports.logout = (req, res) => {
    res.redirect('/');
}