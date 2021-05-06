const multer = require('multer');
const upload = multer();


 module.exports = upload.none(), function (req, res, next) {
    console.log(req.body);
  };

 




