const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


/**
 * Enregistrement nouvel utilisateur
 *
 * @param   {Object}  req.body   Champs du formulaire.
 * @param   {String}  req.body.email   Email de l'utilisateur.
 * @param   {String}  req.body.password  Mot de passe de l'utilisateur.
 *
 * 
 */
exports.signup = async (req, res, next) => {
    //try {        
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            prenom: req.body.prenom,
            nom: req.body.nom,
            pseudo: req.body.pseudo,
            password: hash,
            email: req.body.email,
            avatar: req.body.avatar,
            role: req.body.role
        });
    //}

    // catch (error) {
    //     return res.status(400).json({ error });
    // }

};


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
    User.findOne({ email: req.body.email })
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
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};