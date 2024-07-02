'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      oid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
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
      oamount: {
        type: Sequelize.DOUBLE
      },
      productid: {
        type: Sequelize.STRING
      },
      oquantity: {
        type: Sequelize.STRING
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