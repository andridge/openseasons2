'use strict';
//const { v4 : uuidv4 }= require("uuid");
//const { v4 : uuidv4 }= require("uuid"); 
module.exports = (sequelize, DataTypes) => {
  
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber:DataTypes.STRING,
    mpesaPin:DataTypes.STRING,
    password:DataTypes.STRING,
    publicKey:DataTypes.TEXT('long'),
    privateKey:DataTypes.TEXT('long')
  }, {});
  //associations
  /*User.associate = function(models) {
    // associations can be defined here
    Member.belongsTo(models.Group,{foreignKey:'groupId'});
    Member.hasOne(models.Loan, { foreignKey:'loanId'});
  }; */
  return User;
};