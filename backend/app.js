const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');
const imagesRoutes = require('./routes/image');
const helmet = require('helmet');
const Ddos = require('ddos');
const fs = require('fs');
var ddos = new Ddos({ burst: 10, limit: 15 });

global.errorManager = require("./controllers/errorManager");
global.database = require("./models/dataManager");
database.start();

app.use(ddos.express);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/public', express.static(path.join(__dirname, 'public_html')));
app.use('/', express.static(path.join(__dirname, 'public_html')));
app.use('/api/auth', userRoutes);
app.use('/api/image', imagesRoutes);
// app.get('/', function(req, res,next) {
// const content = fs.readFileSync("./public_html/index.html");
// res.send(content);
// });

module.exports = app;