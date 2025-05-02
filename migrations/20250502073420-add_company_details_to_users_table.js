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

        queryInterface.addColumn('Users','companyName', { // default (basic, standard), property_promotion, advertisement
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        }, { transaction: t },),

        queryInterface.addColumn('Users','companyLocation', { // one_time, daily
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        }, { transaction: t },),

      ])
    } )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'companyName', )
    await queryInterface.removeColumn('Users', 'companyLocation' )
  }
};
