const express = require('express');
const userRoutes = require('./routes/user');
const app = express();
const path = require('path');
const { Sequelize } = require('sequelize');
const helmet = require('helmet');
const Ddos = require('ddos');
var ddos = new Ddos({ burst: 10, limit: 15 })


const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:  'mysql' 
  });

  (async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  })();




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