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
    await queryInterface.addColumn('Subscriptions','invoiceId', { // default (basic, standard), property_promotion, advertisement
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }, )
    await queryInterface.addColumn('Subscriptions','lastInvoiceSentAt', { // default (basic, standard), property_promotion, advertisement
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    }, )
    await queryInterface.addColumn('Subscriptions','invoiceNotificationsCount', { // default (basic, standard), property_promotion, advertisement
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    }, )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Subscriptions', 'invoiceId', )
    await queryInterface.removeColumn('Subscriptions', 'lastInvoiceSentAt', )
    await queryInterface.removeColumn('Subscriptions', 'invoiceNotificationsCount', )
  }
};
