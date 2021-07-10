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
        const res = await database.FindOne("SELECT a.id, a.content, DATE_FORMAT(a.date, '%d-%m-%Y') AS date, b.pseudo, b.nom, b.prenom FROM images AS a INNER JOIN users AS b ON a.userId = b.id WHERE a.id = ?", [id]);
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
 * Compte le nombre de photo d'un user
 *
 * @param   {Number}  id  Id du user
 *
 * @return  {Object}      Nombre de photo
 */
 async function countUserPhoto(id) {
    try {
        const res = await database.FindOne("SELECT COUNT(*) AS nbPhoto FROM images WHERE id_parent = 0 AND userId = ?", [id]);
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
 * Compte le nombre de commentaires d'un user
 *
 * @param   {Number}  id  Id du user
 *
 * @return  {Object}      Nombre de photo
 */
 async function countUserCommentPhoto(id) {
    try {
        const res = await database.FindOne("SELECT COUNT(*) AS nbComment FROM images WHERE id_parent != 0 AND userId = ?", [id]);
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
        const res = await database.Image("SELECT a.id, a.content, DATE_FORMAT(a.date, '%d-%m-%Y') AS date, b.pseudo FROM images AS a LEFT JOIN users AS b ON a.userId = b.id WHERE a.id_parent = ?", [0]);
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
 async function getAllCommentaires(id) {
    try {
        const res = await database.Image("SELECT a.id, a.userId, a.content, DATE_FORMAT(a.date, '%d-%m-%Y') AS date, b.pseudo FROM images AS a LEFT JOIN users AS b ON a.userId = b.id WHERE a.id_parent = ? ORDER BY a.date DESC", [id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
};

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
};

/**
 * Effacer une storie dans la Bdd
 *
 * @param   {Number}  id  Id de la storie
 *
 * @return  {Void}     
 */
 async function deleteCommentaire(id) {
    try {
        const res = await database.Image("DELETE FROM images WHERE id = ?", [id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
};


/**
 * Effacer photos et commentaires d'un utilisateur
 *
 * @param   {Number}  id  id de l'utilisateur
 *
 * @return  {void}      
 */
 async function deleteUser(id) {
    try {
        const res = await database.User("DELETE FROM images WHERE userId = ?", [id]);
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
module.exports.getAllCommentaires = getAllCommentaires;
module.exports.deleteStorie = deleteStorie;
module.exports.deleteCommentaire = deleteCommentaire;
module.exports.countUserPhoto = countUserPhoto;
module.exports.countUserCommentPhoto = countUserCommentPhoto;
module.exports.deleteUser = deleteUser;