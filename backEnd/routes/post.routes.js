const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('../middelware/multer.config');
const auth = require('../middelware/auth.middelware')

router.get('/', auth, postController.readPost);
router.post('/', auth, multer, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.patch('/like-post/:id', auth, postController.likePost);
router.patch('/unlike-post/:id', auth, postController.unlikePost);

// Commentaires
router.put('/comment-post/:id', auth, postController.commentPost);
router.put('/edit-comment-post/:id' , auth, postController.editComment);
router.patch('/delete-comment-post/:id', auth, postController.deleteComment);

module.exports = router;