const mongoose = require('mongoose');
const {
    isEmail
} = require('validator'); // Bibliotheque nodeModule, fonction pour sécuriser les emails

const bcrypt = require('bcrypt'); // bibliothèque pour vous aider à hacher les mots de passe

// Schema mongo db utilisateur
const UserSchema = mongoose.Schema({
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 50,
            minlength: 6,
        },
        picture: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            max: 1000,
        },
        likes: {
            type: [String],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },

    {
        timestamps: true,
    }
)

// function crypte le password avant le save
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(); // bcrypt genere une serie de cryptes aléatoires pour saler le password
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Function décrypte le password selon l'utilisateur quand login
UserSchema.statics.login = async function (email, password) { //Static.login controle quand login email & password, bcrypt compare
    const user = await this.findOne({
        email
    });
    if (user) {
        const auth = await bcrypt.compare(password, user.password) //Bcrypt compare avec static.login l'email avec le password qui lui a ete passé
        if (auth) {
            return user;
        }
        throw Error('Password incorrect') //L'instruction throw permet de lever une exception définie par l'utilisateur
    }
    throw Error('Password incorrect')
};

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;