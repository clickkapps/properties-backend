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
    return queryInterface.createTable('FeatureViews', {
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
        allowNull: true,
        defaultValue: null,
        onDelete: 'CASCADE',
      },
      advertisementId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Properties',
          key: 'id'
        },
        allowNull: true,
        defaultValue: null,
        onDelete: 'CASCADE',
      },
      feature: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      dailyViews: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('FeatureViews');
  }
};
