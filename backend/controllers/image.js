/*global error */
const Image = require('../models/image');
const Delete = require('../middleware/delete');
const sharp = require('sharp');

/**
 * Ajouter une storie
 *
 * @param   {Object}  req                 Champs du formulaire
 * @param   {String}  req.file.filename   Nom de l'image
 * @param   {Number}  req.body.userId     Id de l'utilisateur
 * @param   {Number}  req.body.id_parent  0
 *
 *
 */
exports.addStorie = async (req, res, next) => {

    try {
        const name = Date.now() + '-' + req.file.originalname.split(' ').join('_');
        //const newName = `${req.protocol}://${req.get('host')}/images/stories/${name}`
        await sharp(req.file.buffer)
        .resize(1000)
        .toFile("./images/stories/" + name);

        await Image.addStorie({userId : req.body.userId, content : name});
        res.status(201).json({
            ...req.body,
            content: `${req.protocol}://${req.get('host')}/images/stories/${name}`,
        });
    }
    catch (receivedError) {
          error(receivedError, res);
    }
}

/**
 * Ajouter un commentaire à une storie
 *
 * @param   {Object}  req                  Champs du formulaire
 * @param   {String}  req.body.content     Commentaire
 * @param   {Number}  req.body.userId      Id de l'utilisateur
 * @param   {Number}  req.body.id_parent   Id de la storie
 *
 *
 */
exports.addComment = async (req, res, next) => {
    try {
        await Image.addComment(req);
        res.status(201).json({ ...req.body });
    }
    catch (receivedError) {
        error(receivedError, res);
    }
}


/**
 * Afficher une storie
 *
 * @param   {Number}  req.params.id   Id de la storie souhaitée
 *
 * @return  {JSON}                    Json des info de la storie
 */
exports.getOneStorie = async (req, res, next) => {
    try {
        const Storie = await Image.getOneStorie(req.params.id);
        res.status(201).json({ Storie });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }

}

/**
 * Afficher toutes les stories
 *
 *
 * @return  {JSON}        JSON de toutes les stories
 */
exports.getAllStorie = async (req, res, next) => {
    try {
        const Storie = await Image.getAllStorie();
        res.status(201).json({ Storie });

    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }

}

/**
 * Afficher une storie
 *
 * @param   {Number}  req.params.id   Id de la storie souhaitée
 *
 * @return  {JSON}                    Json des info de la storie
 */
 exports.getAllCommentaires = async (req, res, next) => {
    try {
        const Commentaires = await Image.getAllCommentaires(req.params.id);
        res.status(201).json({ Commentaires });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }

}

/**
 * Compter le nombre de photos posté par un utilisateur
 *
 * @param   {Number}  req.params.id   Id du user souhaitée
 *
 * @return  {JSON}                    Nombre de photos
 */
 exports.countUserPhoto = async (req, res, next) => {
    
    try {
        const NbPhoto = await Image.countUserPhoto(req.params.id);
        res.status(201).json({ NbPhoto : NbPhoto.nbPhoto });

    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }

}

/**
 * Compter le nombre de commentaires posté par un utilisateur
 *
 * @param   {Number}  req.params.id   Id du user souhaitée
 *
 * @return  {JSON}                    Nombre de photos
 */
 exports.countUserCommentPhoto = async (req, res, next) => {
    try {        
        const NbComment = await Image.countUserCommentPhoto(req.params.id);
        res.status(201).json({ NbComment : NbComment.nbComment });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }

}

/**
 * Effacer une storie
 *
 * @param   {Number}  req.parmas.id  Champs du formulaire
 *
 *
 */
exports.deleteStorie = async (req, res, next) => {
    try {
        const Storie = await Image.getOneStorie(req.params.id);
        await Delete.imageStorie(Storie.content);
        await Image.deleteStorie(req.params.id);
        res.status(201).json({ message: "Storie supprimée !" });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }
}

/**
 * Effacer une storie
 *
 * @param   {Number}  req.parmas.id  Champs du formulaire
 *
 *
 */
 exports.deleteCommentaire = async (req, res, next) => {
    try {
        await Image.deleteCommentaire(req.params.id);
        res.status(201).json({ message: "Commentaire supprimée !" });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }
}