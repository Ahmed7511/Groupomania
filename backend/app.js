const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const UserRoutes = require('./Routes/User');
const MessageRoutes = require('./Routes/Message');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv').config(); // pour caché les donnés
//console.log(dotenv.parsed);
//database
const db = require('./config/database')
  

// test DB
db.sequelize.authenticate()
.then(() => console.log('database connected ...!'))
.catch(error => console.log(error))
const app = express();


app.use((req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header(
                    "Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
          );
          res.header(
                    "Access-Control-Allow-Methods",
                    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
          );
          next();
});
app.use(bodyParser.json());
app.use('/user', UserRoutes);
app.use('/message', MessageRoutes);
module.exports = app;
