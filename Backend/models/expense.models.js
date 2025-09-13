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
	},
	status:{
		type:String,
		default:"spend"
	}
})


module.exports=mongoose.model("Expense",Expense);