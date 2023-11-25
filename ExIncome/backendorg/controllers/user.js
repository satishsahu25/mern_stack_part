const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const userSignup=async(req,res)=>{
    const {fullname,email,password} = req.body;
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({msg:"User already exists"});
    }else{

        try{
            if(!fullname||!email||!password){
                return res.status(400).json({msg:"All fields are required"});
            }
            if(password.length<4){
                return res.status(400).json({msg:"Password is too short"});
            }
            const salt=await bcrypt.genSalt(12);
            const hashedpass=await bcrypt.hash(password, salt);
            const userdoc=await User.create({
                    fullname,email,password:hashedpass,
            })
            await userdoc.save();
            const saveduser=await User.findOne({email});
            const token=jwt.sign({userID:saveduser._id},process.env.JWT_SECRET,{expiresIn:"5d"});
             res.status(200).json({msg:'user added successfully',token:token,user:saveduser});
        }catch(e){
            res.status(500).json({msg:'Server error'});
        }

    }

}


const userSignin=async(req,res)=>{
    const {email,password} = req.body;
    try{
        if(email&&password){
            const user=await User.findOne({email});
            if(user!=null){
                const ismatch=await bcrypt.compare(password,user.password);
                if(user.email==email&&ismatch){
                    const token=jwt.sign({userID:user._id},process.env.JWT_SECRET,{expiresIn:"5d"});
                    res.send({ message: "success login", token: token, user });
                }else{
                    res.status(400).json({msg:"Wrong credentials"});
                }
            }else{
                res.status(400).json({msg:"you are not registered user"});
            }
        }else{
            res.status(400).json({msg:"All fields are required"});
        }
    }catch(err){
        res.status(400).json({msg:err});
    }
    
    
}


// const userSignout=async()=>{
    
// }

module.exports ={userSignup,userSignin}