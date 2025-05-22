'use strict';

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
    return queryInterface.bulkInsert('PropertyCategories', [
      {
        title: 'Apartments',
        slug: 'apartments',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Hotels',
        slug: 'hotels',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'House',
        slug: 'house',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // return queryInterface.bulkDelete('PropertyCategories', null, {} )
  }
};
