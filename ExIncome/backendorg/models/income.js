const mongoose=require('mongoose');

const incomeschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true,
    },
    type:{
        type:String,
        default:'income'
    },
    date:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        maxLength:100,
        trim:true,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model('Income',incomeschema);