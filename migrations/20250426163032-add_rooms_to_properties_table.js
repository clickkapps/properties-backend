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
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Properties','rooms', {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        }, { transaction: t },),
        queryInterface.addColumn('Properties','washrooms', {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        }, { transaction: t },),
        queryInterface.addColumn('Properties','kitchens', {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        }, { transaction: t },),

      ]);
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Properties', 'rooms', { transaction: t }),
        queryInterface.removeColumn('Properties', 'washrooms', { transaction: t,}),
        queryInterface.removeColumn('Properties', 'kitchens', { transaction: t,}),
      ]);
    });
  }
};
