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
    return queryInterface.createTable('Properties', {
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
      creatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      },
      offerType: {
        type: Sequelize.ENUM({ values: ['rent', 'sale'] }), // rent | sale
        allowNull: true,
        defaultValue: null
      },
      amount: {
        type: Sequelize.DOUBLE(10,2),
        allowNull: true,
        defaultValue: null
      },
      mainImagePath: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      published: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      publisherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: true,
        defaultValue: null
      },
      publishedAt: {
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
    return queryInterface.dropTable('Properties')

  }
};
