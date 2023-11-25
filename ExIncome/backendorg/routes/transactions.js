const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

const router=require('express').Router();

//INCOMES

router.post('/addincome',addIncome);
router.get('/getincomes',getIncomes);
router.delete('/deleteincome/:id',deleteIncome);

//EXPENSES

router.post('/addexpense',addExpense);
router.get('/getexpenses',getExpenses);
router.delete('/deleteexpense/:id',deleteExpense);

module.exports = router