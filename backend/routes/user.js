const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multerUser = require('../middleware/multer-config');
//const multer = require('multer');
//const multParse = multer();
const userCtrl = require('../controllers/user');


router.post('/signup', multerUser, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/update', auth, userCtrl.update);
//router.delete('/delete',  auth, userCtrl.delete);

module.exports = router;