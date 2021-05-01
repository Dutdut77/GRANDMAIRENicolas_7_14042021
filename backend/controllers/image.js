/*global error */
const Image = require('../models/image');

/**
 * 
 *
 * @param   {Object}  req.body   Champs du formulaire
 * @param   {String}  req.body.prenom   Prénom de l'utilisateur
 * @param   {String}  req.body.nom   Nom de l'utilisateur
 * @param   {String}  req.body.pseudo   Pseudo de l'utilisateur
 * @param   {String}  req.body.password   Mot de passe de l'utilisateur
 * @param   {String}  req.body.email   Email de l'utilisateur
 * @param   {String}  req.body.avatar   URL de la photo "avatar" de l'utilisateur
 * @param   {Number}  req.body.role   Role de l'utilisateur
 *
 */
exports.addImage = async (req, res, next) => {

    try {
        await Image.add(req.body);
        res.status(201).json({ Image: req.body });

    }
    catch (receivedError) {
        error(receivedError, res);
    }
}


