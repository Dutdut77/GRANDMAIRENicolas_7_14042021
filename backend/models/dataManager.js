
const mariadb = require('mariadb');
let conn;

const pool = mariadb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE });


module.exports.start  = async function() {
    conn = await pool.getConnection();
}

async function request(sql, data = []){
    const res = await conn.query(sql, data);
    delete res["meta"];
    return res;
}

async function findOne(sql, data = []) {    
    const res = await conn.query(sql, data);
    delete res["meta"];
    return res[0];
}

module.exports.User = request;
module.exports.Image = request;
module.exports.FindOne = findOne;

/**
 * [existsInTable description]
 *
 * @param   {String}  table                [table description]
 * @param   {String}  fieldName  the filed name
 * @param   {String}  value      the filed name
 *
 * @return  {Boolean}                      exists or not
 */
module.exports.existsInTable = async function(table, fieldName, value){
    const anwser = await findOne(`SELECT id FROM ${table} WHERE ${fieldName} = ?`, [value]);
    return anwser === undefined ? false : true;
} 




