'use strict';

//const { v4 : uuidv4 }= require("uuid");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.createTable('Payments', {
      id: {
        type: Sequelize.UUID,
        //defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      transaction_id: {
        type: Sequelize.STRING
      },
      merchant_id: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      currency_id: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};