const db = require('../config/database');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      field: 'message_id',
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  UserId: {
    type: DataTypes.INTEGER,
    references: { 
       model: db.User, 
        key: 'id' },
    allowNull: false
    },
    imageUrl: DataTypes.STRING
  });
  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  Message.hasMany(models.Like, { foreignKey: 'messageId'}, { onDelete: 'cascade' }),
  Message.hasMany(models.Comment, { foreignKey: 'messageId'}, { onDelete: 'cascade' })
  };
  return Message;
} 
