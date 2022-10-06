const express = require('express')

const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const uploadCtrl = require('../controllers/upload.controller')

const multer = require('multer');

// Route création de compte
router.post('/signup', authCtrl.signUp);
// Route identification
router.post('/login', authCtrl.login);
// Route déconnection
router.get('/logout', authCtrl.logout);

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.userInfo);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.patch('/follow/:id', userCtrl.follow);
router.patch('/unfollow/:id', userCtrl.unFollow);

//multer Profil
router.post('/upload', multer, uploadCtrl.uploadImg)
// const UserModel = require('../models/user.model')
// const storage = multer.diskStorage({
// destination: (req, file, callback) => {
//   callback(null, './images')
// },
// filename: (req, file, callback) => { 
//             callback(null, file.originalname);
//           }
// });

// const upload = multer({storage}).single('file');

// router.post('/upload', upload, async (req, res) => {
//     try {
//         await UserModel.findByIdAndUpdate(
//             // console.log("UserId as " + req.body.userId)
//         req.body.userId,
//         { $set: {picture: `/images/${req.file.filename}`} },
//         { new: true, upsert: true, setDefaultsOnInsert: true },
//         )
        
//         .then((post) => res.status(200).send(post))
//         .catch((error) => res.status(500).json(error))
//     }
//     catch (error) {
//         res.status(500).send({ message: error })
//     }

// })


module.exports = router;