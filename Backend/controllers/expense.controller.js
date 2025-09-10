const Expense=require('../models/expense.models');

const createExpense=async(req,res)=>{
	try{

	}catch(err){
		console.log("Error occured while creating Expense :",err);
	}
}


const updateExpense=async(req,res)=>{
	try{

	}catch(err){
		console.log("Error occured while updating expense : ",err);
	}
}


const deleteExpense=async(req,res)=>{
	try{

	}catch(err){
		console.log("Error occured while deleting Expenses : ",err); 
	}
}



module.exports={
	createExpense,
	updateExpense,
	deleteExpense
}