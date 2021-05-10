async function add(image) {
    try {
        console.log(Date());
        
        const res = await database.Image("INSERT INTO images (id_parent, userId, content, date, image_url) VALUES (?,?,?,?,?)", [image.body.id_parent, image.body.userId, image.body.content, Date(), image.file.filename]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

async function getOneStorie(id) {
    try {
        const res = await database.FindOne("SELECT * FROM images WHERE id = ?", [id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

async function getAllStorie() {
    try {
        const res = await database.Image("SELECT * FROM images");
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}


async function deleteStorie(id) {
    try {
        const res = await database.Image("DELETE FROM images WHERE id = ?", [id]);
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
module.exports.getOneStorie = getOneStorie;
module.exports.getAllStorie = getAllStorie;
module.exports.deleteStorie = deleteStorie;