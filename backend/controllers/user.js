/*global error */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Image = require('../models/image');
const Delete = require('../middleware/delete');

/**
 * SIGNUP
 *
 * @param   {Object}  req               Champs du formulaire
 * @param   {String}  req.body.prenom   Prénom de l'utilisateur
 * @param   {String}  req.body.nom      Nom de l'utilisateur
 * @param   {String}  req.body.pseudo   Pseudo de l'utilisateur
 * @param   {String}  req.body.password Mot de passe de l'utilisateur
 * @param   {String}  req.body.email    Email de l'utilisateur
 * @param   {String}  req.file.filename URL de la photo "avatar" de l'utilisateur
 * @param   {Number}  req.body.role     Role de l'utilisateur
 *
 */
exports.signup = async (req, res, next) => {
    try {
        const answer = await User.emailExists(req.body.email);
        if (answer) {
            await Delete.imageUser(req.file.filename);
            return res.status(401).json({ message: 'Adresse Email déjà prise !!!' });
        }
        await User.addUser(req);       
        res.status(201).json({
            prenom: req.body.prenom,
            nom: req.body.nom,
            pseudo: req.body.pseudo,
            email: req.body.email,
            avatar: req.file.filename,
            role: req.body.role
        });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }
}

/**
 * LOGIN
 *
 * @param   {Object}  req                Champs du formulaire
 * @param   {String}  req.body.email     Email de l'utilisateur
 * @param   {String}  req.body.password  Password de l'utilisateur
 *
 * @return  {Objet}                      Objet comprenant UserId + Token
 */
exports.login = async (req, res, next) => {
   
    try {
        const answer = await User.findByEmail(req.body.email);
        if (!answer) {
            return res.status(401).json({ message: 'Email Non trouvé', email: req.body.email });
        }
        const valid = await bcrypt.compare(req.body.password, answer.password);
        if (!valid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        res.status(200).json({
            userId: answer.id,
            start : Date.now(),
            token: jwt.sign(
                { userId: answer.id },
                process.env.SECRET_TOKEN,
                { expiresIn: '24h' }
            )
        });
    }
    catch (receivedError) {
        error(receivedError, res);
    }

}

/**
 * Modifier les données d'un user !
 *
 * @param   {Object}  req                Champs du formulaire
 * @param   {String}  req.body.prenom    Prénom de l'utilisateur
 * @param   {String}  req.body.nom       Nom de l'utilisateur
 * @param   {String}  req.body.pseudo    Pseudo de l'utilisateur
 * @param   {String}  req.body.password  Mot de passe de l'utilisateur
 * @param   {String}  req.body.email     Email de l'utilisateur
 *
 */
exports.update = async (req, res, next) => {      
    try {
        await User.updateUser(req.body, req.params.id);
        res.status(201).json({
            prenom: req.body.prenom,
            nom: req.body.nom,
            pseudo: req.body.pseudo            
        });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }

}

/**
 * Récupération des données d'un utilisateur
 *
 * @param   {Number}  req.params.id   Id de l'utilisateur souhaité.
 *
 * @return  {JSON}                    JSON de l'utilisateur.
 */
exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.getOneUser(req.params.id);
        res.status(201).json({ user });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }

}


/**
 * Récupération de toutes les données des utilisateurs
 *
 *
 * @return  {JSON}                    JSON des utilisateurs.
 */
exports.getAllUser = async (req, res, next) => {
    try {
        const user = await User.getAllUser();
        res.status(201).json({ user });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }
}


/**
 * Supprimer un utilisateur
 *
 * @param   {Number}  req.params.id   Id de l'utilisateur souhaité.
 *
 * @return  {void}               
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.getOneUser(req.params.id);
        await Delete.imageUser(user.avatar);
        await User.deleteUser(req.params.id);
        await Image.deleteUser(req.params.id);
        res.status(201).json({ message: "Utilisateur supprimé !" });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }
}

/**
 * Modification de l'avatar d'un utilisateur
 *
 * @param   {Number}  req.params.id       Id de l'utilisateur souhaité.
 * @param   {String}  req.file.filename   Nom de fichier.
 *
 * @return  {void}                 
 */
exports.avatar = async (req, res, next) => {
    try {
        const answer = await User.getOneUser(req.params.id);
        if (answer) {
            await Delete.imageUser(answer.avatar);
        }
        await User.updateAvatar(req.file.filename, req.params.id);
        res.status(201).json({
            avatar: req.file.filename
        });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }
}





