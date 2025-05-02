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
    return queryInterface.createTable('Advertisements', {
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
      status: {
        type: Sequelize.STRING, //  active, completed
        allowNull: true,
        defaultValue: null
      },
      subscriptionId: { // last active subscription
        type: Sequelize.INTEGER,
        references: {
          model: 'Subscriptions',
          key: 'id'
        },
        allowNull: true,
        defaultValue: null
      },
      startFrom: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: null
      },
      endAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: null
      },
      contactPhone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      contactEmail: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      imagePath: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      link: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('Advertisements');
  }
};
