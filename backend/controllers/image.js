/*global error */
const Image = require('../models/image');
const Delete = require('../middleware/delete');


exports.addImage = async (req, res, next) => {
    try {
        await Image.add(req);
        res.status(201).json({
            content: req.body.content
        });
    }
    catch (receivedError) {
        error(receivedError, res);
    }
}

exports.getOneStorie = async (req, res, next) => {
    try {
        const Storie = await Image.getOneStorie(req.params.id);
        res.status(201).json({ Storie });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }

}

exports.getAllStorie = async (req, res, next) => {
    try {
        const Storie = await Image.getAllStorie();
        res.status(201).json({ Storie });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }

}


exports.deleteImage = async (req, res, next) => {
    try {
        const Storie = await Image.getOneStorie(req.params.id);
        await Delete.imageStorie(Storie.image_url);
        await Image.deleteStorie(req.params.id);
        res.status(201).json({ message: "Utilisateur supprimé !" });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }
}

