const {User,Merchant}=require("./../models")
let self={}
//save
self.save = async(req,res) => {
    try{
        let body = req.body;
        let data = Merchant.create(body);
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
self.findOne = async(req,res)=>{
    try{
//
let data = await Merchant.findOne({
    attributes:["firstName","lastName","publicKey","phoneNumber","email"],
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

self.findOneTwo = async(req,res)=>{
    try{
//
let data = await Merchant.findOne({
    attributes:["firstName","lastName","publicKey","phoneNumber","email"],
where:{
    password:req.query.password,
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