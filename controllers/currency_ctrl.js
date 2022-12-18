const {User,Currency}=require("./../models")
let self={}
//save
self.save = async(req,res) => {
    try{
        let body = req.body;
        let data = Currency.create(body);
        return res.json({
            status:"ok",
            data:data
        })
    }catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
}
}
//export models
module.exports = self;