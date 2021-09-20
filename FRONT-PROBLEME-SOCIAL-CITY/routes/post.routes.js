const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer();

router.get('/', postController.readPost);
//Avant de traiter le controller on recupère d'abord le fichier à exploiter
router.post('/', upload.single('file'), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// upload d'une image dans poste

// comments
router.patch('/comment-post/:id', postController.commentPost);
// editer à l'intérieur d'un commentaire
router.patch('/edit-comment-post/:id', postController.editCommentPost);
// supprimer le commentaire
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;