'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      // define association here
      Image.belongsTo(models.Review, {foreignKey: 'imageId'})
      Image.belongsTo(models.Spot, {foreignKey: 'imageId'})
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageType: {
      type: DataTypes.ENUM('Spot', 'Review')
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
