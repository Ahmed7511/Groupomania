const db = require('../config/database');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: db.User,
        key: 'id'
      }
    },
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: db.Message,
        key: 'message_id'
      }
    },
    comment: DataTypes.STRING,
  }, {  });
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Comment.belongsTo(models.Message, {
      foreignKey: 'messageId',
      as: 'message'
    });
  };
  return Comment;
};
