const jwt = require('jsonwebtoken');

/**
 * Vérifie l'autorisation de l'utilisateur
 *
 * @param   {String}  req.headers.authorization   Bearer + numéro du Token
 * @param   {String}  req.body.userId   userId de l'utilisateur
 *
 */
module.exports = (req, res, next) => {

  try {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  
    const userId = decodedToken.userId;

    if (req.body.userId && parseInt(req.body.userId) !== userId) {
     throw("pb connection")
      
    }
    res.status(201).json(     
      validToken = true
    );

  }
  catch (err) { 
    res.status(401).json(     
      validToken = false
    );
  }
};