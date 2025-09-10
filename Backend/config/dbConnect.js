const mongoose=require('mongoose');
require('dotenv').config()


const dbConnect=async()=>{

	try{
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("DB Connected Successfully..")

	} catch(err){
		console.log(`Error Occured while Connecting with Database : ${err}`)
	}

	
}

module.exports=dbConnect