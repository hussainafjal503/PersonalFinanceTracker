const express=require('express');
const app=express();
const dbConnect=require('./config/dbConnect')
const cors=require('cors');
const bodyParser=require('body-parser')
const userRouter=require('./routes/user.routes');
require('dotenv').config();


app.use(cors({
	origin:process.env.FRONTEND_URL,
	methods:['PUT','PATCH','DELETE','GET','POST'],
	credentials:true,
	
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/v1/user',userRouter);




const PORT=process.env.PORT||8000
dbConnect();

app.listen(PORT,()=>{
	console.log("SERVER is Running on PORT : ",PORT)
})