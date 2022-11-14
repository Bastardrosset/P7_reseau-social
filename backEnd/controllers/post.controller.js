const { post } = require('../app');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');

const ObjectId = require('mongoose').Types.ObjectId; //ObjectId,type spécial utilisé pour les identifiants


//function affiche les posts
module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
            if (!err) {
                return res.send(docs);
            } else {
                console.log('Erreur dans la data :' + err)
            }
        })
        .sort({
            createdAt: -1
        }) // Permet de trier les posts les plus recents
}

//function crééer un post
module.exports.createPost = async (req, res) => {
    let filename;
    if (req.file !== null) {
        filename = res.locals.user._id + Date.now() + ".jpg";
    }

    const newPost = new PostModel({
        posterId: res.locals.user._id,
        message: req.body.message,
        picture: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
        likers: [],
        comments: [],
    })

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
        
    } catch (error) {
        return res.status(400).send(error)
    }
}

//function modifier son post
module.exports.updatePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) { // Methode de verification de l'ID passé en parametres
        return res.status(400).send('ID inconnu : ' + req.params.id)
    }
    const updatedRecord = {
        message: req.body.message
    }
    //TODO: vérifier que le posterId du post correspond au user du cookie (res.locals.user._id)

    PostModel.findByIdAndUpdate(
        req.params.id, {
            $set: updatedRecord
        }, {
            new: true
        },
        (error, docs) => {
            if (!error) {
                res.send(docs);
            } else {
                console.log("Mise à jour :" + error);
            }
        }
    )
}

//function supprimer son post
module.exports.deletePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) { // Methode de verification de l'ID passé en parametres
        return res.status(400).send('ID inconnu : ' + req.params.id)
    }
    PostModel.findByIdAndRemove(
        req.params.id,
        (error, docs) => {
            if (!error) {
                res.status(200).send('post');
            } else {
                console.log("Suppression :" + error)
            }
        })
}

// function like un post
module.exports.likePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id)
    }
    try {
        await PostModel.findByIdAndUpdate(
                req.params.id, {
                    $addToSet: {
                        likers: req.body.id
                    } //transmet l'ID du liker
                }, {
                    new: true
                }
            )
            .then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(401).send({
                message: err
            }));

        await UserModel.findByIdAndUpdate(
                req.body.id, {
                    $addToSet: {
                        likes: req.params.id
                    }
                }, {
                    new: true
                },
            )
            .then((docs) => res.status(201).json(docs))
            .catch((error) => res.status(402).send({
                message: error
            }));
    } catch (error) {
        return
    }
}

//function ne plus aimer un post
module.exports.unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id)
    }
    try {
        await PostModel.findByIdAndUpdate(
                req.params.id, {
                    $pull: {
                        likers: req.body.id
                    } //transmet l'ID du liker
                }, {
                    new: true
                },
            )
            .then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(401).send({
                message: err
            }));
        await UserModel.findByIdAndUpdate(
                req.body.id, {
                    $pull: {
                        likes: req.params.id
                    }
                }, {
                    new: true
                },
            )
            .then((docs) => res.status(201).json(docs))
            .catch((error) => res.status(402).send({
                message: error
            }));
    } catch (error) {
        return
    }
}

//********** * Fonction commentaires * **********//

//function commenter un post
module.exports.commentPost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(403).send('ID inconnu : ' + req.params.id)
    }
    try {
        await PostModel.findByIdAndUpdate(
                req.params.id, {
                    $push: {
                        comments: {
                            commenterId: res.locals.user._id,
                            commenterPseudo: req.body.commenterPseudo,
                            text: req.body.text,
                            timestamp: new Date().getTime(),
                        },
                    },
                }, {
                    new: true
                },
            )
            .then((docs) => res.status(200).send(docs))
            .catch((error) => res.status(404).send({
                message: error
            }));
    } catch (error) {
        return res.status(403).send(error)
    }
}

//function editer un commentaire
module.exports.editComment = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(401).send('ID inconnu : ' + req.params.id)

    try {
        return PostModel.findById(req.params.id,
            (error, post) => {
                let comment = post.comments.find((c) => c._id.equals(req.body.commentId))
                // console.log("post as" + post)
                // console.log("comment as" + comment)
                if (!post) {
                    return res.status(402).send('Commentaire non trouvé !');
                }

                comment.text = req.body.text;

                return post.save((error) => {
                    if (!error) {
                        return res.status(200).send(post)
                    } else {
                        return res.status(500).send(error)
                    }
                })
            })
    } catch (error) {
        res.status(404).send(error);
    }
}

//function supprimer un commentaire
module.exports.deleteComment = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(403).send('ID inconnu : ' + req.params.id)

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id, {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            }, {
                new: true
            },
            (error, post) => {
                if (!error) {
                    return res.send(post);
                } else {
                    return res.status(400).send(error)
                }
            }
        )
    } catch (error) {
        return res.status(400).send(error)
    }
}