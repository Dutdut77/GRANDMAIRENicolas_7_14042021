const fs = require('fs');


/**
 * Supprime physiquement la photo de l'utilisateur
 *
 * @param   {String}  imageUrl  nom de la photo de l'utilisateur
 *
 *
 */
async function imageUser(imageUrl) {
    try {
        const res = await fs.unlink(process.cwd() + "/images/users/" + imageUrl, (err) => {
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


/**
 * Supprime physiquement la photo de l'image
 *
 * @param   {String}  imageUrl  nom de la photo de l'utilisateur
 *
 *
 */
async function imageStorie(imageUrl) {
    try {
        const res = await fs.unlink(process.cwd() + "/images/stories/" + imageUrl, (err) => {
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

module.exports.imageUser = imageUser;
module.exports.imageStorie = imageStorie;

