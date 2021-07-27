function translate(object) {


    if (object.errno === 1062) {
        object = "Adresse Email déjà prise !";
    }
    return object;
}

/**
 * exports description
 *
 * @param   {Object}                      err          err description
 * @param   {Number}                      err.status   status de l'erreur
 * @param   {String|Object}               err.msg      numéro du message d'erreur
 * @param   {module:http.ServerResponse}  res  
 *
 * @return  {void}      send response to the browser
 */
module.exports = function (err, res) {

    const msgErreur = translate(err.msg)

    res.status(err.status | 500).json({ msgErreur })


}


