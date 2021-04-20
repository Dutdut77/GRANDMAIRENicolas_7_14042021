const express = require('express');
const mariadb = require('mariadb');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');
const helmet = require('helmet');
const Ddos = require('ddos');
var ddos = new Ddos({ burst: 10, limit: 15 });


global.pool = mariadb.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});


app.use(ddos.express);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(helmet());
app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/api/auth', userRoutes);



module.exports = app;