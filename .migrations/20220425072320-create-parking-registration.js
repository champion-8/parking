'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParkingRegistrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subParkingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SubParkings',
          key: 'id'
        }
      },
      carSizeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CarSizes',
          key: 'id'
        }
      },
      numberPlate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      registrationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      leaveDate: {
        type: Sequelize.DATE
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ParkingRegistrations');
  }
};