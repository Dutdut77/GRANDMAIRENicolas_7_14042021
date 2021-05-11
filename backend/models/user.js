const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function addUser(user) {
    try {
        const pass = await bcrypt.hash(user.body.password, 10);
        const res = await database.User("INSERT INTO users(prenom, nom, pseudo, password, email, avatar, id_roles) VALUES (?,?,?,?,?,?,?)", [user.body.prenom, user.body.nom, user.body.pseudo, pass, user.body.email, user.file.filename, user.body.role]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

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

async function emailExists(email) {
    try {
        return  await database.existsInTable("users", "email", email);
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}



async function updateUser(user, id) {
    try {
        const pass = await bcrypt.hash(user.password, 10);
        const res = await database.User("UPDATE users SET prenom=?, nom=?, pseudo=?, password=?, email=? WHERE id=?", [user.prenom, user.nom, user.pseudo, pass, user.email, id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

async function getOneUser(id) {
    try {
        const res = await database.FindOne("SELECT a.prenom, a.nom, a.email, a.pseudo, a.avatar, b.titre FROM users AS a INNER JOIN roles AS b ON a.id_roles = B.id WHERE a.id = ?", [id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

async function getAllUser() {
    try {
        const res = await database.User("SELECT a.prenom, a.nom, a.email, a.pseudo, a.avatar, b.titre FROM users AS a INNER JOIN roles AS b ON a.id_roles = B.id");
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

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