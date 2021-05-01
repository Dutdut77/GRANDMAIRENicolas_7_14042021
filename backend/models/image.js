

async function add(image) { 
 
    try {
  
        const res = await database.addImage("INSERT INTO images(id_parent, userId, content, date, image_url) VALUES (?,?,?,?,?)", [image.id_parent, image.userId, image.content, image.date, image.image_url]);
        return res;
    }
    catch (error) {
            throw ({
            status: 500,
            msg: error
        });
    }
}




module.exports.add = add;
