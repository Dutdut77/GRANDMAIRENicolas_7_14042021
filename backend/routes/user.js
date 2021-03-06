const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-user');
const userCtrl = require('../controllers/user');
const joi = require('../middleware/joi');

/* Route pour s'enregistrer sur le site */
router.post('/signup', multer, joi.signup, userCtrl.signup);

/* Route pour se loguer */
router.post('/login', joi.login, userCtrl.login);

/* Route pour récupérer les informations de tous les utilisateurs */
router.post('/', auth, userCtrl.getAllUser);

/* Route pour modifier l'avatar du profil */
router.put('/avatar/:id', multer, auth, userCtrl.avatar);

/* Route pour modifier le profil */
router.put('/:id', auth, userCtrl.update);

/* Route pour récupérer les informations d'un utilisateur */
router.post('/:id', auth, userCtrl.getOneUser);

/* Route pour supprimer un utilisateur */
router.post('/delete/:id', auth, userCtrl.deleteUser);

module.exports = router;