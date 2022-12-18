'use strict';
//const { v4 : uuidv4 }= require("uuid");
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    transaction_id: DataTypes.STRING,
    merchant_id: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    currency_id: DataTypes.STRING,
    status: DataTypes.STRING,
    timestamp: DataTypes.DATE
  }, {});
  return Payment;
};