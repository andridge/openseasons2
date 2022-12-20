const user_ctrl = require("../controllers/user_ctrl");
const merchant_ctrl = require("../controllers/merchant_ctrl");
const transaction_ctrl = require("../controllers/transaction_ctrl");
const wallet_ctrl = require("../controllers/wallet_ctrl");
const currency_ctrl = require("../controllers/currency_ctrl");
const payment_ctrl = require("../controllers/payemnt_ctrl");
const merchant_currency_ctrl = require("../controllers/merchant_currency_ctrl");
module.exports = function(express) {
    const route = express.Router();
    route.post("/add_user",user_ctrl.save);
    route.get("/get_user",user_ctrl.findOne);

    route.post("/add_merchant",merchant_ctrl.save);
    route.get("/get_merchant",merchant_ctrl.findOne);
    route.get("/get_merchant_id",merchant_ctrl.findOneTwo);
    
    route.post("/add_transaction",transaction_ctrl.save);
    route.post("/add_wallet",wallet_ctrl.save);
    route.post("/add_currency",currency_ctrl.save);
    route.post("/add_payment",payment_ctrl.save);
    
    route.post("/add_merchant_currency",merchant_currency_ctrl.save)
   // route.get("/get_merchant_currency",merchant_currency_ctrl.findOne);
    return route; 
}