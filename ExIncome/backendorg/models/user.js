const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minLength:4,
        trim:true
    }
},{timestamps:true});

module.exports=mongoose.model('User',userschema);