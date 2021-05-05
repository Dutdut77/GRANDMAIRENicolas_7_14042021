const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function addUser(user) {
    try {
        const pass = await bcrypt.hash(user.body.password, 10);
        const res = await database.addUser("INSERT INTO users(prenom, nom, pseudo, password, email, avatar, id_roles) VALUES (?,?,?,?,?,?,?)", [user.body.prenom, user.body.nom, user.body.pseudo, pass, user.body.email, user.file.filename, user.body.role]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

async function findOneEmail(email) {
    try {
        const res = await database.findOne("SELECT * FROM users WHERE email = ?", [email]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

async function findOneId(id) {
    try {
        const res = await database.findOne("SELECT * FROM users WHERE id = ?", [id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}


async function updateUser(user) {
    try {

        const pass = await bcrypt.hash(user.body.password, 10);
        const res = await database.addUser("INSERT INTO users(prenom, nom, pseudo, password, email, avatar, id_roles) VALUES (?,?,?,?,?,?,?)", [user.body.prenom, user.body.nom, user.body.pseudo, pass, user.body.email, user.file.filename, user.body.role]);
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
module.exports.findOneEmail = findOneEmail;
module.exports.findOneId = findOneId;
module.exports.updateUser = updateUser;