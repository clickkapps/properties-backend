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
    await queryInterface.addColumn('Users','contactAddress', { // default (basic, standard), property_promotion, advertisement
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }, )
    await queryInterface.addColumn('Users','contactCountry', { // default (basic, standard), property_promotion, advertisement
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }, )
    await queryInterface.addColumn('Users','contactRegion', { // default (basic, standard), property_promotion, advertisement
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
    await queryInterface.removeColumn('Users', 'contactAddress', )
    await queryInterface.removeColumn('Users', 'contactCountry', )
    await queryInterface.removeColumn('Users', 'contactRegion', )
  }
};
