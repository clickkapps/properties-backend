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
    return queryInterface.createTable('Subscriptions', {
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
      serviceType: {
        type: Sequelize.STRING, // properties_promotion | package | conveyance | etc
        allowNull: true,
        defaultValue: null
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'pending', // pending | active | invalid
      },
      subscriptionType: {
        type: Sequelize.STRING, // one-time, daily, weekly, monthly every17days,
        allowNull: false,
        defaultValue: 'one-time',
      },
      amountPayable: {
        type: Sequelize.DOUBLE({ length: 8, decimals: 2}),
        allowNull: true,
        defaultValue: 0.00,
      },
      amountPaid: {
        type: Sequelize.DOUBLE({ length: 8, decimals: 2}),
        allowNull: true,
        defaultValue: 0.00,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Subscriptions', {})
  }
};
