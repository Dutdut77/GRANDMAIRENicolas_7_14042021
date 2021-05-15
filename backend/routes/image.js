const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-image');
const imageCtrl = require('../controllers/image');

/* Ajouter une storie */
router.post('/', auth, multer, imageCtrl.addStorie);

/* Ajouter un commentaire à une storie */
router.post('/comment', auth, imageCtrl.addComment);

/* afficher une storie */
router.get('/:id', auth, imageCtrl.getOneStorie);

/* Ajouter toutes les stories */
router.get('/', auth, imageCtrl.getAllStorie);

/* Supprimer une storie */
router.delete('/:id',  auth, imageCtrl.deleteStorie);

module.exports = router;