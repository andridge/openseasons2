
'use strict';

//const { v4 : uuidv4 }= require("uuid"); 
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    user_id: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    currency_id: DataTypes.STRING
  }, {});
  return Wallet;
};