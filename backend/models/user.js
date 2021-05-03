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

async function findOneEmail(id) {
    try {
        const res = await database.findOne("SELECT avatar FROM users WHERE email = ?", [id]);
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