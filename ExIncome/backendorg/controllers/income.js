const Income = require("../models/income");

exports.addIncome=async(req,res)=>{
    const {title,amount,category,description,date}=req.body;
    const income=new Income({
        title,
        amount,
        description,
        category,
        date
    });

    //validations
    try{
        if(!title||!amount||!category||!description||!date){
            return res.status(400).json({msg:"All fields are required"});
        }
        if(amount<=0||amount==='number'){
            return res.status(400).json({msg:"Income must be positive"});
        }
        await income.save();
         res.status(200).json({msg:'Income added successfully'});
    }catch(e){
        res.status(500).json({msg:'Server error'});
    }
    //saving to database
}

exports.getIncomes=async(req,res)=>{
    try{
        //jo laast mein add kiy pahle ayega by -1
        const incomes=await Income.find().sort({createdAt:-1});
        res.status(200).json(incomes);
    }catch(e){
        res.status.json({msg:"server error"});
    }

}

exports.deleteIncome=async(req,res)=>{
    const {id}=req.params;
    try{
        await Income.findByIdAndDelete({_id:id})
        .then((income)=>{
            res.status(200).json({msg:"Income deleted"});
        })
        .catch((err)=>{
            res.status(500).json({msg:"Server error"});
        })

    }catch(e){
        res.status.json({msg:"server error"});
    }

}
