const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-image');
const imageCtrl = require('../controllers/image');


router.post('/',  auth, multer, imageCtrl.addStorie);
router.get('/:id', auth, imageCtrl.getOneStorie);
router.get('/', auth, imageCtrl.getAllStorie);
//router.put('/updateImage',  auth, imageCtrl.updateImage);
router.delete('/:id',  auth, imageCtrl.deleteImage);

module.exports = router;