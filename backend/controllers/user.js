/*global error */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Delete = require('../middleware/delete');

/**
 * 
 *
 * @param   {Object}  req.body   Champs du formulaire
 * @param   {String}  req.body.prenom   Prénom de l'utilisateur
 * @param   {String}  req.body.nom   Nom de l'utilisateur
 * @param   {String}  req.body.pseudo   Pseudo de l'utilisateur
 * @param   {String}  req.body.password   Mot de passe de l'utilisateur
 * @param   {String}  req.body.email   Email de l'utilisateur
 * @param   {String}  req.body.image_url   URL de la photo "avatar" de l'utilisateur
 * @param   {Number}  req.body.role   Role de l'utilisateur
 *
 */
exports.signup = async (req, res, next) => {
    try {
        const answer = await User.findOneEmail(req.body.email);
        if (answer) {
            try {
                await Delete.user(req.file.filename);
                res.status(401).json({ message: 'Adresse Email déjà prise !!!'});
            }
            catch (receivedError) {
                errorManager(receivedError, res);
            }             
        }
        else {
            try {
                await User.addUser(req);
                res.status(201).json({ User: req.body });
            }
            catch (receivedError) {
                errorManager(receivedError, res);
            }
        }
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }
}


exports.login = async (req, res, next) => {
    try {
        const answer = await User.findOneEmail(req.body.email);
        if (!answer) {
            res.status(401).json({ message: 'Email Non trouvé', email: req.body.email });
        }
        else {
            try {
                const valid = await bcrypt.compare(req.body.password, answer.password);
                if (!valid) {
                    res.status(401).json({ message: 'Mot de passe incorrect' });
                }
                else {
                    res.status(200).json({
                        userId: answer.id,
                        token: jwt.sign(
                            { userId: answer.id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                }
            }
            catch (receivedError) {
                console.log("erreur 1");
                error(receivedError, res);
            }
        }
    }
    catch (receivedError) {
        console.log("erreur 2");
        error(receivedError, res);
    }

}

exports.update = async (req, res, next) => {
    try {
        await User.addUser(req.body);
        res.status(201).json({ User: req.body });

    }
    catch (receivedError) {
        error(receivedError, res);
    }
}








