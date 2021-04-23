const mariadb = require('mariadb');

async function addUser(user) { 
    try {
        const conn = await pool.getConnection(); 
        const res = await conn.query("SELECT * FROM users");
        return res;
    }
    catch (error) {
        throw ({
            status : 500,
            msg : error
        });
    }    
}

async function findOneEmail(id) { 
    try {
        const conn = await pool.getConnection();         
        const res = await conn.query("SELECT email FROM users WHERE email = ?", [id]);
        console.log(res);
        return res;
    }
    catch (error) {
        throw ({
            status : 500,
            msg : error
        });
    }    
}




module.exports.addUser = addUser;
module.exports.findOneEmail = findOneEmail;