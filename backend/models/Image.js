const db = require('../config/database');
'use strict';
module.exports = (sequelize, DataTypes) => {
const Image = sequelize.define('Image', {
 
    id: {
        type: DataTypes.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true
      },
      type: DataTypes.STRING,
      name: DataTypes.STRING,
    
    messageId: {
      type: DataTypes.INTEGER,
      references: { 
         model: db.Message, 
          key: 'message_id' },
      allowNull: false
      },
    data: {
    type: DataTypes.BLOB('long')
    }
  });
  Image.associate = (models) => {
    Image.belongsTo(models.Message, {
      foreignKey: {
        allowNull: false
      }
    });
}
  return Image;
}