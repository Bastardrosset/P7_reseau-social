const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('../middelware/multer.config');


router.get('/', postController.readPost);
router.post('/', multer, postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// Commentaires
router.put('/comment-post/:id', postController.commentPost);
router.put('/edit-comment-post/:id' , postController.editComment);
router.patch('/delete-comment-post/:id', postController.deleteComment);

module.exports = router;