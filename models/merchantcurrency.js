'use strict';
//const { v4 : uuidv4 }= require("uuid"); 
module.exports = (sequelize, DataTypes) => {
  
  const MerchantCurrency = sequelize.define('MerchantCurrency', {
    merchant_id: DataTypes.STRING,
    currency_id: DataTypes.STRING
  }, {});
  return MerchantCurrency;
};