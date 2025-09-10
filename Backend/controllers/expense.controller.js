const Expense=require('../models/expense.models');
const UserSchema=require('../models/user.models');

const createExpense=async(req,res)=>{
	try{
		const {title,amount,date,category}=req.body;
		const {_id}=req.params;

		if(!title || !amount || ! date || ! category){
			return res.status(400).json({
				success:false,
				message:"Fields are Required.."
			})
		}

		

		const response=await Expense.create({
			title,
			amount,
			date,
			category,
		})

		if(!response){
			return res.status(500).json({
				success:false,
				message:"Unable to add expense, some Technical issue Occured.."
			})
		}

		const data=await UserSchema.findById(_id);
		if(amount<0){
			data.amount=data.amount-amount;
			
		}

		if(amount>0){
			data.amount=data.amount+amount;
			
		}

		data.expenseId.push(response._id);
		await data.save();

		return res.status(200).json({
			success:true,
			message:"Expense Added Successfully..",
			data:response,
		})
	}catch(err){
		console.log("Error occured while creating Expense :",err);
	}
}


const updateExpense=async(req,res)=>{
	try{

		const {title,amount,category,date,userId}=req.body;
		const {_id}=req.params;

		if(!title || !amount || !category || !date){
			return res.json({
				success:false,
				message:"fields are Required"
			})
		}

		const response=await Expense.findById(_id)
		const userData=await UserSchema.findById(userId)

		if(amount<response.amount){
			let newAmount=response.amount-amount;
			userData.amount=userData.amount+newAmount;
		}

		if(amount>response.amount){
			let newAmount=amount-response.amount;
			userData.amount=userData.amount-newAmount;
		}

		await userData.save();

		response.title=title;
		response.amount=amount;
		response.date=date;
		response.category=category;

		const newData=await response.save();

		return res.status(200).json({
			success:true,
			message:"Updated Successfully..",
			data:newData,
		})
			
			


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


const getAllExpenses=async(req,res)=>{
	try{

		const {_id}=req.params;
		
		const response=await UserSchema.findById(_id).populate("Expense");
		if(!response){
			return res.status(500).json({
				success:false,
				message:"Unable to find data, Some Technical Error occured",
			})
		}

		return res.status(200).json({
			success:true,
			message:"Data Found..",
			data:response
		})

	}catch(err){
		console.log("Error occured while getting all Expenses : ",err);
	}
}


module.exports={
	createExpense,
	updateExpense,
	deleteExpense,
	getAllExpenses
}