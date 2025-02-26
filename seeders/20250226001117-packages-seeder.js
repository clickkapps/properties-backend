'use strict';

const moment = require("moment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Packages', [
        {
          slug: "basic",
          name: "Basic",
          description: "Start plan",
          price: 100,
          currency: "USD",
          createdAt: moment().toDate(),
          updatedAt: moment().toDate()
        },
       {
          slug: "standard",
          name: "Standard",
          description: "Standard plan",
          price: 200,
          currency: "USD",
          createdAt: moment().toDate(),
          updatedAt: moment().toDate()
       },
      {
          slug: "premium",
          name: "Premium",
          description: "Premium plan",
          price: 350,
          currency: "USD",
          createdAt: moment().toDate(),
          updatedAt: moment().toDate()
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Packages', null, {} )
  }
};
