'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Properties','address', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }, )
    await queryInterface.addColumn('Properties','country', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }, )
    await queryInterface.addColumn('Properties','region', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }, )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Properties','address');
    await queryInterface.removeColumn('Properties','country');
    await queryInterface.removeColumn('Properties','region');
  }
};
