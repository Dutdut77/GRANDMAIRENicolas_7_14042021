const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.min" : '"username" doit comporter minimun 3 caratères',
            "string.empty" : '"username" est un champ obligatoire'
        }),
        

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})


/**
 * Vérifie l'autorisation de l'utilisateur
 *
 * @param   {String}  req.headers.authorization   Bearer + numéro du Token
 * @param   {String}  req.body.userId   userId de l'utilisateur
 *
 */
exports.login = async (req, res, next) => {

  try {

   const value = await schema.validateAsync({ username: req.body.email, birth_year: 2014 });
   console.log("test :",  req.body);
   
  }
  catch (err) { 


   res.status(err.status | 500).send({"errorMessage" : "Petit tezst"})
    
  //  console.log(err.details);
  }
  
};