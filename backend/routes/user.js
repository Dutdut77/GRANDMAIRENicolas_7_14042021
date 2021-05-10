const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-user');
const userCtrl = require('../controllers/user');


router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
//router.post('/avatar/:id', auth, multer, userCtrl.avatar);
router.put('/:id', auth, userCtrl.update);
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUser);
router.delete('/:id',  auth, userCtrl.deleteUser);

module.exports = router;