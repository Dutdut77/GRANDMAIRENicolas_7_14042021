const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({


  destination: (req, file, callback) => {
    callback(null, 'images/users/');
  },
  filename: (req, file, callback) => {
    const name = (file.originalname ? file.originalname : file.name).split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }


});

module.exports = multer({
  storage: storage,
  limits: { fileSize: 2000000 }
}).single('image_url');


