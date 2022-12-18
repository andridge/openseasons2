const user_ctrl = require("../controllers/user_ctrl");
const merchant_ctrl = require("../controllers/merchant_ctrl");
module.exports = function(express) {
    const route = express.Router();
    route.post("/add_user",user_ctrl.save);
    route.get("/get_user",user_ctrl.findOne);

    route.post("/add_merchant",merchant_ctrl.save);
    return route; 
}