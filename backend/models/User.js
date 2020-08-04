'use strict';
 const bcrypt = require('bcrypt')
 const express = require('express');
const sequelize = require('../config/database');
// const Message = require('../models/message');
module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define('User', {
  email: {type : DataTypes.STRING,
          unique: true          
      },
pseudo: {type : DataTypes.STRING,
  unique: true          
},
password:{type:DataTypes.STRING },

});
User.associate = (models) => {
  User.hasMany(models.Message,{ foreignKey: 'userId' }, { onDelete: 'cascade' })
//  //User.hasMany(models.Like,{ foreignKey: 'userId' }, { onDelete: 'cascade' }),
User.hasMany(models.Comment,{ foreignKey: 'userId' }, { onDelete: 'cascade' })
 };
  return User;
}

 