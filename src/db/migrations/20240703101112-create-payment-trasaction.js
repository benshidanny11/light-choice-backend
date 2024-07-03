'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentTrasactions', {
      payid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      paidby: {
        type: Sequelize.STRING
      },
      orderid: {
        type: Sequelize.STRING
      },
      paymentstatus: {
        type: Sequelize.STRING
      },
      paymentref: {
        type: Sequelize.STRING
      },
      paymentmode: {
        type: Sequelize.STRING
      },
      transactionamout: {
        type: Sequelize.DOUBLE
      },
      accountdebited: {
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
    await queryInterface.dropTable('PaymentTrasactions');
  }
};