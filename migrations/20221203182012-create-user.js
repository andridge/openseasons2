'use strict';
//const { v4 : uuidv4 }= require("uuid");
//const { v4 : uuidv4 }= require("uuid");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        //defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
    
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber:{
        type: Sequelize.STRING
      },
      mpesaPin:{
        type:Sequelize.STRING
      },
      password:{
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
    await queryInterface.dropTable('Users');
  }
};