const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const requireAuthAdmin = async(req,res,next) => {
    console.log("hii");
    //verify authentication
    const { authorization } = req.headers;

    if(!authorization){
        console.log("Authorization token required");
        return res.status(401).json({error:"Authorization token required"});
    }

    const token = authorization.split(" ")[1];

    try{
        const { _id } = jwt.verify(token , process.env.JWT_SECRET);
        req.admin = await Admin.findOne({_id}).select("_id");
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:"Request is not authorized"});
    }
}

module.exports = requireAuthAdmin;