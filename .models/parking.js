'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parking.hasMany(models.SubParking, {
        foreignKey: 'parkingId',
        as: 'subParkings'
      });
    }
  }
  Parking.init({
    name: DataTypes.STRING,
    slot: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Parking',
  });
  return Parking;
};