const {User}=require("./../models")
let self={}
//save
self.save = async(req,res) => {
    try{
        let body = req.body;
        let data = User.create(body);
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
//get user by name
self.findOne = async(req,res)=>{
    try{
  
       //let firstName = req.params.firstName;
        let data = await User.findOne({
            attributes:["id","firstName","lastName","phoneNumber","publicKey"],
            where:{
                firstName:req.query.firstName,
            }
        });
        return res.json({
            status:"ok",
            data:data,
        });
    }catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
    
}
//export models
module.exports = self;