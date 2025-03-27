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
     return queryInterface.addColumn('Properties','categoryId', {
       type: Sequelize.INTEGER,
       references: {
         model: 'PropertyCategories',
         key: 'id'
       },
       onDelete: 'CASCADE',
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
  }
};
