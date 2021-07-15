const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.memoryStorage();

module.exports = multer({
  storage: storage,
  limits: { fileSize: 2000000 }
}).single('image_url');


