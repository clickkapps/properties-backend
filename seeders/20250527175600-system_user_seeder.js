'use strict';

const bcrypt = require("bcrypt");
const {Op} = require("@sequelize/core");
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
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'System',
        lastName: 'GhanaMLS',
        loginId: 'system_983',
        contactEmail: 'system@properties.com',
        contactPhone: '0000000000',
        requiresPasswordUpdate: false,
        basicInfoUpdatedAt: new Date(),
        role: 'system',
        password: await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Support',
        lastName: 'GhanaMLS',
        loginId: 'support_442',
        contactEmail: 'support@ghanamls.org',
        contactPhone: '0244556677',
        contactAddress: 'East Legon Hills',
        contactCountry: 'Ghana',
        contactRegion: 'Accra',
        requiresPasswordUpdate: false,
        basicInfoUpdatedAt: new Date(),
        role: 'support',
        password: await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', {
      [Op.or]: [
        { loginId: 'system_983' },
        { loginId: 'support_442' },
      ]
    });
  }
};
