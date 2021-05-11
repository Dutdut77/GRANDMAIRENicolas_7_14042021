const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-image');
const imageCtrl = require('../controllers/image');


router.post('/', auth, multer, imageCtrl.addStorie);
router.post('/comment', auth, imageCtrl.addComment);
router.get('/:id', auth, imageCtrl.getOneStorie);
router.get('/', auth, imageCtrl.getAllStorie);
router.delete('/:id',  auth, imageCtrl.deleteStorie);

module.exports = router;