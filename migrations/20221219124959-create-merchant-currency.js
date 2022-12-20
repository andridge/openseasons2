'use strict';

//const { v4 : uuidv4 }= require("uuid");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MerchantCurrencies', {
      id: {
        type: Sequelize.UUID,
        //defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      merchant_id: {
        type: Sequelize.STRING
      },
      currency_id: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('MerchantCurrencies');
  }
};