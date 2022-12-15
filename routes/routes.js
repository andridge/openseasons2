const user_ctrl = require("../controllers/user_ctrl");

module.exports = function(express) {
    const route = express.Router();
    route.post("/add_user",user_ctrl.save);
    route.get("/get_user",user_ctrl.findOne);
    return route; 
}