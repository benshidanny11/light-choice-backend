'use strict';
import { v4 as uuid } from 'uuid';
import { generatePassword } from '../../helpers';
import dotenv from 'dotenv';

dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const {ADMIN_PHONE_NUMBER, ADMIN_PASSWORD, ADMIN_EMAIL}=process.env;

    await queryInterface.bulkInsert('Users', [
      {
        uid: uuid(),
        firstname: 'Ntaganzwa',
        lastname: 'Roger',
        email: ADMIN_EMAIL,
        phonenumber: ADMIN_PHONE_NUMBER,
        username: 'roger',
        role:'ADMIN',
        password: generatePassword(ADMIN_PASSWORD),
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
