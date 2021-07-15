const sharp = require('sharp');

module.exports = async (req, res, next) => {

    try {

  const name = Date.now() + '-' + req.file.originalname.split(' ').join('_');
 
  
 const res =  await sharp(req.file.buffer)
  .resize(600)
  .toFile("./images/stories/" + name)
   
  next();

     }
     catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
  };