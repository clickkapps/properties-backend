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
    await queryInterface.addColumn('Subscriptions','serverId', { // default (basic, standard), property_promotion, advertisement
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }, )
    await queryInterface.addColumn('Subscriptions','payload', { // default (basic, standard), property_promotion, advertisement
      type: Sequelize.TEXT,
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
    await queryInterface.removeColumn('Subscriptions', 'serverId', )
    await queryInterface.removeColumn('Subscriptions', 'payload', )
  }
};
