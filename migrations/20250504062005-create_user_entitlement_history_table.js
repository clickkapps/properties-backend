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
    return queryInterface.createTable('UserEntitlements', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      subscriptionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subscriptions',
          key: 'id'
        },
        allowNull: true,
        defaultValue: null
      },
      entitlement: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      entitlementAmountPaid: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      status: { // active / inactive
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('UserEntitlements');
  }
};
