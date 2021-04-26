async function addUser(user) {
    try {
        const res = await database.findAll("INSERT INTO users(prenom, nom, pseudo, password, email, avatar, role) VALUES (?,?,?,?,?,?,?)", [user.prenom, user.nom, user.pseudo, user.password, user.email, user.avatar, user.role]);
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
        const res = await database.findOne("SELECT email FROM users WHERE email = ?", [id]);
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