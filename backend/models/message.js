'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  //  like : DataTypes.INTEGER 
  userId: {
    type: DataTypes.INTEGER,
    references: { 
        model: db.user, 
        key: 'id' },
    allowNull: false
    },
  });
  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  // Message.hasMany(models.Like, { foreignKey: 'messageId'}, { onDelete: 'cascade' }),
  // Message.hasMany(models.Comment, { foreignKey: 'messageId'}, { onDelete: 'cascade' })
  };
  return Message;
} 