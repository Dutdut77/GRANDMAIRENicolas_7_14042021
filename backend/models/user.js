const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
 * Ajout d'un utilisateur dans la base de donnée
 *
 * @param   {Object}  user                Champs du formulaire
 * @param   {String}  user.body.prenom    Prénom de l'utilisateur
 * @param   {String}  user.body.nom       Nom de l'utilisateur
 * @param   {String}  user.body.pseudo    Pseudo de l'utilisateur
 * @param   {String}  user.body.password  Password de l'utilisateur
 * @param   {String}  user.body.email     Email de l'utilisateur
 * @param   {String}  user.body.avatar    URL du fichier
 * @param   {String}  user.body.role      Role de l'utilisateur 
 *
 * @return  {[type]}        [return description]
 */
async function addUser(user) {   
    try {
        const pass = await bcrypt.hash(user.password, 10);
        const res = await database.User("INSERT INTO users(prenom, nom, pseudo, password, email, avatar, id_roles) VALUES (?,?,?,?,?,?,?)", [user.prenom, user.nom, user.pseudo, pass, user.email, user.avatar, user.role]);
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
 * Rechercher un email
 *
 * @param   {string}  email  Email de l'utilisateur
 *
 * @return  {Object}         Toutes les infos de l'utilisateur correspondant
 */
async function findByEmail(email) {
    try {
        return await database.FindOne("SELECT * FROM users WHERE email = ?", [email])
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

/**
 * Vérifie si un Email existe
 *
 * @param   {string}  email  Email de l'utilisateur
 *
 * @return  {Boolean}        True or False
 */
async function emailExists(email) {
    try {
        return await database.existsInTable("users", "email", email);
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}


/**
 * Update de l'utilisateur
 *
 * @param   {Object}  user  Champs du formulaire
 * @param   {Number}  id    Id de l'utilisateur à mettre à jour.
 *
 * 
 */
async function updateUser(user, id) {
    try {
        const res = await database.User("UPDATE users SET prenom=?, nom=?, pseudo=? WHERE id=?", [user.prenom, user.nom, user.pseudo, id]);
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
 * Afficher un utilisateur
 *
 * @param   {Number}  id  Id de l'utilisateur
 *
 * @return  {OBject}      Information de l'utilisateur
 */
async function getOneUser(id) {
    try {
        const res = await database.FindOne("SELECT a.id, a.prenom, a.nom, a.email, a.pseudo, a.avatar, b.titre FROM users AS a INNER JOIN roles AS b ON a.id_roles = B.id WHERE a.id = ?", [id]);
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
 * Afficher tous les utilisateurs
 *
 * @return  {Object}  Tous les utilisateurs
 */
async function getAllUser() {
    try {
        const res = await database.User("SELECT a.id, a.prenom, a.nom, a.email, a.pseudo, a.avatar, b.titre FROM users AS a INNER JOIN roles AS b ON a.id_roles = B.id");
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
 * Effacer un utilisateur
 *
 * @param   {Number}  id  id de l'utilisateur
 *
 * @return  {void}      
 */
async function deleteUser(id) {
    try {
        const res = await database.User("DELETE FROM users WHERE id = ?", [id]);
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
 * Modification Avatar
 *
 * @param   {String}  avatar  URL de l'image
 * @param   {Number}  id      id de l'utilisateur
 *
 * @return  {void}         
 */
async function updateAvatar(avatar, id) {
    try {
        const res = await database.User("UPDATE users SET avatar=? WHERE id=?", [avatar, id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

module.exports.addUser = addUser;
module.exports.emailExists = emailExists;
module.exports.updateUser = updateUser;
module.exports.updateAvatar = updateAvatar;
module.exports.findByEmail = findByEmail;
module.exports.getOneUser = getOneUser;
module.exports.getAllUser = getAllUser;
module.exports.deleteUser = deleteUser;