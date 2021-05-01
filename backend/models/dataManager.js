
const mariadb = require('mariadb');
let conn;

const pool = mariadb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE });


module.exports.start  = async function() {
    conn = await pool.getConnection();
}


module.exports.addUser = async function(sql, data = []){
    const res = await conn.query(sql, data);
    delete res["meta"];
    return res;
}


module.exports.findAll = async function(sql, data = []){
    const res = await conn.query(sql, data);
    delete res["meta"];
    return res;
}

module.exports.findOne = async function(sql, data = []) {
    const res = await conn.query(sql, data);
    delete res["meta"];
    return res[0];
}

module.exports.addImage = async function(sql, data = []){
    const res = await conn.query(sql, data);
    delete res["meta"];
    return res;
}



