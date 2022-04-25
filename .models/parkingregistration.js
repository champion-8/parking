'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParkingRegistration.belongsTo(models.SubParking, {
        foreignKey: 'subParkingId',
        as: 'subParkings'
      });
      ParkingRegistration.belongsTo(models.CarSize, {
        foreignKey: 'carSizeId',
        as: 'carSizes'
      });
    }
  }
  ParkingRegistration.init({
    subParkingId: DataTypes.INTEGER,
    carSizeId: DataTypes.INTEGER,
    numberPlate: DataTypes.STRING,
    registrationDate: DataTypes.DATE,
    leaveDate: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ParkingRegistration',
  });
  return ParkingRegistration;
};