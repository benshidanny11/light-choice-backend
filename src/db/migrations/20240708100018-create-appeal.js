'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appeals', {
      aid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      requesterid: {
        type: Sequelize.STRING
      },
      orderid: {
        type: Sequelize.STRING
      },
      appealmsg: {
        type: Sequelize.STRING
      },
      appealreason: {
        type: Sequelize.STRING
      },
      appealstatus:{
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Appeals');
  }
};