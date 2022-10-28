const UserModel = require('../models/user.model')

exports.uploadImg = async (req, res) => {
    try {

        await UserModel.findByIdAndUpdate(
                req.body.userId, {
                    $set: {
                        picture:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    }
                }, {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true
                },
            )

            .then((post) => res.status(200).json(post))
            .catch((error) => res.status(500).json(error))
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }

}