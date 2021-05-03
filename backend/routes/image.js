const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const imageCtrl = require('../controllers/image');


router.post('/addImage',  auth, multer, imageCtrl.addImage);
//router.put('/updateImage',  auth, imageCtrl.updateImage);
//router.delete('/deleteImage',  auth, imageCtrl.deleteImage);

module.exports = router;