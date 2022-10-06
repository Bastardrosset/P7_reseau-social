const UserModel = require('../models/user.model')

exports.uploadImg = async (req, res) => {
    try {
                await UserModel.findByIdAndUpdate(
                    // console.log("UserId as " + req.body.userId)
                req.body.userId,
                { $set: {picture: `/images/${req.file.filename}`} },
                { new: true, upsert: true, setDefaultsOnInsert: true },
                console.log(storage)
                )
                
                .then((post) => res.status(200).send(post))
                .catch((error) => res.status(500).json(error))
            }
            catch (error) {
                res.status(500).send({ message: error })
            }

}