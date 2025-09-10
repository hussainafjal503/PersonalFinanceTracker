const mongoose=require('mongoose');

const Expense=new mongoose.Schema({
	title:{
		type:String,
		required:true,
	},
	amount:{
		type:Number,
		required:true,
		min:0,
	},
	date:{
		type:Date,
		required:true,
	},
	category:{
		type:String
	}
})


module.exports=mongoose.model("Expense",Expense);