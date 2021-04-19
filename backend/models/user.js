async function addUser(email, password) { 
console.log('test');
    try {
        const res = await conn.query("INSERT INTO users value (?, ?)", [email, password]);
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        res.status(400).json({ error });
    }
    catch (err) {
        throw (error => res.status(500).json({ error }));
    }
}

