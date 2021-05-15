/**
 * Ajouter une stories dans la base donnée
 *
 * @param   {Object}  image  Champs du formulaire
 *
 * @return  {void}         
 */
async function addStorie(image) {
    try {
        const res = await database.Image("INSERT INTO images (id_parent, userId, content) VALUES (?,?,?)", [image.body.id_parent, image.body.userId, image.file.filename]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

/**
 * Ajouter un commentaire dans la base de donnée
 *
 * @param   {Object}  req  Champs du formulaire
 *
 * @return  {void}   
 */
async function addComment(req) {
    try {
        const res = await database.Image("INSERT INTO images (id_parent, userId, content) VALUES (?,?,?)", [req.body.id_parent, req.body.userId, req.body.content]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

/**
 * Rechercher une storie dans la Bdd
 *
 * @param   {Number}  id  Id de la storie
 *
 * @return  {Object}      Info de la storie
 */
async function getOneStorie(id) {
    try {
        const res = await database.FindOne("SELECT * FROM images WHERE id = ?", [id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

/**
 * Rechercher toutes les stories dans la Bdd
 *
 * @return  {Object}  Info de toutes les stories
 */
async function getAllStorie() {
    try {
        const res = await database.Image("SELECT * FROM images");
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

/**
 * Effacer une storie dans la Bdd
 *
 * @param   {Number}  id  Id de la storie
 *
 * @return  {Void}     
 */
async function deleteStorie(id) {
    try {
        const res = await database.Image("DELETE FROM images WHERE id = ? OR id_parent = ?", [id, id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

module.exports.addStorie = addStorie;
module.exports.addComment = addComment;
module.exports.getOneStorie = getOneStorie;
module.exports.getAllStorie = getAllStorie;
module.exports.deleteStorie = deleteStorie;