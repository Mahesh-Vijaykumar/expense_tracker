const ExpenseSchema = require("../models/expenseModel")

exports.addExpense=async(req, res) => {
    const {title,amount,category,description,date} = req.body
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user: req.userId
    })
    try{
        if(!title||!description||!date||!category){
            return res.status(400).json({message:"All fields required!"})
        }
        if(amount<=0 ||!amount === 'number'){
            return res.status(400).json({message:"Amount must be a positive integer!"})
        }
        await expense.save()
        res.status(200).json({message:"Expense added successfully"})
    }catch(e){
        res.status(500).json({message:"Server Error"})
    }
    console.log(expense)
}

exports.getExpenses=async(req, res) => {
    try{
        const expense = await ExpenseSchema.find({ user: req.userId }).sort({createdAt:-1})
        res.status(200).json(expense)
    }catch(e){
        res.status(500).json({message:"Server Error"})
    }
}

exports.deleteExpense=async(req, res) => {
    const {id} = req.params
    ExpenseSchema.findOneAndDelete({ _id: id, user: req.userId })
        .then(expense => {
            if (!expense) {
                return res.status(404).json({message:"Expense not found or unauthorized"})
            }
            res.status(200).json({message:"Expense deleted successfully"})
        })
        .catch(e => {
            res.status(500).json({message:"Server Error"})
        })
}