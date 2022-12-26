'use strict';
module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define('Merchant', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    mpesaPin: DataTypes.STRING,
    publicKey: DataTypes.TEXT('long'),
    currency_id: DataTypes.STRING
  }, {});
  return Merchant;
};