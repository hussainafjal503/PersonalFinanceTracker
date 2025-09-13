const Expense=require('../models/expense.models');
const UserSchema=require('../models/user.models');

const createExpense=async(req,res)=>{
	try{
		let {title,amount,date,category,userId}=req.body;
		

		if(!title || !amount || ! date || ! category){
			return res.status(400).json({
				success:false,
				message:"Fields are Required.."
			})
		}

		amount=Number(amount);

		const response=await Expense.create({
			title,
			amount,
			date,
			category,
			status:"spend"
		})

		// console.log(response);

		if(!response){
			return res.status(500).json({
				success:false,
				message:"Unable to add expense, some Technical issue Occured.."
			})
		}

		const data=await UserSchema.findById(userId);
		// console.log(data);
		
		
		data.TotalAmmount=data.TotalAmmount-Number(amount);
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


const updateEarn=async(req,res)=>{
	try{
		let {title,amount,date,category,userId}=req.body;

		if(!title || !amount || ! date || ! category){
			return res.status(400).json({
				success:false,
				message:"Fields are Required.."
			})
		}

		
		amount=Number(amount);

		const response=await Expense.create({
			title,
			amount,
			date,
			category,
			status:"earned"
		})

		if(!response){
			return res.status(500).json({
				success:false,
				message:"Unable to add expense, some Technical issue Occured.."
			})
		}

		const data=await UserSchema.findById(userId);
			data.TotalAmmount=data.TotalAmmount+Number(amount);
		data.expenseId.push(response._id);
		await data.save();

		return res.status(200).json({
			success:true,
			message:"Income Added Successfully..",
			data:response,
		})

	}catch(err){
		console.log("Error occured while  adding Earn : ",err);
	}
}


const updateExpense=async(req,res)=>{
	try{

		let {title,amount,category,date,userId}=req.body;
		const {_id}=req.params;

		if(!title || !amount || !category || !date){
			return res.json({
				success:false,
				message:"fields are Required"
			})
		}

		const response=await Expense.findById(_id)
		const userData=await UserSchema.findById(userId)
		amount=Number(amount);

		if(amount<response.amount){
			let newAmount=response.amount-Number(amount);
			userData.TotalAmmount=userData.TotalAmmount+newAmount;
		}

		if(amount>response.amount){
			let newAmount=amount-response.amount;
			userData.TotalAmmount=userData.TotalAmmount-newAmount;
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
		const {_id}=req.params;
		const {userId}=req.body;

		if(!_id || !userId){
			return res.status(400).json({
				success:false,
				message:"ID not found"
			})
		}

		const expenseData=await Expense.findById(_id);
		const userData=await UserSchema.findByIdAndUpdate(userId,{

			amount:amount+expenseData.amount,

			$pull:{expenseId:{_id:_id}}},
		{new:true}
		)

		if(!userData){
			return res.status(500).json({
				success:false,
				message:"unable to delete"
			})
		}

		

		const response=await Expense.findByIdAndDelete(_id);
		if(!response){
			return res.status(500).json({
				success:false,
				message:"unable to delete"
			})
		}

		return re.status(200).json({
			success:true,
			message:"Deleted Successfully..",
			response
		})



	}catch(err){
		console.log("Error occured while deleting Expenses : ",err); 
	}
}


const getAllExpenses=async(req,res)=>{
	try{

	const{id}=req.params;
		
		const response=await UserSchema.findById(id).populate("expenseId");
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
	getAllExpenses,
	updateEarn
}