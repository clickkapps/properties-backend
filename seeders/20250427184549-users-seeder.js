'use strict';

const {Op} = require("@sequelize/core");
const bcrypt = require("bcrypt");
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
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Super',
        lastName: 'Admin',
        loginId: process.env.ADMIN_DEFAULT_EMAIL,
        contactEmail: process.env.ADMIN_DEFAULT_EMAIL,
        contactPhone: process.env.ADMIN_CONTACT_PHONE,
        requiresPasswordUpdate: true,
        basicInfoUpdatedAt: new Date(),
        role: 'admin',
        password: await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Developer',
        lastName: 'Admin',
        loginId: process.env.DEV_DEFAULT_EMAIL,
        contactEmail: process.env.DEV_DEFAULT_EMAIL,
        contactPhone: process.env.ADMIN_CONTACT_PHONE,
        requiresPasswordUpdate: false,
        basicInfoUpdatedAt: new Date(),
        role: 'admin',
        password: await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', null, {
      where: {
        [Op.or]: [
          { loginId: 'admin@properties.com'},
          { loginId: 'dev@properties.com'},
        ]
      }
    } )
  }
};
