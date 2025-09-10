const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({

	name:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true
	},
	TotalAmmount:{
		type:Number
	},
	expenseId:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Expense"
		}
	]
})

module.exports=mongoose.model("UserSchema",UserSchema);