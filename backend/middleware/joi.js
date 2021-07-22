const Joi = require('joi');

const login = Joi.object({


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .messages({
            "string.base": "Le champ Email est obligatoire !",
            "string.email": "Votre Email n'est pas valide !"

        }),

    password: Joi.string()
        .required()
        .messages({
            "string.base": "Le mot de passe est obligatoire !",
            "string.empty": "Le mot de passe est obligatoire !",

        }),



})



/**
 * Vérifie l'autorisation de l'utilisateur
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