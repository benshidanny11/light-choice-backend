'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      oid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      oprescription: {
        type: Sequelize.STRING
      },
      ostatus: {
        type: Sequelize.STRING
      },
      oaddress: {
        type: Sequelize.STRING
      },
      opaymentref: {
        type: Sequelize.STRING
      },
      oadrress: {
        type: Sequelize.STRING
      },
      oamount: {
        type: Sequelize.DOUBLE
      },
      orderedby: {
        type: Sequelize.STRING
      },
      approvedby: {
        type: Sequelize.STRING
      },
      orderpaid: {
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
    await queryInterface.dropTable('Orders');
  }
};