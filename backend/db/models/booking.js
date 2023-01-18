'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    spotId: DataTypes.INTEGER,
    useId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};