/*global error */
const Image = require('../models/image');
const Delete = require('../middleware/delete');


exports.addStorie = async (req, res, next) => {
    try {
        console.log(req);
        await Image.addStorie(req);
        res.status(201).json({
            ...req.body,
            content: `${req.protocol}://${req.get('host')}/images/stories/${req.file.filename}`,
        });
    }
    catch (receivedError) {
        error(receivedError, res);
    }
}

exports.addComment = async (req, res, next) => {
    try {
        await Image.addComment(req);
        res.status(201).json({ ...req.body });
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


exports.deleteStorie = async (req, res, next) => {
    try {
        const Storie = await Image.getOneStorie(req.params.id);
        await Delete.imageStorie(Storie.image_url);
        await Image.deleteStorie(req.params.id);
        res.status(201).json({ message: "Storie supprimée !" });
    }
    catch (receivedError) {
        errorManager(receivedError, res);
    }
}

