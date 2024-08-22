'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      pid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      pname: {
        type: Sequelize.STRING
      },
      pmark: {
        type: Sequelize.STRING
      },
      pdesc: {
        type: Sequelize.STRING
      },
      ptags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      pimage: {
        type: Sequelize.STRING
      },
      pprice: {
        type: Sequelize.DOUBLE
      },
      uid: {
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
    await queryInterface.dropTable('Products');
  }
};