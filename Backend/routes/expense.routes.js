const express=require('express');
const expenseRouter=express.Router();

const {createExpense,
	updateExpense,
	deleteExpense,
	getAllExpenses,
	updateEarn}=require('../controllers/expense.controller');
const { model } = require('mongoose');


expenseRouter.post('/add',createExpense);
expenseRouter.post('/:id/edit',updateExpense);
expenseRouter.delete('/:id/delete',deleteExpense);
expenseRouter.get('/getAll/:id',getAllExpenses);
expenseRouter.post('/updateAmount',updateEarn);



module.exports=expenseRouter;
