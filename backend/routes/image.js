const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const imageCtrl = require('../controllers/image');
const joi = require('../middleware/joi');

/* Ajouter une storie */
router.post('/',  multer, auth, imageCtrl.addStorie);

/* Ajouter un commentaire à une storie */
router.post('/comment', auth, joi.addComment, imageCtrl.addComment);

/* Afficher toutes les stories */
router.post('/allStories/', auth, imageCtrl.getAllStorie);

/* Afficher tous les commentaires de toutes les Stories */
router.post('/allComment/', auth, imageCtrl.getAllCommentairesAdmin);

/* Afficher une storie */
router.post('/oneStorie/:id', auth, imageCtrl.getOneStorie);

/* Afficher tous les commentaires d'une Storie */
router.post('/viewComment/:id', auth, imageCtrl.getAllCommentaires);

/* Compter le nombre de photos posté par un utilisateur */
router.post('/user/:id', auth, imageCtrl.countUserPhoto);

/* Compter le nombre de commentaire posté par un utilisateur */
router.post('/user/comment/:id', auth, imageCtrl.countUserCommentPhoto);

/* Supprimer une storie */
router.post('/delete/:id', auth, imageCtrl.deleteStorie);

/* Supprimer un commentaire d'une Storie */
router.post('/delete/comment/:id', auth, imageCtrl.deleteCommentaire);



module.exports = router;