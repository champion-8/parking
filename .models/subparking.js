'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubParking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubParking.belongsTo(models.Parking, {
        foreignKey: 'parkingId',
        as: 'Parkings'
      });
    }
  }
  SubParking.init({
    name: DataTypes.STRING,
    parkingId: DataTypes.INTEGER,
    seq: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SubParking',
  });
  return SubParking;
};