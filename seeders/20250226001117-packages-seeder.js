'use strict';

const moment = require("moment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Packages', [
        {
          slug: "basic",
          name: "Basic",
          group: "entitlement",
          frequency: "one_time",
          description: "Basic plan",
          price: 100,
          currency: "GHS",
          createdAt: moment().toDate(),
          updatedAt: moment().toDate()
        },
       {
          slug: "standard",
          name: "Standard",
          group: "entitlement",
          frequency: "one_time",
          description: "Standard plan",
          price: 200,
          currency: "GHS",
          createdAt: moment().toDate(),
          updatedAt: moment().toDate()
       },
        {
            slug: "properties_promotion",
            name: "Properties Promotion",
            group: "properties_promotion",
            frequency: "daily",
            description: "Package for promoting properties",
            price: 20,
            currency: "GHS",
            createdAt: moment().toDate(),
            updatedAt: moment().toDate()
        },
        {
            slug: "advertisement",
            name: "Advertisement",
            group: "advertisement",
            frequency: "daily",
            description: "Package for advertising on the website",
            price: 15,
            currency: "GHS",
            createdAt: moment().toDate(),
            updatedAt: moment().toDate()
        }

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
