const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-user');
const userCtrl = require('../controllers/user');

/* Route pour s'enregistrer sur le site */
router.post('/signup', multer, userCtrl.signup);

/* Route pour se loguer */
router.post('/login', userCtrl.login);

/* Route pour modifier l'avatar du profil */
router.put('/avatar/:id', auth, multer, userCtrl.avatar);

/* Route pour modifier le profil */
router.put('/:id', auth, userCtrl.update);

/* Route pour récupérer les informations d'un utilisateur */
router.get('/:id', auth, userCtrl.getOneUser);

/* Route pour récupérer les informations de tous les utilisateurs */
router.get('/', auth, userCtrl.getAllUser);

/* Route pour supprimer un utilisateur */
router.delete('/:id',  auth, userCtrl.deleteUser);

module.exports = router;