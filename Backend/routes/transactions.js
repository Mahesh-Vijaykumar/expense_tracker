const router = require("express").Router();
const {addIncome,getIncomes, deleteIncome} = require("../controllers/income");
const {addExpense, getExpenses, deleteExpense} = require("../controllers/expense");
const {authenticate} = require("../middleware/auth");

router.post('/add-income', authenticate, addIncome)
    .get('/get-incomes', authenticate, getIncomes)
    .delete('/delete-income/:id', authenticate, deleteIncome)
    .post('/add-expense', authenticate, addExpense)
    .get('/get-expenses', authenticate, getExpenses)
    .delete('/delete-expense/:id', authenticate, deleteExpense)

module.exports = router;