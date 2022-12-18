'use strict';
module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define('Merchant', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    mpesaPin: DataTypes.STRING,
    publicKey: DataTypes.STRING
  }, {});
  return Merchant;
};