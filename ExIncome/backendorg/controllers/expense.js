const Expense = require("../models/expense");

exports.addExpense=async(req,res)=>{
    const {title,amount,category,description,date}=req.body;
    const expense=new Expense({
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
            return res.status(400).json({msg:"Expense must be positive"});
        }
        await expense.save();
         res.status(200).json({msg:'Expense added successfully'});
    }catch(e){
        res.status(500).json({msg:'Server error'});
    }
    //saving to database
}

exports.getExpenses=async(req,res)=>{
    try{
        //jo laast mein add kiy pahle ayega by -1
        const expenses=await Expense.find().sort({createdAt:-1});
        res.status(200).json(expenses);
    }catch(e){
        res.status.json({msg:"server error"});
    }

}

exports.deleteExpense=async(req,res)=>{
    const {id}=req.params;
    try{
        await Expense.findByIdAndDelete({_id:id})
        .then((expense)=>{
            res.status(200).json({msg:"Expense deleted"});
        })
        .catch((err)=>{
            res.status(500).json({msg:"Server error"});
        })

    }catch(e){
        res.status.json({msg:"server error"});
    }

}
