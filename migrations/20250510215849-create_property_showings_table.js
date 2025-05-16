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
      return queryInterface.createTable('PropertyShowings', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        propertyId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Properties',
            key: 'id'
          },
          onDelete: 'CASCADE',
          allowNull: false,
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
          onDelete: 'CASCADE',
          allowNull: true,
          defaultValue: null
        },
        appointmentDate: {
          type: Sequelize.DATE,
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
      return queryInterface.dropTable('PropertyShowings');
  }
};
