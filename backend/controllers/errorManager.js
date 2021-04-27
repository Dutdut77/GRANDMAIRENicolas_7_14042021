function translate(object) {
    
    if (object.errno === 1062) {
        object = "Adresse Email déjà prise !";
    }
    return object;
}

/**
 * [exports description]
 *
 * @param   {Object}                      err  [err description]
 * @param   {Number}                      err.status  [err description]
 * @param   {String|Object}               err.msg  [err description]
 * @param   {module:http.ServerResponse}  res  [res description]
 *
 * @return  {void}      send response to the browser
 */
module.exports = function error(err, res) {

    const msgErreur = translate(err.msg)

    res.status(err.status | 500).json({ msgErreur })


}


