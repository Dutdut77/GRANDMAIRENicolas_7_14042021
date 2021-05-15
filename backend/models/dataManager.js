
const mariadb = require('mariadb');
let conn;

const pool = mariadb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE });


module.exports.start = async function () {
    conn = await pool.getConnection();
}

async function request(sql, data = []) {
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
 * Vérifie si "champ / Valeur" existe dans la Bdd
 *
 * @param   {String}  table                Nom de la table SQL
 * @param   {String}  fieldName            Nom du champ de la table
 * @param   {String}  value                Valeur du champ
 *
 * @return  {Boolean}                      True ou False
 */
module.exports.existsInTable = async function (table, fieldName, value) {
    const anwser = await findOne(`SELECT id FROM ${table} WHERE ${fieldName} = ?`, [value]);
    return anwser === undefined ? false : true;
}




