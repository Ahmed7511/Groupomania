const express = require('express');
const helmet = require("helmet"); //pour aider a protéger les en-têtes HTTP.
const bodyParser = require('body-parser');
const UserRoutes = require('./Routes/User');
const MessageRoutes = require('./Routes/Message');
const adminRoutes = require('./Routes/admin');
const CommentRoutes = require('./Routes/Comment');
const ReactRoutes= require('./Routes/Like');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv').config(); // pour caché les donnés
//console.log(dotenv.parsed);
//database
const db = require('./config/database');
const admin = require('./middleware/admin');
  

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
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/user', UserRoutes);
app.use('/message', MessageRoutes);
app.use('/admin', adminRoutes);
app.use('/comment', CommentRoutes);
app.use('/react', ReactRoutes);
module.exports = app;
