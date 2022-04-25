'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubParkings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parkingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Parkings',
          key: 'id'
        }
      },
      seq: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isAvailable: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('SubParkings');
  }
};