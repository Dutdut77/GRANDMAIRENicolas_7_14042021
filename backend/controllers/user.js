const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.signup = async (req, res, next) => {
    try {
        await User.addUser(req.body);
        res.status(201).json({ message: 'Utilisateur créé !' });
        
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

exports.findOneEmail = async (req, res, next) => {
    try {
        await User.findOneEmail(req.body.email);
        res.status(201).json({ message: 'Email trouvé' });
    }
    catch (error) {
        res.status(500).json({ error })
    }
}




/**
 * Connecter un utilisateur
 *
 * @param   {Object}  req.body   Champs du formulaire.
 * @param   {String}  req.body.email   Email de l'utilisateur.
 * @param   {String}  req.body.password  Mot de passe de l'utilisateur.
 *
 * 
 */
exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};