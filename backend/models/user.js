const mariadb = require('mariadb');


  //const pool =  mariadb.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
  const pool = mariadb.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});


async function addUser(email, password) { 
    try {
        const conn = await pool.getConnection();
        const res = await conn.query("select * FROM users");
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

