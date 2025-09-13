const userSchema=require('../models/user.models');

const createUser=async(req,res)=>{

	try{
		let {name,email}=req.body;

		if(!name || !email){
			return res.json({
				success:false,
				message:"All field Required.."
			})
		}else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
			return res.json({
				success:false,
				message:"Invalid Email.."
			})
		}

		// console.log(name,email);
		name=name.toLowerCase();
		email=email.toLowerCase();

		const response=await userSchema.findOne({email});

		if(response){
			return res.status(200).json({
				success:true,
				message:"Check Your Expenses..",
				data:response
			})
		}

		const data=await userSchema.create({
			name,email,TotalAmmount:0
		});

		return res.status(200).json({
			success:true,
			message:"Track Your Expenses.",
			data:data
		})

		


	}catch(err){
		console.log("Error occured while creating user : ",err);
	}

}


const getUserDetails=async(req,res)=>{
	try{
		const {id}=req.params;

		const response=await userSchema.findById(id);
		if(!response){
			return res.status(400).json({
				message:"unable to find Amount",
				success:false
			})
		}

		return res.status(200).json({
			success:true,
			message:"Amount fetched",
			data:response
		})

	}catch(Err){
		console.error("error occuredd while getting current amount ; ",Err);
	}
}





module.exports={createUser,getUserDetails}
