const fs = require('fs');


/**
 * Supprime la photo de l'utilisateur
 *
 * @param   {String}  imageUrl  nom de la photo de l'utilisateur
 *
 *
 */
async function user(imageUrl) {
    try {
        const res = await fs.unlink(process.cwd() + "/images/" + imageUrl, (err) => {
            if (err) throw err;
        });
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

module.exports.user = user;


