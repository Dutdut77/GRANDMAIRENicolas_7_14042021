const express = require('express');


async function user(imageUrl) {
    try {
        
        const res = await fs.unlink(process.cwd() + "/images/" + imageUrl, (err) => {
   
            if (err) throw err;
            console.log('path/file.txt was deleted');
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


