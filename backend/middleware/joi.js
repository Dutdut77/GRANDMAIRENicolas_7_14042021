const Joi = require('joi');

const login = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .messages({
            "string.base": "Le champ email est obligatoire.",
            "string.empty": "Le champ email est obligatoire.",
            "string.email": "Votre email n'est pas valide."

        }),
    password: Joi.string()
        .required()
        .messages({
            "string.base": "Le mot de passe est obligatoire.",
            "string.empty": "Le mot de passe est obligatoire.",
        }),
});

const signup = Joi.object({
    nom : Joi.string()
   
    .alphanum()
    .min(3)
    .messages({
        "string.empty": "Le champ nom est obligatoire.",
        "string.min": "Votre nom doit contenir au minimum 3 charactères."
    }),
    prenom : Joi.string()
  
    .alphanum()
    .min(2)
    .messages({
        "string.empty": "Le champ prénom est obligatoire.",
        "string.min": "Votre prénom doit contenir au minimum 2 charactères."
    }),
    pseudo : Joi.string()
  
    .alphanum()
    .min(3)
    .messages({
        "string.empty": "Le champ pseudo est obligatoire.",
        "string.min": "Votre pseudo doit contenir au minimum 3 charactères."
    }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .messages({
            "string.empty": "Le champ email est obligatoire.",
            "string.email": "Votre email n'est pas valide."

        }),
    password: Joi.string()
       
        .pattern ( new  RegExp ( '^[a-zA-Z0-9]{3,20}$' ) ) 
        .messages({
            "string.base": "Le mot de passe est obligatoire.",
            "string.empty": "Le mot de passe est obligatoire.",
            "string.pattern.base": "Le mot de passe doit contenir entre 3 et 20 charactères (minuscules, majuscules, chiffres)",
        }),
});

/**
 * Vérifie les champs input de la page login
 *
 * @param   {String}  req                 requete du formulaire login
 * @param   {String}  req.body.email      email de l'utilisateur
 * @param   {String}  req.body.password   password de l'utilisateur
 *
 */
exports.login = async (req, res, next) => {
    try {
        const value = await login.validateAsync({ email: req.body.email, password: req.body.password }, { abortEarly: false });
        next()
    }
    catch (err) {
        res.status(err.status | 500).send(err.details)        
    }
};

/**
 * Vérifie les champs input de la page signup
 *
 * @param   {String}  req                 requete du formulaire login
 * @param   {String}  req.body.nom        nom de l'utilisateur
 * @param   {String}  req.body.prenom     prénom de l'utilisateur
 * @param   {String}  req.body.pseudo     pseudo de l'utilisateur
 * @param   {String}  req.body.email      email de l'utilisateur
 * @param   {String}  req.body.password   password de l'utilisateur
 *
 */
 exports.signup = async (req, res, next) => {   
    const data = (JSON.parse(JSON.stringify(req.body))); 
    try {
        const value = await signup.validateAsync({ email: data.email, password: data.password, nom: data.nom, prenom: data.prenom, pseudo: data.pseudo}, { abortEarly: false });
        next()       
    }
    catch (err) {      
        res.status(err.status | 500).send(err.details)        
    }
};