'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CarSize.hasMany(models.ParkingRegistration, {
        foreignKey: 'carSizeId',
        as: 'CarSizes'
      });
    }
  }
  CarSize.init({
    name: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CarSize',
  });
  return CarSize;
};